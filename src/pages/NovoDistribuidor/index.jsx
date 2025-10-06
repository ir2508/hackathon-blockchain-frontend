import styled from "styled-components"
import Botao from "../../components/Botao"

const ContainerPrincipalStyled = styled.div`
    /* display: flex;
    justify-content: center;
    align-items: center; */
`

const NovoDistribuidor = () => {
    const handleCadastrarDistribuidora = (e) => {
        e.preventDefault()

        // Código para conectar com a metamask
    }

    return (
        <ContainerPrincipalStyled>
            <h2>Página Quero ser um distribuidor</h2>
            <Botao classBootstrap={"btn-success mt-5"} onClick={handleCadastrarDistribuidora}>
                Cadastrar minha distribuidora
            </Botao>
        </ContainerPrincipalStyled>
    )
}

export default NovoDistribuidor
