import { useState } from "react"
import styled from "styled-components"
import ConsultaCaminhoes from "../../components/ConsultaCaminhoes"
import HistoricoCargas from "../../components/HistoricoCargas"
import ItemListaEntregas from "../../components/ItemListaEntregas"
import { useRecoilState } from "recoil"
import { entregasState } from "../../recoil/entregasAtom"

const ContainerStyled = styled.div`
    /* width: 100vw; */
    /* height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
`

const SectionCargasStyled = styled.section`
    min-width: 90%;
    height: 60vh;
`

const SectionListaEntregasStyled = styled.section`
    margin-top: 50px;
    max-height: 100%;
    overflow-y: auto;
    scrollbar-color: #444 #fff;
    padding-right: 30px;
`
const HistoricoStyled = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f8f8f8;
    border-left: 4px solid #007bff;
`

const Monitoramento = () => {
    const [listaEntregas, setListaEntregas] = useRecoilState(entregasState)

    const [caminhaoSelecionado, setCaminhaoSelecionado] = useState("")
    const [caminhoesContrato, setCaminhoesContrato] = useState([])

    const entregas = [
        { id: 1, caminhao: "0x123...", tipo: "Congelados" },
        { id: 2, caminhao: "0x456...", tipo: "Congelados" },
        { id: 3, caminhao: "0x123...", tipo: "Congelados" },
        { id: 4, caminhao: "0x789...", tipo: "Congelados" },
    ]

    const entregasFiltradas = caminhaoSelecionado ? entregas.filter((entrega) => entrega.caminhao === caminhaoSelecionado) : entregas

    return (
        <ContainerStyled className="container">
            <SectionCargasStyled>
                <h2>Página monitoramento</h2>
                {/* 
                <ConsultaCaminhoes onCaminhoesCarregados={setCaminhoesContrato} />

                <label htmlFor="select-caminhao">Selecione o caminhão:</label>
                <select id="select-caminhao" onChange={(e) => setCaminhaoSelecionado(e.target.value)}>
                    <option value="">Todos os caminhões</option>
                    {caminhoesContrato.map((c, index) => (
                        <option key={index} value={c.endereco}>
                            {c.placa} ({c.endereco.slice(0, 6)}…)
                        </option>
                    ))}
                </select>

                {caminhaoSelecionado && (
                    <HistoricoStyled>
                        <HistoricoCargas chaveCaminhao={caminhaoSelecionado} />
                    </HistoricoStyled>
                )} */}

                {/* <SectionListaEntregasStyled>
                    {entregasFiltradas.map(entrega => (
                        <ItemListaEntregas
                            key={entrega.id}
                            caminhao={entrega.caminhao}
                            tipo={entrega.tipo}
                        />
                    ))}
                </SectionListaEntregasStyled> */}

                <SectionListaEntregasStyled>
                    {listaEntregas.map((entrega) => (
                        <ItemListaEntregas key={entrega.id} infoEntrega={entrega}/>
                    ))}
                </SectionListaEntregasStyled>
            </SectionCargasStyled>
        </ContainerStyled>
    )
}

export default Monitoramento
