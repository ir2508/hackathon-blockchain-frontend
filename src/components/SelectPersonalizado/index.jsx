import styled from "styled-components"

const DivFormGroupStyled = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 200px;
`

const SelectPersonalizado = ({ label, type, id, obrigatorio, onChange, disabled, conteudo }) => {
    return (
        <DivFormGroupStyled className="form-floating mb-3">
            <select className="form-select" type={type} id={id} placeholder={label} required={obrigatorio} onChange={onChange} disabled={disabled}>
                <option value="">Selecione</option>
                {conteudo.map((item) => (<option key={item.value} value={item.value}> {item.label} </option>))}
            </select>

            <label htmlFor={id}>{label}</label>
        </DivFormGroupStyled>
    )
}

export default SelectPersonalizado
