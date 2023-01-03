import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, filterVideogamesByCreatedInDB, orderByName } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home (){

    const dispatch = useDispatch();
    const allVideogames = useSelector ((state) => state.videogames); // eslint-disable-next-line
    const genres = useSelector((state) => state.genres); // eslint-disable-next-line
    const [orden, setOrden] = useState(''); 
    const [currentPage, setCurrentPage] =useState(1) // eslint-disable-next-line
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage //15
    const indexOfFisrtVideogame = indexOfLastVideogame - videogamesPerPage // eslint-disable-next-line
    const currentVideogames = allVideogames.slice(indexOfFisrtVideogame,indexOfLastVideogame)
    
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames());
    },[dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handlerFilterCreatedInDb(e){
        dispatch(filterVideogamesByCreatedInDB(e.target.value))
    }

    return (
        <div>
            <Link to= '/videogame'>Crear Videogame</Link>
            <h1>Videogames 4ever</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar todos los Videogames
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select onChange={e => handlerFilterCreatedInDb(e)} >
                <option value="All">Todos</option>
                <option value="true">Creados</option>
                <option value="false">Existente</option>
                </select>
                <select>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Casual">Casual</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Indie">Indie</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Racing">Racing</option>
                    <option value="RPG">RPG</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Sports">Sports</option>
                    <option value="Strategy">Strategy</option>
                </select>
                <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
                />
                <SearchBar/>
                {currentVideogames?.map((c) =>{
                    return (
                            <Link to={'/home/' + c.id}>
                            <Card key={c.id} image={c.image} name={c.name} released={c.released} rating={c.rating}/>
                            </Link>
                    );
                })}
            </div>
        </div>
    )
}