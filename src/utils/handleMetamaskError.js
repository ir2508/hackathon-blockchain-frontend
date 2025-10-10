export default function handleMetamaskError(error, fallbackMessage, setMensagemRetorno) {
  let message = fallbackMessage

  if (error.code === 4001) {
    message = "Solicitação rejeitada pelo usuário."
  } else if (error.reason) {
    message = error.reason
  } else if (error.message) {
    message = error.message
  }

  setMensagemRetorno({ mensagemRetorno: message })
  console.error("Erro MetaMask:", error)
}
