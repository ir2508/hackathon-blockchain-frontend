import styled from "styled-components"

const DivFormGroupStyled = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 200px;
`

const Select = ({ label, type, id, obrigatorio, value, disabled }) => {
    return (
        <DivFormGroupStyled className="form-floating mb-3">
            <select className="form-select" type={type} id={id} placeholder={label} required={obrigatorio} value={value} disabled={disabled}>
                <option>Todos...</option>
            </select>

            <label htmlFor={id}>{label}</label>
        </DivFormGroupStyled>
    )
}

export default Select
