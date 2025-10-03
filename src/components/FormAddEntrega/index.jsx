import Botao from "../Botao"
import Input from "../Input"

const FormAddEntrega = () => {
    return (
        <form>
            <Input label="Chave pública do caminhão" type="text" id="chavePublicaCaminhao" obrigatorio={true} />
            <Input label="Tipo" type="text" id="tipoEntrega" obrigatorio={true} />
            <Input label="Status" type="text" id="statusEntrega" obrigatorio={true} value={"Em andamento"} disabled={true}/>
            <Botao classBootstrap="btn-success" onClick={handleAddEntrega}>Cadastrar nova entrega</Botao>
        </form>
    )
}

export default FormAddEntrega
