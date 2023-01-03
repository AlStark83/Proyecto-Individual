import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return( 
        <div>
            <h1>Welcome Player One</h1>
            <h2>Press Start</h2>
            <Link to = '/home'>
                <button>START</button>
            </Link>
        </div>
    )
}