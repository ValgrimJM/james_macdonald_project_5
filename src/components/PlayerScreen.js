import React, {Component} from "react";

//Importing Components
import swal from 'sweetalert';
//import Images
import white from "../assets/player/white.svg";
import mightyForce from "../assets/player/mighty-force.svg";
import ninjaHead from "../assets/player/ninja-head.svg";
import dwarfFace from "../assets/player/dwarf-face.svg";
import barbute from "../assets/player/barbute.svg";
import womanElfFace from "../assets/player/woman-elf-face.svg";
import barbarian from "../assets/player/barbarian.svg";
import visoredHelm from "../assets/player/visored-helm.svg";
import pirateCaptain from "../assets/player/pirate-captain.svg";
import spartanHelmet from "../assets/player/spartan-helmet.svg";
import spy from "../assets/player/spy.svg";
import james from "../assets/player/james.jpg"

import AdjustableStat from "./AdjustableStat";
import PlayerStats from "./PlayerStats";

const imgArray = [white, mightyForce, ninjaHead, dwarfFace, barbute, womanElfFace, barbarian, visoredHelm, pirateCaptain, spartanHelmet, spy, james];

class PlayerScreen extends Component{
    statUp = (stat) => this.props.statUp(stat);
    statDown = (stat) => this.props.statDown(stat);
    info = () => {
        swal("Overview:","Create a character then fight some monsters!")
        .then(() =>{
            swal("Combat","Attack: scales with STR but lowered by enemy DEF.")
                .then(() => {
                    swal("Combat", "Spell: not reduced by DEF but weaker and takes MP.")
                        .then(() => {
                            swal("Combat", "Heal: Use MP to restore Health.")
                                .then(() => {
                                    swal("Combat", "Defend: Raise DEF for a single round.");
                                });
                        });
                });
                
        });
        
    }
    render() {
        let levelButtons = null;
        if(this.props.canLvl === true){
            levelButtons = 
                <div className="dynamicStats">
                    <AdjustableStat hp={this.props.player.hp} statUp={this.props.statUp} statDown={this.props.statDown} player={this.props.player} availPoints={this.props.availPoints} />
                    <AdjustableStat mp={this.props.player.mp} statUp={this.props.statUp} statDown={this.props.statDown} player={this.props.player} availPoints={this.props.availPoints} />
                    <AdjustableStat str={this.props.player.str} statUp={this.props.statUp} statDown={this.props.statDown} player={this.props.player} availPoints={this.props.availPoints} />
                    <AdjustableStat def={this.props.player.def} statUp={this.props.statUp} statDown={this.props.statDown} player={this.props.player} availPoints={this.props.availPoints} />

                    <button onClick={() => this.props.confirmStats()}>Confirm Stats</button>
                </div>
        }
        else{
            levelButtons =
            <div className="dynamicStats">
                <PlayerStats hp={this.props.player.hp} player={this.props.player}/>
                <PlayerStats mp={this.props.player.mp} player={this.props.player}/>
                <PlayerStats str={this.props.player.str} player={this.props.player}/>
                <PlayerStats def={this.props.player.def} player={this.props.player}/>
            </div>
        }
        return(
            <div className="playerScreen collapsed" id="playerScreen">
                <div className="popOut">
                    <button className="popOutButton" onClick={() => this.props.collapseStats()}><i className="fas fa-arrows-alt-h"></i></button>
                </div>
                <div className="wrapper borderBlock">
                    <img className="playerImg" src={imgArray[this.props.player.img]} alt=""/>

                    <div className="playerStats">
                        <div className="unchangingStat">
                            <h3>Name:</h3>
                            <p>{this.props.player.name}</p>
                        </div>
                        <div className="unchangingStat">
                            <h3>Lvl:</h3>
                            <p>{this.props.player.lvl}</p>
                        </div>
                        <div className="unchangingStat">
                            <h3>Exp:</h3>
                            <p>{this.props.player.exp}</p>
                        </div>

                        {levelButtons}
                    </div>
                    <div className="largeButtons">
                        {this.props.canBattle === false ? <button disabled>Go Battle</button> : <button onClick={() => this.props.goBattle()}>Go Battle</button>}
                        {this.props.isBattle === false  && this.props.canLvl === false  && this.props.player.name !== "" ? <button onClick={() => this.props.saveChar()}>Save Character</button> : null}
                    </div>
                    <button className="info" onClick={() => this.info()}>i</button>
                    <button className="darkMode" onClick={() => this.props.darkMode()}><i className="far fa-lightbulb"></i></button>
                </div>
            </div>
        );
    }
}
export default PlayerScreen;