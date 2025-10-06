import { useEffect, useState } from "react"
import { ethers } from "ethers"
import CargaDetalhada from "./CargaDetalhada"

const enderecoContratoCarga = "0xB76e144A9632D5E1Cc8E4A8d42865F11652a490D"
const abiContratoCarga = ["function obterHistorico(address chaveCaminhao) view returns (uint[])"]

const HistoricoCargas = ({ chaveCaminhao }) => {
    const [historico, setHistorico] = useState([])

    useEffect(() => {
        const consultarHistorico = async () => {
            try {
                const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
                const contrato = new ethers.Contract(enderecoContratoCarga, abiContratoCarga, provider)

                const resultado = await contrato.obterHistorico(chaveCaminhao)
                setHistorico(resultado.map((id) => Number(id)))
            } catch (erro) {
                setHistorico([])
                console.error("Erro ao consultar histórico:", erro)
            }
        }

        if (chaveCaminhao) {
            consultarHistorico()
        }
    }, [chaveCaminhao])

    return historico
}

export default HistoricoCargas
