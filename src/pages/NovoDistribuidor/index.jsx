import styled from "styled-components"
import Botao from "../../components/Botao"
import { ethers } from "ethers"

// ABI do contrato
const contratoABI = [
    "function registrarComoAdministradora() public",
]

// Endereço do contrato na blockchain 
const contratoEndereco = "0xd85bEabBd33A67132edA237B84ee86BE78866b79"

const chainIdPasseo = "0x190F1B46" // 420420422 em hexadecimal

const ContainerPrincipalStyled = styled.div`
    /* display: flex;
    justify-content: center;
    align-items: center; */
`

const NovoDistribuidor = () => {

    const handleCadastrarDistribuidora = async (e) => {
        e.preventDefault()

        try {
            // Verifica se o MetaMask está disponível
            if (!window.ethereum) {
                alert("MetaMask não está disponível")
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
                                params: [{
                                    chainId: chainIdPasseo,
                                    chainName: "Passeo Testnet",
                                    rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
                                    nativeCurrency: {
                                        name: "ETH",
                                        symbol: "ETH",
                                        decimals: 18,
                                    },
                                    blockExplorerUrls: ["https://explorer.passeo.io"],
                                }],
                            })
                        } catch (addError) {
                            alert("Erro ao adicionar a rede Passeo ao MetaMask.")
                            return
                        }
                    } else {
                        alert("Troca de rede recusada. Conecte à rede Passeo para continuar.")
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
            alert("Erro ao registrar distribuidora. Veja o console para mais detalhes.")
        }
    }

    return (
        <ContainerPrincipalStyled>
            <h2>Página Quero ser um distribuidor</h2>
            <Botao classBootstrap={"btn-success mt-5"} onClick={handleCadastrarDistribuidora}>
                Cadastrar minha distribuidora
            </Botao>
        </ContainerPrincipalStyled>
    )
}

export default NovoDistribuidor
