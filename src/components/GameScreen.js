import React, { Component } from "react";
import enemyImg from "../assets/minotaur.svg";


class GameScreen extends Component{

    checkCharName = (charName) => this.props.checkCharName(charName);
    componentDidMount(){

    }
    newChara = () =>{
        console.log('testy');
        let charName = prompt("Please enter your character's name");
        this.checkCharName(charName);
        
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
                    <button>Load Existing Character</button>
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
                    <img className="enemyImg" src={enemyImg} alt=""/>
                    <h2>Enemy Name</h2>
                    <progress value={this.props.enemy.hp} max={this.props.enemy.maxHp}></progress>
                </div>
        }

        return(
            <div className="gameScreen">
                {this.props.enemy.isFighting === true ? enemyDisplay :  charDisplay } 
            </div>
        )
    }
}
export default GameScreen;