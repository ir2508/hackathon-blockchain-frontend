import { useEffect, useState } from "react"
import Botao from "../Botao"
import Input from "../Input"

const FormTemperatura = ({ carga }) => {
    const [idEntrega, setIdEntrega] = useState(carga.idEntrega)

    const [afericao, setAfericao] = useState({
        idEntrega: idEntrega,
        temperatura: "",
        timestamp: "",
    })

    useEffect(() => {
        setIdEntrega(carga.idEntrega)
    }, [carga.idEntrega])

    const handleChange = (e) => {
        setAfericao({
            ...afericao,
            [e.target.id]: e.target.value,
        })
    }

    const handleAferirTemperatura = (e) => {
        e.preventDefault()
        const timestampAtual = Math.floor(Date.now() / 1000)
        setAfericao({
            ...afericao,
            idEntrega: idEntrega,
            timestamp: timestampAtual,
        })
    }

    return (
        <>
            <h5 className="text-center">Registrar temperatura</h5>
            <form className="mt-3">
                <Input label="ID da carga" type="text" id="idEntrega" obrigatorio={true} value={carga.idEntrega} onChange={handleChange} disabled={true} />
                <Input label="Temperatura Celsius" type="number" id="temperatura" obrigatorio={true} onChange={handleChange} />
                <div className="text-center">
                    <Botao classBootstrap="btn-success" largura={"100%"} onClick={handleAferirTemperatura}>
                        Registrar temperatura
                    </Botao>
                </div>
            </form>
        </>
    )
}

export default FormTemperatura
