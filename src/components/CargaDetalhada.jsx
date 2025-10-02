import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { format } from "date-fns"

const enderecoContratoCarnes = "0x42F904182B6653e7f910419b740D5eA84e94888f"
const abiContratoCarnes = ["function obterCarga(uint cargaId) view returns (uint, address, uint8)", "function obterAfericoes(uint cargaId) view returns (tuple(int temperaturaDecimosCelsius, uint timestamp)[])"]

const CargaDetalhada = ({ cargaId }) => {
    const [status, setStatus] = useState(null)
    const [afericoes, setAfericoes] = useState([])

    const consultarDetalhes = async () => {
        try {
            const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
            const contrato = new ethers.Contract(enderecoContratoCarnes, abiContratoCarnes, provider)

            const [, , statusRaw] = await contrato.obterCarga(cargaId)
            const afericoesResultado = await contrato.obterAfericoes(cargaId)

            setStatus(Number(statusRaw))
            setAfericoes(afericoesResultado)
        } catch (erro) {
            console.error("Erro ao consultar carga:", erro)
        }
    }

    useEffect(() => {
        if (cargaId) {
            consultarDetalhes()
        }
    }, [cargaId])

    const statusTexto = (s) => {
        switch (s) {
            case 0:
                return "Em andamento"
            case 1:
                return "Finalizada"
            case 2:
                return "Rejeitada"
            default:
                return "Desconhecido"
        }
    }

    const afericoesTexto =
        afericoes.length > 0
            ? afericoes
                  .map((afericao, index) => {
                      const temp = (Number(afericao.temperaturaDecimosCelsius) / 10).toFixed(1)
                      const data = format(new Date(Number(afericao.timestamp) * 1000), "dd/MM")
                      return `${temp}°C ${index < afericoes.length - 1 ? ", " : ""}`
                      // return `${temp}°C (${data})${index < afericoes.length - 1 ? ", " : ""}`
                  })
                  .join(" ")
            : "Nenhuma"

    return (
        <li>
            <strong>Carga #{cargaId}</strong> | Status: {statusTexto(status)} | Aferições: {afericoesTexto}
        </li>
    )
}

export default CargaDetalhada
