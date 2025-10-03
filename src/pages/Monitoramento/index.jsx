import { useState } from "react"
import styled from "styled-components"
import ConsultaCaminhoes from "../../components/ConsultaCaminhoes"
import HistoricoCargas from "../../components/HistoricoCargas"
import ItemListaEntregas from "../../components/ItemListaEntregas"
import { useRecoilState } from "recoil"
import { entregaSelecionadaState, entregasState } from "../../recoil/entregasAtom"
import Select from "../../components/Select"
import Botao from "../../components/Botao"

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
const FilterAreaStyled = styled.section`
    height: 80px;
    display: flex;
    align-items: center;
    gap: 30px;
`

const Monitoramento = () => {
    const [listaEntregas, setListaEntregas] = useRecoilState(entregasState)
    const [entregaSelecionada, setEntregaSelecionada] = useRecoilState(entregaSelecionadaState)

    const [caminhaoSelecionado, setCaminhaoSelecionado] = useState("")
    const [caminhoesContrato, setCaminhoesContrato] = useState([])

    const entregas = [
        { id: 1, caminhao: "0x123...", tipo: "Congelados" },
        { id: 2, caminhao: "0x456...", tipo: "Congelados" },
        { id: 3, caminhao: "0x123...", tipo: "Congelados" },
        { id: 4, caminhao: "0x789...", tipo: "Congelados" },
    ]

    const entregasFiltradas = caminhaoSelecionado ? entregas.filter((entrega) => entrega.caminhao === caminhaoSelecionado) : entregas

    const handleAddCaminhao = (e) => {
        e.preventDefault()
         setEntregaSelecionada({
            idEntrega: "0",
            detalhesEntrega: {},
            acao: "addCaminhao",
        })
    }
    
    const handleAddEntrega = (e) => {
        e.preventDefault()
         setEntregaSelecionada({
            idEntrega: "0",
            detalhesEntrega: {},
            acao: "addEntrega",
        })
    }

    return (
        <ContainerStyled className="container">
            <SectionCargasStyled>
                <h2>Página monitoramento</h2>
                <FilterAreaStyled className="mt-5">
                    <Select label="Filtrar por Caminhão" type="text" id="caminhoes" obrigatorio={true} />
                    <Select label="Filtrar por Entrega" type="text" id="entregas" obrigatorio={true} />
                    <p>
                        <Botao classBootstrap={"btn-outline-secondary"} onClick={handleAddCaminhao}>Adicionar Caminhão</Botao>
                    </p>
                    <p>
                        <Botao classBootstrap={"btn-outline-secondary"} onClick={handleAddEntrega}>Adicionar Entrega</Botao>
                    </p>
                </FilterAreaStyled>
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

                <SectionListaEntregasStyled className="mt-3">
                    {listaEntregas.map((entrega) => (
                        <ItemListaEntregas key={entrega.id} infoEntrega={entrega} />
                    ))}
                </SectionListaEntregasStyled>
            </SectionCargasStyled>
        </ContainerStyled>
    )
}

export default Monitoramento
