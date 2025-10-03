import { useRecoilState } from "recoil"
import { entregaSelecionadaState, entregasState } from "../../recoil/entregasAtom"
import Input from "../Input"
import Botao from "../Botao"

const DetalhesEntrega = ({ carga }) => {
    const [entregaSelecionada] = useRecoilState(entregaSelecionadaState)
    const [listaEntregas, setListaEntregas] = useRecoilState(entregasState)


    return (
        <form>
            <Input label="ID da carga" type="text" id="idCarga" obrigatorio={true} value={carga.idEntrega} disabled={true} />
            <Input label="ID do caminhão" type="text" id="idCarga" obrigatorio={true} value={carga.detalhesEntrega[0].caminhao} disabled={true} />
            <Input label="Tipo" type="text" id="idCarga" obrigatorio={true} value={carga.detalhesEntrega[0].tipo} disabled={true} />
            <Input label="Status" type="text" id="idCarga" obrigatorio={true} value={carga.detalhesEntrega[0].status} disabled={true} />
            <img className="mt-3" width={"250px"} src="/exemplo-grafico-linha.png" />
        </form>
    )
}

export default DetalhesEntrega
