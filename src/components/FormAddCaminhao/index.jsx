import Botao from "../Botao"
import Input from "../Input"

const FormAddCaminhao = () => {
    return (
        <form>
            <Input label="Chave pública do caminhão" type="text" id="chavePublicaCaminhao" obrigatorio={true} />
            <Input label="Placa" type="text" id="placaCaminhao" obrigatorio={true} />
            <Botao classBootstrap="btn-success">Cadastrar novo caminhão</Botao>
        </form>
    )
}

export default FormAddCaminhao
