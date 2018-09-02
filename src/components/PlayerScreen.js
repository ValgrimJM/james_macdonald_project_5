import React, {Component} from "react";

//Importing Components
import img from "../assets/mighty-force.svg";
import AdjustableStat from "./AdjustableStat";
import PlayerStats from "./PlayerStats";

class PlayerScreen extends Component{
    statUp = (stat) => this.props.statUp(stat);
    statDown = (stat) => this.props.statDown(stat);
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
            <div className="playerScreen ">
                <div className="wrapper borderBlock">
                    <img className="playerImg" src={img} alt=""/>

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
                    {this.props.canBattle === false ? <button disabled="true">Go Battle</button> : <button onClick={() => this.props.goBattle()}>Go Battle</button>}
                    <button>Check Spells</button>
                    {this.props.isBattle === false  && this.props.canLvl === false  && this.props.player.name != "" ? <button>Save Character</button> : <button disabled="true">Save Character</button>}
                </div>
            </div>
        );
    }
}
export default PlayerScreen;