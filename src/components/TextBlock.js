import React, { Component } from "react";
let blockText = null;
let battleText = null;

class TextBlock extends Component{
    playerTurn = () => this.props.playerTurn();
    startCombat = () =>{
        
        
        this.playerTurn();

        

        
    }
    render(){
        if (this.props.isPlayerTurn === true) {
            battleText =
                <div className="blockText">
                    <p>Select Your Move:</p>
                    <button onClick={() => this.props.attack()}>Attack</button>
                    {this.props.player.playerRef.mp >= 5 ? <button onClick={() => this.props.castSpell()}>Cast Spell</button> : <button disabled="true">Cast Spell</button>}
                    {this.props.player.playerRef.mp >= 5 ? <button onClick={() => this.props.castHeal()}>Cast Heal</button> : <button disabled="true">Cast Heal</button>}
                    <button onClick={() => this.props.defend()}>Defend</button>
                </div>
        }
        else {
            battleText =
                <div className="blockText">
                    <p>Nothing To Say</p>
                </div>
        }

        if(this.props.enemy.isFighting === true && this.props.enemy.maxHp === this.props.enemy.hp){
            blockText = 
            <div className="blockText">
                <p>An Enemy has Appeared!</p>
                <button onClick={this.startCombat}>Proceed</button>
            </div>
        }
        else if (this.props.enemy.isFighting === true && this.props.isPlayerTurn === false){
            if(this.props.enemy.hp <= 0){
                blockText =
                    <div className="blockText">
                        <p>Monster Down!</p>
                        <button onClick={() => this.props.levelUp()}>Level Up</button>
                    </div>
            }
            else if(this.props.player.playerRef.hp <= 0){
                <div className="blockText">
                    <p>You Were Defeated!</p>
                    <button onClick={this.startCombat}>Proceed</button>
                </div>
            }
            else{
                blockText =
                    <div className="blockText">
                        <p>Damage Taken</p>
                        <button onClick={this.startCombat}>Proceed</button>
                    </div>
            }
        }
        else if(this.props.enemy.isFighting === false){
            blockText =
                <div className="blockText">
                    
                </div>
        }
        return(
            <div className="textBlock">
                <div className="wrapper borderBlock">
                    {this.props.enemy.isFighting == true && this.props.isPlayerTurn === false ? blockText : battleText}
                </div>
                
            </div>
        )
    }
}

export default TextBlock;