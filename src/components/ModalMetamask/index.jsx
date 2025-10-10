// components/ModalMetamask.jsx
import React from "react"

const ModalMetamask = ({ mensagem }) => {
    return (
        <div className="modal fade" id="loginMetamask" tabIndex="-1" aria-labelledby="loginMetamaskLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="loginMetamaskLabel">
                            Informações de conexão MetaMask
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul>
                            <li>
                                Mensagem:
                                <ul>
                                    <li>{mensagem}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalMetamask
