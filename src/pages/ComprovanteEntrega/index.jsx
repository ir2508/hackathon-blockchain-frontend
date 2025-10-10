import { useParams } from "react-router-dom"
import GraficoTemperatura from "../../components/GraficoTemperatura"
import styled from "styled-components"
import Botao from "../../components/Botao"
import { useRecoilValue } from "recoil"
import { historicoCargasState } from "../../recoil/entregasAtom"
import { caminhoesState } from "../../recoil/caminhoesAtom"

import listaCaminhoes from "../../utils/listaCaminhoes" // Importa o objeto com a função
import { useEffect } from "react"

const DetalhesComprovanteStyled = styled.div`
    width: 100vw;
    padding: 30px;
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

    useEffect(() => {
        async function fetchAddress() {
            const address = await listaCaminhoes.getCaminhoes()
        }

        fetchAddress()
    }, [])

    const caminhoes = useRecoilValue(caminhoesState)
    console.log(caminhoes)

    // const listaCargas = useRecoilValue(historicoCargasState)
    // console.log(listaCargas)
    // const cargaFiltrada = listaCargas.filter((carga) => carga.id === idEntrega)

    return (
        <DetalhesComprovanteStyled>
            <StatusSectionStyled>
                <IconStyled className="bi bi-check-circle-fill"></IconStyled>
                <h2>Entrega finalizada</h2>
            </StatusSectionStyled>
            <DetalhesEntregaStyled>
                <h4>Entrega iniciada</h4>
                <span>09h00 - 10/10/2025</span>

                <h4 className="mt-3">Entrega finalizada</h4>
                <span>09h00 - 10/10/2025</span>

                <h4 className="mt-3">Placa do caminhão</h4>
                <span>ABC-1D23</span>

                <h4 className="mt-3">Histórico Temperatura</h4>
                <span>ABC-1D23</span>
            </DetalhesEntregaStyled>
            {/* <GraficoTemperatura afericoes={infoEntrega.afericoes} id={infoEntrega.id} status={infoEntrega.status} /> */}

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
