import { useState } from "react"
import styled from "styled-components"
import SelectCaminhao from "../../components/SelectCaminhao"
import ItemListaEntregas from "../../components/ItemListaEntregas"

const ContainerStyled = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    `

const ConteudoPrincipalStyled = styled.main`
    min-width: 90%;
    height: 95vh;
`

const SectionListaEntregasStyled = styled.section`
    margin-top: 50px;
    max-height: 70%;
    overflow-y: auto;
    scrollbar-color: #444 #fff;
    padding-right: 30px;
`


const Monitoramento = () => {
    const [caminhaoSelecionado, setCaminhaoSelecionado] = useState("")

    const caminhoes = ["Caminhão 1", "Caminhão 2", "Caminhão 3"]

    const entregas = [
        { id: 1, caminhao: "Caminhão 1", tipo: "Congelados" },
        { id: 2, caminhao: "Caminhão 2", tipo: "Congelados" },
        { id: 3, caminhao: "Caminhão 1", tipo: "Congelados" },
        { id: 4, caminhao: "Caminhão 3", tipo: "Congelados" },
    ]

    const entregasFiltradas = caminhaoSelecionado
        ? entregas.filter(entrega => entrega.caminhao === caminhaoSelecionado)
        : entregas

    return (
        <ContainerStyled className="container">
            <ConteudoPrincipalStyled>
                <h2>Página monitoramento</h2>
                <select onChange={(e) => setCaminhaoSelecionado(e.target.value)}>
                    <option value="">Todos os caminhões</option>
                    {caminhoes.map((caminhao, index) => (
                        <option key={index} value={caminhao}>{caminhao}</option>
                    ))}
                </select>
                <SectionListaEntregasStyled>
                    {entregasFiltradas.map(entrega => (
                        <ItemListaEntregas
                            key={entrega.id}
                            caminhao={entrega.caminhao}
                            tipo={entrega.tipo}
                        />
                    ))}
                </SectionListaEntregasStyled>
            </ConteudoPrincipalStyled>
        </ContainerStyled>
    )
}

export default Monitoramento