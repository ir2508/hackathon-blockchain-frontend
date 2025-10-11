import { useParams } from "react-router-dom"
import GraficoTemperatura from "../../components/GraficoTemperatura"
import styled from "styled-components"
import Botao from "../../components/Botao"
import { useRecoilValue } from "recoil"
import { historicoCargasState } from "../../recoil/entregasAtom"
import { caminhoesState } from "../../recoil/caminhoesAtom"

import listaCaminhoes from "../../utils/listaCaminhoes"
import { obterCargaDetalhada } from "../../utils/cargaDetalhada"
import { useEffect } from "react"
import { useState } from "react"

const DetalhesComprovanteStyled = styled.div`
    max-width: 100vw;
    padding: 30px;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        max-width: 500px;
    }
`

const StatusSectionStyled = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid gray;

    h2 {
        color: green;
    }
`

const IconStyled = styled.i`
    font-size: 5em;
    color: green;
`

const DetalhesEntregaStyled = styled.section`
    padding: 30px 10px;
`
const ComprovanteEntrega = () => {
    const { idEntrega } = useParams()
    const [infoEntrega, setInfoEntrega] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const caminhoes = await listaCaminhoes.getCaminhoes()
                const cargaId = Number(idEntrega) // <- conversão correta aqui
                const cargaDetalhe = await obterCargaDetalhada(cargaId, caminhoes)
                setInfoEntrega(cargaDetalhe)
            } catch (error) {
                console.error("Erro ao buscar dados:", error)
            }
        }

        fetchData()
    }, [idEntrega])

    return (
        <DetalhesComprovanteStyled>

            <StatusSectionStyled>

                <IconStyled
                    className={
                        infoEntrega?.status === "Em andamento"
                            ? "bi bi-hourglass-split"
                            : infoEntrega?.status === "Finalizada"
                                ? "bi bi-check-circle-fill"
                                : infoEntrega?.status === "Rejeitada"
                                    ? "bi bi-x-circle-fill"
                                    : "bi bi-question-circle-fill"
                    }
                    style={{
                        color:
                            infoEntrega?.status === "Em andamento"
                                ? "orange"
                                : infoEntrega?.status === "Finalizada"
                                    ? "green"
                                    : infoEntrega?.status === "Rejeitada"
                                        ? "red"
                                        : "gray",
                    }}
                />

                <h3 style={{
                    color:
                        infoEntrega?.status === "Em andamento"
                            ? "orange"
                            : infoEntrega?.status === "Finalizada"
                                ? "green"
                                : infoEntrega?.status === "Rejeitada"
                                    ? "red"
                                    : "gray",
                }}>{infoEntrega?.status}</h3>
            </StatusSectionStyled>

            <DetalhesEntregaStyled>
                <h4>Entrega iniciada</h4>
                <span>
                    {infoEntrega?.dataInicio ? infoEntrega.dataInicio.toLocaleString("pt-BR") : "Carregando..."}
                </span>

                <h4 className="mt-3">Entrega finalizada</h4>
                <span>
                    {infoEntrega?.dataFim ? infoEntrega.dataFim.toLocaleString("pt-BR") : "Carregando..."}
                </span>

                <h4 className="mt-3">Placa do caminhão</h4>
                <span> {infoEntrega?.placaCaminhao || "Não disponível"} </span>

                <h4 className="mt-3">Address</h4>
                <span> {infoEntrega?.address || "Não disponível"} </span>

                <h4 className="mt-3">TXID</h4>
                <span> {infoEntrega?.txId || "Não disponível"} </span>

                <h4 className="mt-3">Histórico Temperatura</h4>
                <span>
                    {
                        infoEntrega?.afericoes?.length > 0 ? (
                            <ul>
                                {infoEntrega.afericoes.map((afericao, index) => (
                                    <li key={index}>
                                        {afericao.temperatura}°C às{" "}
                                        {new Date(afericao.timestamp * 1000).toLocaleString("pt-BR")}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span>Sem aferições registradas</span>
                        )
                    }
                </span>
                {
                    infoEntrega?.afericoes?.length > 0 && (
                        <GraficoTemperatura afericoes={infoEntrega.afericoes} id={infoEntrega.id} status={infoEntrega.status} />
                    )
                }

            </DetalhesEntregaStyled>

            <Botao classBootstrap={"btn-outline-success mb-3"} largura={"100%"}>
                Marcar como recebido
            </Botao>
            <Botao classBootstrap={"btn-outline-danger"} largura={"100%"}>
                Reportar entrega
            </Botao>
        </DetalhesComprovanteStyled>
    )
}
export default ComprovanteEntrega
