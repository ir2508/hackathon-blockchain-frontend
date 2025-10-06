import styled from "styled-components"
import Botao from "../../components/Botao"
import Input from "../../components/Input"
import FormAddCaminhao from "../../components/FormAddCaminhao"

const ContainerStyled = styled.div`
    /* width: 100vw;
    height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
`

const ConteudoPrincipalStyled = styled.main`
    /* min-width: 50%;
    height: 95vh; */
`

const FormStyled = styled.form`
    margin-top: 50px;
    max-height: 70%;
    overflow-y: auto;
    scrollbar-color: #444 #fff;
    padding-right: 30px;
`

const CadastrarCaminhao = () => {
    return (
        <ContainerStyled>
            <ConteudoPrincipalStyled>
                <h2>Página Cadastrar Caminhão</h2>
                <FormAddCaminhao />
            </ConteudoPrincipalStyled>
        </ContainerStyled>
    )
}

export default CadastrarCaminhao
