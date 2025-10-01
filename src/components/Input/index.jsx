import styled from "styled-components"

const DivFormGroupStyled = styled.div`
    display: flex;
    flex-direction: column;
`

const Input = ({ label, type, id, obrigatorio }) => {
    return (
        <DivFormGroupStyled className="form-floating mb-3">
            <input className="form-control" type={type} id={id} placeholder={label} required={obrigatorio}/>
            <label htmlFor={id}>{label}</label>
        </DivFormGroupStyled>
    )
}

export default Input