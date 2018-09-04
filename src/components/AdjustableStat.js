import React, { Component } from "react";

class Adjustable extends Component{

    render(){
        // console.log(this.props);
        const statName = Object.keys(this.props)[0];
        
        
        return(
            <div className="adjustableStat">
                <h3>{statName}:</h3>
                {this.props.player.playerRef[statName] > this.props[statName] ? <button onClick={() => this.props.statDown(this.props)}><i class="fas fa-caret-down"></i></button> : <button disabled="true"><i class="fas fa-caret-down"></i></button> }
                <p>{this.props.player.playerRef[statName]}</p>
                {this.props.availPoints > 0 ? <button onClick={() => this.props.statUp(this.props)}><i class="fas fa-caret-up"></i></button> : <button disabled="true"><i class="fas fa-caret-up"></i></button>}
            </div>
        );
    }
}

export default Adjustable;