import styled from "styled-components"
import Botao from "../../components/Botao"
import Input from "../../components/Input"

const ContainerStyled = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ConteudoPrincipalStyled = styled.main`
    min-width: 50%;
    height: 95vh;
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
                <FormStyled>
                    <Input label="Chave pública do caminhão" type="text" id="chavePublicaCaminhao" obrigatorio={true} />
                    <Input label="Placa" type="text" id="placaCaminhao" obrigatorio={true} />
                    <Botao classBootstrap="btn-success">Cadastrar novo caminhão</Botao>
                </FormStyled>
            </ConteudoPrincipalStyled>
        </ContainerStyled>
    )
}

export default CadastrarCaminhao
