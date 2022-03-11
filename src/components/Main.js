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
    let initEl = () => {
        let tmp = ['Charizard', 'Blastoise', 'Bulbasaur', 'Butterfree', 'Charmander', 'Ivysaur', 'Nidoran', 'Pikachu', 'Spearow', 'Squirtle', 'Venesaur', 'Wartortle']
        let newArray = [];

        for (let i = 0; i < 12; i++) {
            let rnumber = Math.floor(Math.random() * (12 - i));
            newArray.push(tmp[rnumber]);

            tmp = tmp.filter(function (el) {
                return el !== tmp[rnumber];
            })
        }
        return newArray;
    }
    
    let [shuffleArray, setSuffleArray] = useState(initEl())
    let [bestScore, setBestScore] = useState(0);
    let [currentScore, setCurrentScore] = useState(0)
    let [clickedPokemons, setClickedPokemons] = useState([]);


    let shuffleAlgo = () => {
        let newArray = [];
        let tempShuffle = shuffleArray;

        for (let i = 0; i < 12; i++) {
            let rnumber = Math.floor(Math.random() * (12 - i));
            newArray.push(tempShuffle[rnumber]);

            tempShuffle = tempShuffle.filter(function (el) {
                return el !== tempShuffle[rnumber];
            })
        }

        setSuffleArray(newArray);
    }
    useEffect(() => {

        
        let onClickPoke = () => {
            shuffleAlgo();
        }
        document.addEventListener('click', onClickPoke);

        return () => {
            document.removeEventListener("click", onClickPoke);
        };

    }, [shuffleArray, bestScore, currentScore, clickedPokemons])

    async function clickPokemon (event){
        let isSame = false;

        console.log('event');
        console.log(event.target);
        console.log(event.target.id);
        for(let i = 0; i<clickedPokemons.length; i++){
            if(clickedPokemons[i] === event.target.id){
                isSame = true;
                break;
            }
        }
        console.log(isSame);
        if(!isSame){
            await setCurrentScore(currentScore + 1);
            console.log("false: "+event.target.id);
            await setClickedPokemons([...clickedPokemons, event.target.id])
            console.log("merhaba");
        }
        else{
            if(currentScore > bestScore){
                await setBestScore(currentScore);
            }
            let a = [];
            await setClickedPokemons(a);
            await setCurrentScore(0);
        }
        console.log(clickedPokemons);
    }


    let shufflePokemons = () => {
        return <div className='poke-grid'>
            {shuffleArray.map((el) => {
                return <Pokemon onClick = {clickPokemon} poke={allPokes[el]} name={el}></Pokemon>
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