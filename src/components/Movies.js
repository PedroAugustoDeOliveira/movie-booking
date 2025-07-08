import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components";
import "./../assets/style.css"
import "./MovieTime"
import { Link } from "react-router";


export default function Movies() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        promise.then((response) => {
            const { data } = response;
            setMovies(data)
        })
    }, [])

    return (
        <main className="container">
            <div className="select">
                <h2>Select the Movie</h2>
            </div>

            <Div>
                {
                    movies.map(movie => {
                        const { id, title, posterURL } = movie;
                        return <Link to={`/filme/${id}`}><div className="movie" key={id}>
                            <img src={posterURL} alt={title} />
                        </div>
                        </Link>
                    })
                }
            </Div>
        </main>
    )
}

const Div = styled.div`

display: flex;
flex-wrap: wrap;
gap: 14px;
align-items: center;
justify-content: center;

.movie{
 width: 145px;
 height: 209px;
 background-color: #ffffff;
 border-radius: 3px;
 box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 10%);
 display: flex;
 align-items: center;
 justify-content: center;
}

.movie img{
 width: 129px;
 height: 193px;
}
`