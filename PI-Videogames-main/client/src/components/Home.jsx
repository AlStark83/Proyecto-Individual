import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'

export default function Home (){

    const dispatch = useDispatch();
    const allVideogames = useSelector ((state) => state.videogames);

    useEffect(() => {
        dispatch(getVideogames());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    return (
        <div>
            <Link to= '/videogame'>Crear Videogame</Link>
            <h1>Videogames 4ever</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar todos los personajes
            </button>
            <div>
                <select name="" id="">
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select name="" id="">
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existente</option>
                </select>
                {allVideogames?.map((c) =>{
                    return (
                        <fragment>
                            <Link to={'/home' + c.id}>
                            <Card name={c.name} released={c.released} rating={c.rating}/>
                            </Link>
                        </fragment>
                    );
                })}
            </div>
        </div>
    )
}