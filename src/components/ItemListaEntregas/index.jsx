import styled from "styled-components"
import Botao from "../Botao"

const ItemListaStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    margin-bottom: 20px;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #ccc;
    &:hover {
        box-shadow: 1px 1px 1px #ccc;
    }

    h3 {
        font-weight: 400;
        font-size: 1.2em;
    }
    
    h5 {
        font-weight: 400;
        font-size: 1em;
    }

    img {
        max-width: 200px;
    }
`

const ItemListaEntregas = () => {
    return (
        <ItemListaStyled>
            <div>
                <h3>Caminhão 1</h3>
                <h5>5d41402abc4b2a76b9719d911017c592</h5>
            </div>
            <div>
                <img src="/exemplo-grafico-linha.png" />
            </div>
            <div>
                <Botao>Registrar temperatura</Botao><Botao>Finalizar entrega</Botao>
            </div>
        </ItemListaStyled>
    )
}

export default ItemListaEntregas