import React from 'react';
import './GoogleApp.css'

export default function GoogleApp(props){
    return(
       <li className="google-app">
           <h2>{props.App}</h2>
           <p>{props.Category}</p>
           <p>{props.Rating}</p>
           <p>{props.Genre}</p>
       </li>
    );
}