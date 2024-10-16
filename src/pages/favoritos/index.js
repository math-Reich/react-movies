import './style.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos()
{
    const [filmes, setFilmes] = useState([]);
    useEffect(() => {

        const minhaLista = localStorage.getItem("@storageFilmes");
        setFilmes(JSON.parse(minhaLista) || []);

    }, [])

    function excluirFilme(id)
    {
        let filtroFilme = filmes.filter((item) =>  {
            return (item.id !== id);
        })

        setFilmes(filtroFilme);
        localStorage.setItem('@storageFilmes', JSON.stringify(filtroFilme));
        toast.success("Filme removido da lista");

    }

    return (
        <div className='filmes-favoritos'>
            <h1>Filmes favoritos</h1>

            {filmes.length === 0 && <span>No movies here!</span>}

            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>

                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>About</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;