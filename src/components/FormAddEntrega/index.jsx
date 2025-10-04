import { useRecoilState } from "recoil"
import Botao from "../Botao"
import Input from "../Input"
import { entregasState } from "../../recoil/entregasAtom"
import { useState } from "react"

const FormAddEntrega = () => {
    const [listaEntregas, setListaEntregas] = useRecoilState(entregasState)

    const [novaEntrega, setNovaEntrega] = useState({
        id: 1,
        chavePublicaCaminhao: "",
        tipoEntrega: "",
        status: "Em andamento",
    })

    const handleChange = (e) => {
        setNovaEntrega({
            ...novaEntrega,
            [e.target.id]: e.target.value,
        })
    }

    const handleAddEntrega = (e) => {
        e.preventDefault()
        setListaEntregas((currentEntregas) => [...currentEntregas, novaEntrega])
        // console.log(listaEntregas)
    }

    return (
        <form>
            <Input label="Chave pública do caminhão" type="text" id="chavePublicaCaminhao" onChange={handleChange} obrigatorio={true} />
            <Input label="Tipo" type="text" id="tipoEntrega" onChange={handleChange} obrigatorio={true} />
            <Input label="Status" type="text" id="statusEntrega" obrigatorio={true} value={"Em andamento"} disabled={true} />
            <Botao classBootstrap="btn-success" onClick={handleAddEntrega}>
                Cadastrar nova entrega
            </Botao>
        </form>
    )
}

export default FormAddEntrega
