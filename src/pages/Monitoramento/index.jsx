import { useEffect, useState } from "react"
import styled from "styled-components"
import ConsultaCaminhoes from "../../components/ConsultaCaminhoes"
import HistoricoCargas from "../../components/HistoricoCargas"
import ItemListaEntregas from "../../components/ItemListaEntregas"
// import { useRecoilState } from "recoil"
import { entregaSelecionadaState, entregasFiltradasState, entregasState } from "../../recoil/entregasAtom"
import Select from "../../components/Select"
import Botao from "../../components/Botao"
import { caminhaoSelecionadoState, caminhoesState, placasCaminhoesState } from "../../recoil/caminhoesAtom"

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

import { historicoCargasState } from "../../recoil/entregasAtom"

const ContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SectionCargasStyled = styled.section`
    min-width: 90%;
    height: 50vh;
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
    const [listaEntregasFiltradas, setEntregasFiltradas] = useRecoilState(entregasFiltradasState)
    const [listaCaminhoes] = useRecoilState(caminhoesState)
    const [entregaSelecionada, setEntregaSelecionada] = useRecoilState(entregaSelecionadaState)
    const [caminhaoSelecionado, setCaminhaoSelecionado] = useRecoilState(caminhaoSelecionadoState)
    const [listaPlacas] = useRecoilState(placasCaminhoesState)

    const setCaminhoes = useSetRecoilState(caminhoesState)

    // Pega o endereço do caminhão selecionado
    const enderecoCaminhaoSelecionado = caminhaoSelecionado?.detalhesCaminhao?.[0]?.endereco
    // Busca as cargas do caminhão selecionado (retorna array de ids)
    // const listaCargas = HistoricoCargas({ chaveCaminhao: enderecoCaminhaoSelecionado })
    const listaCargas = useRecoilValue(historicoCargasState)

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

    const handleCaminhaoSelecionado = (e) => {
        e.preventDefault()
        setCaminhaoSelecionado({
            placaCaminhao: e.target.value,
            detalhesCaminhao: listaCaminhoes.filter((caminhao) => caminhao.placaCaminhao === e.target.value),
        })
        console.log(listaCargas)
    }

    // Função chamada pelo ConsultaCaminhoes
    const handleCaminhoesCarregados = (caminhoes) => {
        setCaminhoes(
            caminhoes.map((c) => ({
                placaCaminhao: c.placa,
                endereco: c.endereco,
            }))
        )
    }

    return (
        <ContainerStyled className="container">
            <SectionCargasStyled>
                <h2>Monitoramento de entregas</h2>
                <ConsultaCaminhoes onCaminhoesCarregados={handleCaminhoesCarregados} />
                <FilterAreaStyled className="mt-2">
                    <Select label="Filtrar por Caminhão" type="text" id="caminhoes" obrigatorio={true} onChange={handleCaminhaoSelecionado} conteudo={listaPlacas} />
                    <p>
                        <Botao classBootstrap={"btn-outline-secondary"} onClick={handleAddEntrega}>
                            Adicionar Entrega
                        </Botao>
                    </p>
                </FilterAreaStyled>

                {/* Dispara a busca de histórico de cargas */}
                {enderecoCaminhaoSelecionado && <HistoricoCargas chaveCaminhao={enderecoCaminhaoSelecionado} />}

                {/* Lista de cargas detalhadas */}
                <SectionListaEntregasStyled className="mt-3">
                    {listaCargas.length > 0 ? (
                        listaCargas.map((carga) => {
                            return <ItemListaEntregas key={carga.id} infoEntrega={carga} />
                        })
                    ) : (
                        <p>Selecione um caminhão para ver as entregas.</p>
                    )}
                </SectionListaEntregasStyled>
            </SectionCargasStyled>
        </ContainerStyled>
    )
}

export default Monitoramento
