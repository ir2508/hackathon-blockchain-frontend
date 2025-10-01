import React from "react"

const SelectCaminhao = ({ caminhoes, onSelecionar }) => {
    return (
        <div>
            <label htmlFor="select-caminhao">Selecione o caminhão:</label>
            <select id="select-caminhao" onChange={(e) => onSelecionar(e.target.value)}>
                <option value="">-- Escolha --</option>
                {caminhoes.map((caminhao, index) => (
                    <option key={index} value={caminhao}>
                        {caminhao}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectCaminhao
