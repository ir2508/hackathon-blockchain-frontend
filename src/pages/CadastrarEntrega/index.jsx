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

const CadastrarEntrega = () => {
    return (
        <ContainerStyled>
            <ConteudoPrincipalStyled>
                <h2>Página Cadastrar Entrega</h2>
                <FormStyled>
                    <Input label="ID do Caminhão" type="text" id="idCaminhao" obrigatorio={true} />
                    <Input label="Categoria da entrega" type="text" id="categoriaEntrega" obrigatorio={true} />
                    <Input label="Data inicio" type="datetime-local" id="dataInicio" obrigatorio={true} />
                    <Input label="Data fim" type="datetime-local" id="dataFim" obrigatorio={false} />
                    <Botao classBootstrap="btn-success">Cadastrar nova entrega</Botao>
                </FormStyled>
            </ConteudoPrincipalStyled>
        </ContainerStyled>
    )
}

export default CadastrarEntrega
