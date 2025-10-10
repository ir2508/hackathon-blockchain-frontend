import styled from "styled-components"
import Botao from "../Botao"
import { useRecoilState } from "recoil"
import { entregaSelecionadaState, entregasState } from "../../recoil/entregasAtom"
import GraficoTemperatura from "../GraficoTemperatura"
import { ethers } from "ethers"

const contratoABI = [
    "function finalizarCarga(uint cargaId) public",
]

const contratoEndereco = "0x8965c031D70e7aE4e7d33554374d1c655d87E8f2"
const chainIdPasseo = "0x190F1B46" // 420420422 em hexadecimal

const StatusTexto = styled.span`
    color: ${({ status }) => (status === "Finalizada" ? "green" : status === "Rejeitada" ? "red" : status === "Em andamento" ? "orange" : "black")};
    font-weight: bold;
`

const ItemListaStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
    padding: 15px 10px;
    margin-bottom: 20px;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #ccc;
    min-width: 1000px;
    &:hover {
        box-shadow: 1px 1px 1px #ccc;
    }

    h3 {
        font-weight: 400;
        font-size: 1.2em;
    }

    h5 {
        font-weight: 400;
        font-size: 1em;
    }

    img {
        max-width: 200px;
    }
`

const ItemListaEntregas = ({ infoEntrega }) => {
    const [entregaSelecionada, setEntregaSelecionada] = useRecoilState(entregaSelecionadaState)
    const [listaEntregas, setListaEntregas] = useRecoilState(entregasState)

    const handleRegistrarTemperatura = (e) => {
        e.preventDefault()

        setEntregaSelecionada({
            idEntrega: infoEntrega.id,
            detalhesEntrega: listaEntregas.filter((entrega) => entrega.id === infoEntrega.id),
            acao: "registrarTemperatura",
        })
    }

    const handleFinalizarEntrega = async (e) => {
        e.preventDefault()
        // alert(infoEntrega.id)

        if (!infoEntrega.id || infoEntrega.id === "") {
            alert("Entrega inválida ou não informada.")
            return
        }

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
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: chainIdPasseo }],
                    })
                } catch (switchError) {
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

            // Chama a função do contrato com a placa
            const tx = await contrato.finalizarCarga( infoEntrega.id )
            await tx.wait()

        } catch (error) {
            console.error("Erro ao aferir temperatura:", error)

            // Tenta extrair a razão do revert
            if (error.reason) {
                alert(`Erro ao aferir temperatura: ${error.reason}`)
            } else if (error.message) {
                alert(`Erro ao aferir temperatura: ${error.message}`)
            } else {
                alert("Erro ao aferir temperatura. Veja o console para mais detalhes.")
            }
        }
        
    }

    const handleExibirEntrega = (e) => {
        setEntregaSelecionada({
            idEntrega: infoEntrega.id,
            detalhesEntrega: listaEntregas.filter((entrega) => entrega.id === infoEntrega.id),
            acao: "exibirEntrega",
        })
    }

    const formatarEndereco = (endereco) => {
        if (!endereco || endereco.length < 10) return endereco
        return `${endereco.slice(0, 6)}...${endereco.slice(-4)}`
    }

    return (
        <ItemListaStyled>
            <div>
                <h2>Código da carga: {infoEntrega.id}</h2>
                <h5>Caminhão: {infoEntrega.placaCaminhao}</h5>
                <h5> {formatarEndereco(infoEntrega.address)}</h5>
                Status: <StatusTexto status={infoEntrega.status}>{infoEntrega.status}</StatusTexto>
                <div>
                    <Botao classBootstrap="btn-outline-success m-2" onClick={handleExibirEntrega}>
                        Detalhes
                    </Botao>
                    {(infoEntrega.status !== "Finalizada" && infoEntrega.status !== "Rejeitada") ? (
                        <>
                            <Botao classBootstrap="btn-outline-success m-2" onClick={handleRegistrarTemperatura}>
                                Registrar temperatura
                            </Botao>
                            <Botao classBootstrap="btn-success m-2" onClick={handleFinalizarEntrega}>
                                Finalizar entrega
                            </Botao>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <GraficoTemperatura afericoes={infoEntrega.afericoes} id={infoEntrega.id} status={infoEntrega.status} />
            {/* <div>
               
            </div> */}
        </ItemListaStyled>
    )
}

export default ItemListaEntregas
