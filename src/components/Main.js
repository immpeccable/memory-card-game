import { render } from '@testing-library/react';
import React, { Component } from "react";
import '.././App.css'
import { useState, useEffect } from "react";
import Pokemon from './Pokemon';
import charizard from './images/155631.svg'
import blastoise from './images/blastoise-seeklogo.com.svg'
import bulbasaur from './images/bulbasaur-seeklogo.com.svg'
import butterfree from './images/butterfree-seeklogo.com.svg'
import charmander from './images/charmander-seeklogo.com.svg'
import ivysaur from './images/ivysaur-seeklogo.com.svg'
import nidoran from './images/nidoran-seeklogo.com.svg'
import pikachu from './images/pikachu-seeklogo.com.svg'
import spearow from './images/spearow-seeklogo.com.svg'
import squirtle from './images/squirtle-seeklogo.com.svg'
import venesaur from './images/venusaur-seeklogo.com.svg'
import wartortle from './images/wartortle-seeklogo.com.svg'
import { click } from '@testing-library/user-event/dist/click';

let Main = () => {

    
    let allPokes = {
        Charizard: charizard,
        Blastoise: blastoise,
        Bulbasaur: bulbasaur,
        Butterfree: butterfree,
        Charmander: charmander,
        Ivysaur: ivysaur,
        Nidoran: nidoran,
        Pikachu: pikachu,
        Spearow: spearow,
        Squirtle: squirtle,
        Venesaur: venesaur,
        Wartortle: wartortle
    }
    let [shuffleArray, setSuffleArray] = useState(['Charizard', 'Blastoise', 'Bulbasaur', 'Butterfree', 'Charmander', 'Ivysaur', 'Nidoran', 'Pikachu', 'Spearow', 'Squirtle', 'Venesaur', 'Wartortle'])
    let [bestScore, setBestScore] = useState(0);
    let [currentScore, setCurrentScore] = useState(0)
    let [clickedPokemons, setClickedPokemons] = useState([]);

    



    useEffect(() => {

        console.log("merhaba");
        let onClickPoke = () => {
            let newArray = [];
            let tempShuffle = shuffleArray;

            for (let i = 0; i < 12; i++) {
                let rnumber = Math.floor(Math.random() * (12 - i));
                newArray.push(tempShuffle[rnumber]);

                tempShuffle = tempShuffle.filter(function (el) {
                    return el !== tempShuffle[rnumber];
                })
                console.log("shuffle")
                console.log(tempShuffle);
            }
            console.log("newarray");
            console.log(newArray);
            
            setSuffleArray(newArray);
            
            console.log("last");
            console.log(shuffleArray);
        }
        
        document.addEventListener('click', onClickPoke);

        return () => {
            document.removeEventListener("click", onClickPoke);
          };

    })

    let clickPokemon = (event) => {
        /*let isSame = false;
        for (let i = 0; i < clickedPokemons.length; i++) {
            if (clickedPokemons[i] === event.target.id) {
                console.log("same")
                isSame = true;
                break;
            }
        }
        if (!isSame) {
            setClickedPokemons(...clickedPokemons, event.target.id)
            console.log("not the same");
        }*/
        setCurrentScore(currentScore+1);
    }


    let shufflePokemons = () => {
        return <div className='poke-grid'>
            {shuffleArray.map((el) => {
                return <Pokemon poke={allPokes[el]} name={el}></Pokemon>
            })}
        </div>
    }

    return <div className='main'>
        <div className='current-best-score'>
            <div className='current-score'>
                Current Score:<span>{"  " + currentScore}</span>
            </div>
            <div className='best-score'>
                Best Score:<span>{"  " + bestScore}</span>
            </div>
        </div>

        {shufflePokemons()}
    </div>
}



export default Main;