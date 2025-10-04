import { useRecoilState } from "recoil"
import Botao from "../Botao"
import Input from "../Input"
import { useState } from "react"
import { caminhoesState } from "../../recoil/caminhoesAtom"

const FormAddCaminhao = () => {
    const [listaCaminhoes, setListaCaminhoes] = useRecoilState(caminhoesState)

    const [novoCaminhao, setNovoCaminhao] = useState({
        chavePublicaCaminhao: "",
        placaCaminhao: "",
    })

    const handleChange = (e) => {
        setNovoCaminhao({
            ...novoCaminhao,
            [e.target.id]: e.target.value,
        })
    }

    const handleAddCaminhao = (e) => {
        e.preventDefault()
        setListaCaminhoes((currentCaminhoes) => [...currentCaminhoes, novoCaminhao])
        // console.log(listaCaminhoes)
    }

    return (
        <form>
            <Input label="Chave pública do caminhão" type="text" id="chavePublicaCaminhao" onChange={handleChange} obrigatorio={true} />
            <Input label="Placa" type="text" id="placaCaminhao" onChange={handleChange} obrigatorio={true} />
            <Botao classBootstrap="btn-success" onClick={handleAddCaminhao}>Cadastrar novo caminhão</Botao>
        </form>
    )
}

export default FormAddCaminhao
