import "./../assets/style.css"
import styled from "styled-components"
import axios from "axios"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";


export default function MovieTime() {

    const { movieId } = useParams();
    const [movieTime, setMovieTime] = useState(null);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setMovieTime(response.data)
        }).catch((error) => {
            console.error(error);
        });
    }, [movieId])


    return (
        <div className="main">
            <div className="select">
                <h2>Select the Time</h2>
            </div>

            <Div>
                {
                    movieTime?.days?.map(day => (
                        <div className="time">
                            <p>{day.weekday} - {day.date}</p>
                            <div className="buttons">
                                {day.showtimes.map(showtime => (
                                    <Link to={`/sessao/${showtime.id}`} key={showtime.id}>
                                        <button key={showtime.id}>{showtime.name}</button>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    ))
                }
            </Div>
        </div>
    )
}

const Div = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

.time{
 diplay: flex;
 flex-direction: column;  
 align items: center;
 justify-content: center;
 gap: 10px;  
}
.time p{
 font-family: "Roboto", sans-serif;
 font-size: 20px;
 font-weight: 400;
 line-height: 100%;
}

.time.buttons{
 display:flex;
 gap: 10px; 
}

.time button{
 background-color: #E8833A;
 border-radius: 3px;
 width: 83px;
 height: 43px;
 font-size: 18px;
 font-weight: 400;
 color: #ffffff;
 border: none;
 margin: 10px;
}


`

