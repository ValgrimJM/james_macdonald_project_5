import React, { Component } from "react";

import swal from 'sweetalert';

//import images
import minotaur from "../assets/enemy/minotaur.svg";
import badGnome from "../assets/enemy/bad-gnome.svg";
import brainTentacle from "../assets/enemy/brain-tentacle.svg";
import brute from "../assets/enemy/brute.svg";
import carnivorousPlant from "../assets/enemy/carnivorous-plant.svg";
import dragonHead from "../assets/enemy/dragon-head.svg";
import medusaHead from "../assets/enemy/medusa-head.svg";
import seaCreature from "../assets/enemy/sea-creature.svg";
import troll from "../assets/enemy/troll.svg";
import ninjaVelociraptor from "../assets/enemy/ninja-velociraptor.svg";

const imgArray = [minotaur, badGnome, brainTentacle, brute, carnivorousPlant, dragonHead, medusaHead, seaCreature, troll, ninjaVelociraptor];


class GameScreen extends Component{

    checkCharName = (charName) => this.props.checkCharName(charName);
    checkCharaCode = (charCode) => this.props.loadChar(charCode);
    newChara = () => {
        swal("Please enter your character's name:", {
            content: "input",
        }).then((charName) => {
            if (charName !== null && charName !=="") {
                this.checkCharName(charName.trim());
            }
        });
    }
    loadChara = () => {
        swal("Please enter your character's code:", {
            content: "input",
        }).then((charCode) => {
            console.log(charCode);
            
            if (charCode !== null) {
                this.checkCharaCode(charCode.trim());
            }
        });
    }
    render(){
        let charDisplay = null;
        let enemyDisplay = null;
        //check if character has been created yet or his loaded
        if(this.props.canBattle === false && this.props.enemy.isFighting === false && this.props.canLvl === false){
            charDisplay =
                <div className="chooseCharacter">
                    <h2>Create A New Character or Load An Existing One</h2>
                    <button onClick={this.newChara}>Create New Character</button>
                    <button onClick={this.loadChara}>Load Existing Character</button>
                </div>
        }
        else if (this.props.canBattle === false && this.props.enemy.isFighting === false && this.props.canLvl === true){
            charDisplay =
                <div className="chosenChar">
                    <h2>Level Up Time</h2>
                </div>
        }
        else{
            charDisplay =
            <div className="chosenChar">
                <h2>Player Made: Go Battle!</h2>
            </div>
        }

        if(this.props.enemy.isFighting === true && this.props.canBattle === false){

            enemyDisplay =
                <div className="enemyScreen">
                <img className="enemyImg" id="enemyImg" src={imgArray[this.props.enemy.img]} alt=""/>
                    <h2 className="enemyName">{this.props.enemy.name}</h2>
                    <progress value={this.props.enemy.hp} max={this.props.enemy.maxHp}></progress>
                </div>
        }

        return(
            <div className="gameScreen" id="gameScreen">
                <div className="popOut">
                    <button className="popOutButton" onClick={() => this.props.collapseStats()}><i className="fas fa-arrows-alt-h"></i></button>
                </div>
                <div className="effectScreen">
                    {this.props.enemy.isFighting === true ? enemyDisplay :  charDisplay } 
                </div>
            </div>
        )
    }
}
export default GameScreen;