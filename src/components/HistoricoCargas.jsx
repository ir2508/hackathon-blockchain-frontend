import { useEffect } from "react"
import { ethers } from "ethers"
import { historicoCargasState } from "../recoil/entregasAtom"
import { caminhoesState } from "../recoil/caminhoesAtom"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { obterCargaDetalhada } from "../utils/cargaDetalhada"

const enderecoContratoCarga = "0xB76e144A9632D5E1Cc8E4A8d42865F11652a490D"
const abiContratoCarga = [
    "function obterHistorico(address chaveCaminhao) view returns (uint[])"
]

const HistoricoCargas = ({ chaveCaminhao }) => {
    const setHistorico = useSetRecoilState(historicoCargasState)
    const caminhoes = useRecoilValue(caminhoesState)

    useEffect(() => {
        const consultarHistorico = async () => {
            try {
                const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
                const contrato = new ethers.Contract(enderecoContratoCarga, abiContratoCarga, provider)

                const resultado = await contrato.obterHistorico(chaveCaminhao)
                const ids = resultado.map((id) => Number(id))

                // 🔍 Busca os detalhes de cada carga
                const cargasDetalhadas = await Promise.all(
                    ids.map((id) => obterCargaDetalhada(id, caminhoes))
                )

                setHistorico(cargasDetalhadas)
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
