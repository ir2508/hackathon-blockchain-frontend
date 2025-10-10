import styled from "styled-components"
import Botao from "../../components/Botao"
import { ethers } from "ethers"
import { useState } from "react"

// ABI do contrato
const contratoABI = ["function registrarComoAdministradora() public"]

// Endereço do contrato na blockchain
const contratoEndereco = "0xAFB1F3b374eb69daf945cEAe9315CB269aaA7411"

const chainIdPasseo = "0x190F1B46" // 420420422 em hexadecimal

const ContainerPrincipalStyled = styled.div`
    /* display: flex;
    justify-content: center;
    align-items: center; */
`

const NovoDistribuidor = () => {
    const [metamaskInfo, setMetamaskInfo] = useState({
        chavePublica: "0x06A85356DCb5b307096726FB86A78c59D38e08ee",
        mensagemRetorno: "",
    })

    const handleCadastrarDistribuidora = async (e) => {
        e.preventDefault()

        console.log("Abriu")

        try {
            // Verifica se o MetaMask está disponível
            if (!window.ethereum) {
                setMetamaskInfo({
                    ...metamaskInfo,
                    mensagemRetorno: "MetaMask não está disponível",
                })
                return
            }

            // Verifica se está na rede Passeo
            const chainIdAtual = await window.ethereum.request({ method: "eth_chainId" })

            if (chainIdAtual !== chainIdPasseo) {
                try {
                    // Tenta trocar para a rede Passeo
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: chainIdPasseo }],
                    })
                } catch (switchError) {
                    // Se a rede não estiver adicionada, tenta adicionar
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
                        } catch (addError) {
                            setMetamaskInfo({
                                ...metamaskInfo,
                                mensagemRetorno: "Erro ao adicionar a rede Passeo ao MetaMask",
                            })
                            return
                        }
                    } else {
                        setMetamaskInfo({
                            ...metamaskInfo,
                            mensagemRetorno: "Troca de rede recusada. Conecte à rede Passeo para continuar",
                        })
                        return
                    }
                }
            }

            // Solicita conexão com a carteira
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Cria provider e signer
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            // Instancia o contrato
            const contrato = new ethers.Contract(contratoEndereco, contratoABI, signer)

            // Chama a função do contrato
            const tx = await contrato.registrarComoAdministradora()

            // Aguarda confirmação da transação
            await tx.wait()
        } catch (error) {
            console.error("Erro ao registrar distribuidora:", error)
            setMetamaskInfo({
                ...metamaskInfo,
                mensagemRetorno: "Erro ao registrar distribuidora. Veja o console para mais detalhes",
            })
        }
    }

    return (
        <ContainerPrincipalStyled>
            <h2>Quero ser um distribuidor</h2>
            <button type="button" class="btn btn-success mt-5" onClick={handleCadastrarDistribuidora} data-bs-toggle="modal" data-bs-target="#loginMetamask">
                Cadastrar minha distribuidora
            </button>

            <div class="modal fade" id="loginMetamask" tabindex="-1" aria-labelledby="loginMetamaskLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="loginMetamaskLabel">
                                Informações de conexão metamask
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {/* <h5>{metamaskInfo.mensagemRetorno}</h5> */}

                            <ul>
                                <li>
                                    Mensagem:
                                    <ul>
                                        <li>{metamaskInfo.mensagemRetorno}</li>
                                    </ul>
                                </li>
                                {metamaskInfo.chavePublica && (
                                    <li>
                                        Chave pública:
                                        <ul>
                                            <li>{metamaskInfo.chavePublica}</li>
                                        </ul>
                                    </li>
                                )}
                            </ul>

                            <h5></h5>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerPrincipalStyled>
    )
}

export default NovoDistribuidor
