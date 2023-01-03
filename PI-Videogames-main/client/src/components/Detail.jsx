import React from 'react';
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../actions/index';
import { useEffect } from 'react'; 

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));// eslint-disable-next-line
    },[dispatch])

    const myVideogame = useSelector((state) => state.myVideogame)
    
    console.log(myVideogame);
    return(
        <div>
            {
                // <h1>Hello</h1>
                myVideogame.length>0 ?
                <div>

                    <h1>Hola</h1>
                    <h1>{myVideogame[0].name}</h1>
                    <img src={myVideogame[0].image} alt={myVideogame[0].name} />
                    <h2>Released: {myVideogame[0].released}</h2>
                    <h3>Plataformas: revisar lógica</h3>
                    <h3>Generos: revisar lógica</h3>
                    <h6>Descripción: {myVideogame[0].description}</h6>

                </div>
                 : <p>Loading...</p>
            }
            <Link to= '/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}  