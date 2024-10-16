import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home';
import Filme from './pages/filmes';
import Header from "./components/header";
import Error from "./pages/error";
import Favoritos from "./pages/favoritos";

function RoutePages()
{
    return (
        <BrowserRouter>
            <Header/>
            
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/filme/:id" element={ <Filme/> }/>
                <Route path="/favoritos" element={ <Favoritos/> }/>
                
                <Route path="*" element={ <Error/> }/>

            </Routes>
        </BrowserRouter>
    )
}

export default RoutePages;