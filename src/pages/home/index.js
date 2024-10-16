import { useEffect, useState } from 'react';
import api from '../service/api';
import { Link } from 'react-router-dom';
import './style.css';

function Home()
{
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "2cce89105d714803d9bb3629cb8cdbe5",
                    language: "pt-BR",
                    page: 1,
                }
            })

            setFilmes(response.data.results.slice(0, 15));
            setLoading(false);
        }

        loadFilmes();

    }, [])

    if (loading)
    {
        return (
            <div className='loading'>
                <h2>carregando....</h2>
            </div>
        )
    }

    return (
        <div className="Container">
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}></img>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;