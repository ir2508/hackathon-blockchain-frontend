import Botao from "../Botao"
import Input from "../Input"

const FormTemperatura = ({ carga }) => {
    return (
        <form>
            <Input label="ID da carga" type="text" id="idCarga" obrigatorio={true} value={carga.idEntrega} disabled={true} />
            <Input label="Temperatura Celsius" type="text" id="temperatura" obrigatorio={true} />
            <Botao classBootstrap="btn-success">Registrar temperatura</Botao>
        </form>
    )
}

export default FormTemperatura
