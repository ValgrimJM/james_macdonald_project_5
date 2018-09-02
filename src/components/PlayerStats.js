import React, { Component } from "react";

class PlayerStats extends Component{
    render(){
        // console.log(this.props);
        
        const statName = Object.keys(this.props)[0];


        return (
            <div className="adjustableStat">
                <h3>{statName}:</h3>
                <p>{this.props.player.playerRef[statName]}</p>
            </div>
        );
    }
}

export default PlayerStats;