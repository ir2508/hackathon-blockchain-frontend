import styled from "styled-components"
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
    return (
        <ContainerStyled className="container">
            <ConteudoPrincipalStyled>
                <h2>Página monitoramento</h2>
                <SectionListaEntregasStyled>
                    <ItemListaEntregas />
                    <ItemListaEntregas />
                    <ItemListaEntregas />
                    <ItemListaEntregas />
                    <ItemListaEntregas />
                    <ItemListaEntregas />
                </SectionListaEntregasStyled>
            </ConteudoPrincipalStyled>
        </ContainerStyled>
    )
}

export default Monitoramento