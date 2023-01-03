import React from 'react';

export default function Card({id, released, rating, name, image,/*, genre*/}){
    return (
        <div key={id}>
            <h3>{name}</h3>
            <h4>{released}</h4>
            <h6>{rating}</h6>
            <img src={image} alt={name} width='200px' /> 
            {/*
            <h5>{genre}</h5>
            */}
        </div>
    );
}