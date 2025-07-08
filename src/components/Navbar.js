import styled from "styled-components"

export default function Navbar() {
    return (
        <Div>
            <h1>CINEFLEX</h1>
        </Div>
    )
}

const Div = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    widht: 375px;
    height: 67px;

  h1{
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 34px;
    line-height: 100%;
    color: #E8833A;
  }
`