import { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import api from '../service/api'
import './style.css'
import { toast } from "react-toastify";

function Filme()
{
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        async function loadFilme()
        {
            await api.get(`/movie/${id}`, {
                params: 
                {
                    api_key: "2cce89105d714803d9bb3629cb8cdbe5",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/", { replace: true });
            })
        }

        loadFilme();

        return () => {
            console.log("componente desmontado");
        }
    }, [navigate, id])

    function saveMovies()
    {
        const minhalista = localStorage.getItem("@storageFilmes");

        let filmesSalvos = JSON.parse(minhalista) || [];

        const existsFilme = filmesSalvos.some((filmeNaTabela) => filmeNaTabela.id === filme.id)

        if (existsFilme)
        {
            toast.warn("filme já existe na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@storageFilmes", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso");
    }

    if (loading)
    {
        return (
            <div className="loading">
                <h2>Enrolando o maço de filmes</h2>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            <h1> {filme.title} </h1>
            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} out of 10</strong>
        
            <div className="area-buttons">
                <button onClick={saveMovies}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
            </div>
        
        </div>
    )
}

export default Filme;