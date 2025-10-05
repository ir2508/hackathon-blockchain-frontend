import styled from "styled-components"

const DivFormGroupStyled = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 200px;
`

const Select = ({ label, type, id, obrigatorio, onChange, disabled, conteudo }) => {
    return (
        <DivFormGroupStyled className="form-floating mb-3">
            <select className="form-select" type={type} id={id} placeholder={label} required={obrigatorio} onChange={onChange} disabled={disabled}>
                <option>Todos</option>
                {conteudo.map((item) => <option key={item.placaCaminhao}>{item.placaCaminhao}</option>)}
            </select>

            <label htmlFor={id}>{label}</label>
        </DivFormGroupStyled>
    )
}

export default Select
