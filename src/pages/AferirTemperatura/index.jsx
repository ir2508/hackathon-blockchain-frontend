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

const AferirTemperatura = () => {
    return (
        <ContainerStyled>
            <ConteudoPrincipalStyled>
                <h2>Página Registrar Temperatura</h2>
                <FormStyled>
                    <Input label="ID da carga" type="text" id="idCarga" obrigatorio={true} />
                    <Input label="Temperatura Celsius" type="text" id="temperatura" obrigatorio={true} />
                    <Botao classBootstrap="btn-success">Registrar temperatura</Botao>
                </FormStyled>
            </ConteudoPrincipalStyled>
        </ContainerStyled>
    )
}

export default AferirTemperatura
