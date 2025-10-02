import styled from "styled-components"
import Input from "../Input"
import Botao from "../Botao"

const AsideStyled = styled.aside`
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px #f0f1f2;
    border-radius: 5px;
    padding: 40px;
    min-width: 350px;
`

const Aside = () => {
    return (
        <AsideStyled>
            <h2>Aside</h2>
            <Input label="ID da carga" type="text" id="idCarga" obrigatorio={true} />
            <Input label="Temperatura Celsius" type="text" id="temperatura" obrigatorio={true} />
            <Botao classBootstrap="btn-success">Registrar temperatura</Botao>
        </AsideStyled>
    )
}

export default Aside
