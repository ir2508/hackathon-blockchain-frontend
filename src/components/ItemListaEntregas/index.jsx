import styled from "styled-components"
import Botao from "../Botao"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { useRecoilValue } from "recoil"
import { entregaSelecionadaState, entregasState } from "../../recoil/entregasAtom"
import GraficoTemperatura from "../GraficoTemperatura"
import { ethers } from "ethers"
import { walletAddressState } from "../../recoil/walletAtom"
import ModalMetamask from "../../components/ModalMetamask"
import handleMetamaskError from "../../utils/handleMetamaskError"

const contratoABI = [
    "function finalizarCarga(uint cargaId) public",
]

const contratoEndereco = "0x8965c031D70e7aE4e7d33554374d1c655d87E8f2"

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

    const [metamaskInfo, setMetamaskInfo] = useState({
        mensagemRetorno: "",
    })

    const walletAddress = useRecoilValue(walletAddressState)

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

        setMetamaskInfo({
            mensagemRetorno: "Aguardando ação do usuário ...",
        })

        if (!window.ethereum) {
            setMetamaskInfo({
                mensagemRetorno: "MetaMask não está disponível",
            })
            return
        }

        if (!walletAddress) {
            setMetamaskInfo({
                mensagemRetorno: "Priemeiro conecte a MetaMask para continuar",
            })
            return
        }

        if (!infoEntrega.id || infoEntrega.id === "") {
            setMetamaskInfo({
                mensagemRetorno: "Entrega inválida ou não informada.",
            })
            return
        }

        try {
            // Solicita conexão com a carteira
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Cria provider e signer
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            // Instancia o contrato
            const contrato = new ethers.Contract(contratoEndereco, contratoABI, signer)
            
            try {
                // Chama a função do contrato com a placa
                const tx = await contrato.finalizarCarga( infoEntrega.id )
                await tx.wait()
                setMetamaskInfo({
                    mensagemRetorno: "Entrega Finalizada com sucesso!",
                })
            } catch (txError) {
                handleMetamaskError(txError, "Erro ao cadastrar aferição", setMetamaskInfo)
            }

        } catch (error) {
            handleMetamaskError(error, "Erro inesperado", setMetamaskInfo)
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
                            <button
                                type="button"
                                className="btn btn-success m-2"
                                onClick={handleFinalizarEntrega}
                                data-bs-toggle="modal"
                                data-bs-target="#loginMetamask"
                            >
                                Finalizar entrega
                            </button>
                            <ModalMetamask mensagem={metamaskInfo.mensagemRetorno} id="loginMetamask" />
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
