import { useLocation } from "react-router"
import styled from "styled-components";
import { Link } from "react-router";



export default function SuccessPage() {

    const location = useLocation();
    const { name, cpf, seats, movie, time, date } = location.state;

    return (
        <Div>
            <h2 className="title">
                Pedido feito com sucesso!
            </h2>

            <div className="info">
                <h2>Movie and session</h2>
                <p>{movie}</p>
                <p>{date} - {time}</p>

            </div>

            <div className="seats">
                <h2>Tickets</h2>
                {seats.map((seat, index) =>(
                    <p key={index}> Seat {seat}</p>
                ))}
            </div>

            <div className="buyer">
                <h2>Buyer</h2>
                <p>Name:{name}</p>
                <p>CPF: {cpf}</p>
            </div>

            <div className="footer">

               <Link to={"/"}> <button>Come Back Home</button></Link>
            </div>
        </Div>
    )
}

const Div = styled.div`
display: flex;
flex-direction: column;
font-family: "Roboto", sans-serif;
align-items: center;
gap: 30px;

.title{
 font-size: 24px;
 font-weight: 700;
 line-height: 100%;
 font-family: "Roboto", sans-serif;
 color: #247A6B;
 margin-top: 20px;
}

.info h2{
 font-size: 24px;
 font-weight: 700;
 line-height: 100%;
}

.info p{
 font-size: 22px;
 font-weight: 400;
 line-height: 100%;
 color: #293845;
}

.seats h2{
 font-size: 24px;
 font-weight: 700;
 line-height: 100%;
}

.seats p{
 font-size: 22px;
 font-weight: 400;
 line-height: 100%;
 color: #293845;
}

.buyer h2{
 font-size: 24px;
 font-weight: 700;
 line-height: 100%;
}

.buyer p{
 font-size: 22px;
 font-weight: 400;
 line-height: 100%;
 color: #293845;
}



`