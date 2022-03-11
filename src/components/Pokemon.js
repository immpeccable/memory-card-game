import { render } from '@testing-library/react';
import React, { Component } from "react";
import '.././App.css'
import { useState, useEffect } from "react";


class Pokemon extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return <button id = {this.props.name} className='pokeButton'>
             <img className='pokeImg' src = {this.props.poke} alt = 'pokemon'></img>
            <div className = "pokeText">{this.props.name}</div>
        </button>
    }

}
export default Pokemon