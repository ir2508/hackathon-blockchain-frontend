import { useEffect, useState } from "react"
import { ethers } from "ethers"

const enderecoContratoCarga = "0x17A30522f67d7221EBA84f4ff307Cb6aA19b5E4D"
const abiContratoCarga = [
  "function obterHistorico(address chaveCaminhao) view returns (uint[])"
]

const HistoricoCargas = ({ chaveCaminhao }) => {
  const [historico, setHistorico] = useState([])

  const consultarHistorico = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
      const contrato = new ethers.Contract(enderecoContratoCarga, abiContratoCarga, provider)

      const resultado = await contrato.obterHistorico(chaveCaminhao)
      setHistorico(resultado.map(id => Number(id)))
    } catch (erro) {
      console.error("Erro ao consultar histórico:", erro)
    }
  }

  useEffect(() => {
    if (chaveCaminhao) {
      consultarHistorico()
    }
  }, [chaveCaminhao])

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Histórico de cargas para {chaveCaminhao.slice(0, 8)}…</h4>
      <ul>
        {historico.length > 0 ? (
          historico.map((id, index) => <li key={index}>Carga ID: {id}</li>)
        ) : (
          <li>Nenhum histórico encontrado</li>
        )}
      </ul>
    </div>
  )
}

export default HistoricoCargas
