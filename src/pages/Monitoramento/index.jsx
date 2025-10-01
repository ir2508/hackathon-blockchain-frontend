import { useState } from "react"
import styled from "styled-components"
import ConsultaCaminhoes from "../../components/ConsultaCaminhoes"
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
    const [caminhoesContrato, setCaminhoesContrato] = useState([])

    const entregas = [
        { id: 1, caminhao: "0x123...", tipo: "Congelados" },
        { id: 2, caminhao: "0x456...", tipo: "Congelados" },
        { id: 3, caminhao: "0x123...", tipo: "Congelados" },
        { id: 4, caminhao: "0x789...", tipo: "Congelados" },
    ]

    const entregasFiltradas = caminhaoSelecionado
        ? entregas.filter(entrega => entrega.caminhao === caminhaoSelecionado)
        : entregas

    return (
        <ContainerStyled className="container">
            <ConteudoPrincipalStyled>
                <h2>Página monitoramento</h2>

                <ConsultaCaminhoes onCaminhoesCarregados={setCaminhoesContrato} />

                <label htmlFor="select-caminhao">Selecione o caminhão:</label>
                <select
                    id="select-caminhao"
                    onChange={(e) => setCaminhaoSelecionado(e.target.value)}
                >
                    <option value="">Todos os caminhões</option>
                    {caminhoesContrato.map((c, index) => (
                        <option key={index} value={c.endereco}>
                            {c.placa} ({c.endereco.slice(0, 6)}…)
                        </option>
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
