import { useEffect } from "react"
import { ethers } from "ethers"
import { useSetRecoilState } from "recoil"
import { historicoCargasState } from "../recoil/entregasAtom"

const enderecoContratoCarga = "0xB76e144A9632D5E1Cc8E4A8d42865F11652a490D"
const abiContratoCarga = [
    "function obterHistorico(address chaveCaminhao) view returns (uint[])"
]

const HistoricoCargas = ({ chaveCaminhao }) => {
    const setHistorico = useSetRecoilState(historicoCargasState)

    useEffect(() => {
        const consultarHistorico = async () => {
            try {
                const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
                const contrato = new ethers.Contract(enderecoContratoCarga, abiContratoCarga, provider)

                const resultado = await contrato.obterHistorico(chaveCaminhao)

                const ids = resultado.map((id) => Number(id))
                setHistorico(ids)
            } catch (erro) {
                console.error("Erro ao consultar histórico:", erro)
                setHistorico([])
            }
        }

        if (chaveCaminhao) {
            consultarHistorico()
        }
    }, [chaveCaminhao, setHistorico])

    return null 
}

export default HistoricoCargas
