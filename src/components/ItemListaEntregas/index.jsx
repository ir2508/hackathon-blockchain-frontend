import styled from "styled-components"
import Botao from "../Botao"
import { useRecoilState } from "recoil"
import { entregaSelecionadaState, entregasState } from "../../recoil/entregasAtom"
import GraficoTemperatura from "../GraficoTemperatura"

    const StatusTexto = styled.h5`
        color: ${({ status }) =>
            status === "Finalizada"
                ? "green"
                : status === "Rejeitada"
                ? "red"
                : status === "Em andamento"
                ? "orange"
                : "black"};
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

    const handleFinalizarEntrega = (e) => {
        e.preventDefault()
        setListaEntregas((entregasAtuais) => entregasAtuais.map((entrega) => (entrega.id === infoEntrega.id ? { ...entrega, status: "Finalizada" } : entrega)))
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
                <h3>
                    {infoEntrega.placaCaminhao}
                </h3>
                <h5> {formatarEndereco(infoEntrega.address)}</h5>
                <h5>
                    ID da carga: {infoEntrega.id}
                </h5>
                <StatusTexto status={infoEntrega.status}>
                    Status: {infoEntrega.status}
                </StatusTexto>

            </div>
            <GraficoTemperatura afericoes={infoEntrega.afericoes} id={infoEntrega.id} status={infoEntrega.status} />
            <div>
                <Botao classBootstrap="btn-outline-success m-2" onClick={handleExibirEntrega}>
                    Detalhes
                </Botao>

                {infoEntrega.status !== "Finalizada" ? (
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
        </ItemListaStyled>
    )
}

export default ItemListaEntregas
