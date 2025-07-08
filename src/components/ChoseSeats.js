import styled from "styled-components";
import axios from "axios"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./../assets/style.css"
import { useNavigate } from "react-router";



export default function ChoseSeats() {

    const [sessionSeats, setSessionSeats] = useState(null);
    const { sessaoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`)
        promise.then((response) => {
            const { data } = response;
            console.log(data)
            setSessionSeats(response.data)
        }).catch((error) => {
            console.error(error);
        });

    }, [sessaoId])

    const [selectedSeats, setSelectedSeats] = useState([]);

    function handleSeat(seat) {
        if (!seat.isAvailable) return;

        const alreadySelected = selectedSeats.some(s => s.id === seat.id);

        if (alreadySelected) {
            setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id))
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    }

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");

    function handleSubmit() {
        if (!name || !cpf) {
            alert("Please, fill your name and CPF");
            return;
        }

        if (!isValidCpf(cpf)) {
            alert("Invalid CPF. Use the format XXX.XXX.XXX-XX or only numbers")
            return;
        }
        if (selectedSeats.length === 0) {
            alert("Please, select at least one seat.");
            return;
        }

        const body = {
            ids: selectedSeats.map(s => s.id),
            name: name,
            cpf: cpf
        };

        axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", body)
            .then(() => {
                navigate("/sucesso", {
                    state: {
                        name,
                        cpf,
                        seats: selectedSeats.map(s => s.name),
                        movie: sessionSeats.movie.title,
                        time: sessionSeats.name,
                        date: sessionSeats.day.date
                    }
                });
            })
            .catch((err) => {
                console.error(err);
                alert("Error booking seats. Please, try again.")
            })
    }

    function formatCpf(value) {
        const onlyNumbers = value.replace(/\D/g, "")
        return onlyNumbers
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
            .slice(0, 14);
    }

    function isValidCpf(cpf) {
        const onlyNumbers = cpf.replace(/\D/g, "")
        return onlyNumbers.length === 11
    }



    return (
        <section className="section">
            <div className="select">
                <h2>Select the Seat</h2>
            </div>

            <Div>
                {
                    sessionSeats?.seats.map(seat => (
                        <div className="seat" key={seat.id}>
                            <button
                                onClick={() => handleSeat(seat)}
                                disabled={!seat.isAvailable}
                                className={
                                    !seat.isAvailable
                                        ? "unavailable"
                                        : selectedSeats.some(s => s.id === seat.id)
                                            ? "selected"
                                            : ""
                                }
                            >{seat.name}</button>
                        </div>
                    ))
                }
            </Div>

            <Info>
                <div className="selected">
                    <button></button>
                    <p>Selected</p>
                </div>
                <div className="available">
                    <button></button>
                    <p>Available</p>
                </div>
                <div className="unavailable">
                    <button></button>
                    <p>Unavailable</p>
                </div>
            </Info>

            <Input>
                <div>
                    <p>Name</p>
                    <input type="text" placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <p>CPF</p>
                    <input
                        type="text" placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(formatCpf(e.target.value))}
                    />
                </div>
            </Input>

            <div className="footer">
                <button onClick={handleSubmit}>Reservar Assento(s)</button>
            </div>
        </section>
    )
}

const Div = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
align-items: center;
justify-content: center;

.seat button{
 width: 26px;
 height: 26px;
 border-radius: 12px;
 border: 1px solid #808F9D;
 font-size: 11px;
 line-height: 100%;
 font-weight: 400;
}

.selected {
 background-color: #8DD7CF;
 border: 1px solid #45BDB0;
}

.unavailable{
 background-color: #FBE192;
 border: 1px solid #F7C52B;
 cursor: not-allowed;
}
`
const Input = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
margin 10px;
align-items: center;
margin-top: 20px;

input{
 width: 327px;
 height: 51px;
 border-radius: 3px;
 border: 1px solid #D4D4D4;
 font-size: 18px;
 line-height: 100%;
 font-weight: 400;
 color: #AFAFAF;
}

p{
 font-family: "Roboto", sans-serif;
 font-weight: 400;
 font-size: 18px;
 line-height: 100%;
 color: #293845;
}
`
const Info = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
margin-top: 20px;

p{
 font-size: 13px;
 font-weight: 400;
 line-height: 100%;
 font-family: "Roboto", sans-serif;
}

.selected button{
 width: 25px;
 height: 25px;
 border-radius: 12px;
 border: 1px solid #1AAE9E;
 background-color: #8DD7CF;
}

.available button{
 width: 25px;
 height: 25px;
 border-radius: 12px;
 background-color: #C3CFD9;
 border: 1px solid #7B8B99;
}

.unavailable button{
 width: 25px;
 height: 25px;
 border-radius: 12px;
 background-color: #FBE192;
 border: 1px solid #F7C52B;
}
`