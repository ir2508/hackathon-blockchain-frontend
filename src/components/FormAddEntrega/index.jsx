import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from "recoil"
import Botao from "../Botao"
import Input from "../Input"
import { entregasState } from "../../recoil/entregasAtom"
import { useState } from "react"
import { placasCaminhoesState } from '../../recoil/caminhoesAtom';
import Select from '../Select';

const FormAddEntrega = () => {
    const [listaEntregas, setListaEntregas] = useRecoilState(entregasState)
    const [listaPlacas] = useRecoilState(placasCaminhoesState)


    const [novaEntrega, setNovaEntrega] = useState({
        id: uuidv4(),
        placaCaminhao: "",
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
        console.log(listaPlacas)
        e.preventDefault()
        setNovaEntrega({
            ...novaEntrega,
            id: uuidv4(),
        })
        setListaEntregas((currentEntregas) => [...currentEntregas, novaEntrega])
    }

    return (
        <>
            <form>
                <Select label="Placa do caminhão" type="text" id="placaCaminhao" onChange={handleChange} obrigatorio={true} conteudo={listaPlacas} />
                {/* <Input label="Placa do caminhão" type="text" id="placaCaminhao" onChange={handleChange} obrigatorio={true} /> */}
                <Input label="Tipo" type="text" id="tipoEntrega" onChange={handleChange} obrigatorio={true} />
                <Input label="Status" type="text" id="statusEntrega" obrigatorio={true} value={"Em andamento"} disabled={true} />
                <Botao classBootstrap="btn-success" onClick={handleAddEntrega}>
                    Cadastrar nova entrega
                </Botao>
            </form>
        </>
    )
}

export default FormAddEntrega
