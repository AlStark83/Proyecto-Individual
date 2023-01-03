import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'; // eslint-disable-next-line
import { postVideogame, getGenres} from  '../actions/index'
import {useDispatch, useSelector} from 'react-redux';

function validate(input){
    let errors = {};
    if (!input.name){
        errors.name = 'Se requiere un nombre';
    }else if(!input.description){
        errors.description = 'Se requiere descripción';
    }
    return errors;
}


export default function VideogameCreate(){
    const dispatch = useDispatch();
    const history = useHistory();// eslint-disable-next-line
    const genres = useSelector((state) => state.genres)
    const [errors, setErrors] = useState({});

    const[input, setInput] = useState({
        name:'',
        description:'',
        released:'',
        rating:'',
        image:'',
        genres:[],
        platforms:[],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input)
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.vaue
            })
        }
    }

    // function handleSelect(e){ //para input type 'select' ej.genres si se hace con select
    //     setInput({
    //         ...input,
    //         genres: [...input.genres, e.target.value]
    //     })
    // }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postCharacter(input))
        alert('Videogame creado!!')
        setInput({
            name:'',
            description:'',
            released:'',
            rating:'',
            image:'',
            genres:[],
            platforms:[],
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input,
            genre: input.genre.filter( gen => gen !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres())
    },[]);

    return (
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Crea tu Videogame</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input
                     type="text" 
                     value={input.name}
                     name= 'name'
                     onChange={(e) => handleChange(e)}
                     />
                     {errors.name && (
                        <p className="error">{errors.name}</p>
                     )}
                </div>
                <div>
                    <label>Descripción</label>
                    <input
                     type="text" 
                     value={input.description}
                     name= 'description'
                     onChange={(e) => handleChange(e)}
                     /></div>
                <div>
                <label>Released</label>
                    <input
                     type="text" 
                     value={input.released}
                     name= 'released'
                     onChange={(e) => handleChange(e)}
                     />
                </div>
                <div>
                <label>Rating</label>
                    <input
                     type="range"
                     min={0}
                     max={5}
                     value={input.rating}
                     name= 'rating'
                     onChange={(e) => handleChange(e)}
                     />
                </div>
                <div>
                <label>Imagen</label>
                    <input
                     type="url" 
                     value={input.image}
                     name= 'image'
                     onChange={(e) => handleChange(e)}
                     />
                </div>
                <div>
                <label>Generos</label>
                    <input
                     type="checkbox" 
                     value={input.genres}
                     name= 'genres'
                     onChange={(e) => handleCheck(e)}
                     />
                </div>
                <div>
                <label>Plataformas</label>
                    <input
                     type="checkbox" 
                     value={input.platforms}
                     name= 'platforms'
                     onChange={(e) => handleCheck(e)}
                     />
                </div>
                {/* <select onChange={(e) => handleSelect(e)}>{
                    genres.map((gen) => (
                        <option value={gen.name}>{gen.name}</option>
                    ))}
                </select>
                <ul><li>{input.genres.map(el => el + ', ')}</li></ul> */}
                <button type="submit">Crear Videogame</button>
            </form>
            {input.genres.map(el => 
                <div className="divGenres">
                    <p>{el}</p>
                <button className="botonX" onClick={() => handleDelete(el)}>x</button>
                </div>
                )}
        </div>
    )
}