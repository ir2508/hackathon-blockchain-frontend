import styled from "styled-components"
import Botao from "../../components/Botao"
import { ethers } from "ethers"
import { useState } from "react"

const contratoABI = ["function registrarComoAdministradora() public"]
const contratoEndereco = "0xAFB1F3b374eb69daf945cEAe9315CB269aaA7411"
const chainIdPasseo = "0x190F1B46" // 420420422 em hexadecimal

const ContainerPrincipalStyled = styled.div`
    /* display: flex;
    justify-content: center;
    align-items: center; */
`

const NovoDistribuidor = () => {
    const [metamaskInfo, setMetamaskInfo] = useState({
        mensagemRetorno: "",
    })

    const handleCadastrarDistribuidora = async (e) => {
        e.preventDefault()
        setMetamaskInfo({
            mensagemRetorno: "Aguardando ação do usuário ...",
        })

        try {
            if (!window.ethereum) {
                setMetamaskInfo({
                    mensagemRetorno: "MetaMask não está disponível",
                })
                return
            }

            // Verifica se já está na rede Paseo
            const chainIdAtual = await window.ethereum.request({ method: "eth_chainId" })

            if (chainIdAtual !== chainIdPasseo) {
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: chainIdPasseo }],
                    })
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        chainId: chainIdPasseo,
                                        chainName: "Paseo PassetHub",
                                        rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
                                        nativeCurrency: {
                                            name: "PAS",
                                            symbol: "PAS",
                                            decimals: 18,
                                        },
                                        blockExplorerUrls: ["https://explorer.passeo.io"],
                                    },
                                ],
                            })

                            // Após adicionar, tenta trocar para ela
                            await window.ethereum.request({
                                method: "wallet_switchEthereumChain",
                                params: [{ chainId: chainIdPasseo }],
                            })
                        } catch (addError) {
                            handleError(addError, "Erro ao adicionar a rede Paseo ao MetaMask")
                            return
                        }
                    } else {
                        handleError(switchError, "Troca de rede recusada. Conecte à rede Paseo para continuar")
                        return
                    }
                }
            }

            // Solicita conexão com a carteira
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" })
            } catch (connectError) {
                handleError(connectError, "Conexão com a carteira foi recusada")
                return
            }

            // Cria provider e signer
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            // Instancia o contrato
            const contrato = new ethers.Contract(contratoEndereco, contratoABI, signer)

            // Chama a função do contrato
            try {
                const tx = await contrato.registrarComoAdministradora()
                await tx.wait()
                setMetamaskInfo({
                    mensagemRetorno: "Distribuidora registrada com sucesso!",
                })
            } catch (txError) {
                handleError(txError, "Erro ao registrar distribuidora")
            }
        } catch (error) {
            handleError(error, "Erro inesperado")
        }
    }

    const handleError = (error, fallbackMessage) => {
        let message = fallbackMessage
        if (error.code === 4001) {
            message = "Solicitação rejeitada pelo usuário."
        } else if (error.reason) {
            message = error.reason
        } else if (error.message) {
            message = error.message
        }
        setMetamaskInfo({ mensagemRetorno: message })
        console.error("Erro MetaMask:", error)
    }

    return (
        <ContainerPrincipalStyled>
            <h2>Quero ser um distribuidor</h2>
            <button
                type="button"
                className="btn btn-success mt-5"
                onClick={handleCadastrarDistribuidora}
                data-bs-toggle="modal"
                data-bs-target="#loginMetamask"
            >
                Cadastrar minha distribuidora
            </button>

            <div className="modal fade" id="loginMetamask" tabIndex="-1" aria-labelledby="loginMetamaskLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginMetamaskLabel">
                                Informações de conexão MetaMask
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul>
                                <li>
                                    Mensagem:
                                    <ul>
                                        <li>{metamaskInfo.mensagemRetorno}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerPrincipalStyled>
    )
}

export default NovoDistribuidor