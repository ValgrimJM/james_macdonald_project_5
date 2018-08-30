import React, {Component} from "react";
import img from "../assets/mighty-force.svg";
import logo from '../logo.svg';

class PlayerScreen extends Component{
    render() {
        return(
            <div className="playerScreen ">
                <div class="wrapper borderBlock">
                    <img class="playerImg" src={img} alt=""/>

                    <label className="infoLabel" htmlFor="playerName">Name:</label>
                    <input className="playerInfo" id="playerName" type="text" placeholder="Players Name"/>

                    <label className="infoLabel" htmlFor="playerLevel">Lvl:</label>
                    <input className="playerInfo" id="playerLevel" type="text" placeholder="Players Level" />

                    <label className="infoLabel" htmlFor="playerExp">Exp:</label>
                    <input className="playerInfo" id="playerExp" type="text" placeholder="Players Experience" />

                    <div className="PlayerStats">
                        <label className="infoLabel" htmlFor="hp">HP:</label>
                        <input className="playerInfo" id="hp" type="text" placeholder="Player HP" />

                        <label className="infoLabel" htmlFor="mp">MP:</label>
                        <input className="playerInfo"id="mp" type="text" placeholder="Player MP" />

                        <label className="infoLabel" htmlFor="str">STR:</label>
                        <input className="playerInfo" id="str" type="text" placeholder="Player STR" />

                        <label className="infoLabel" htmlFor="def">DEF:</label>
                        <input className="playerInfo" id="def" type="text" placeholder="Player DEF" />
                    </div>

                    <button>Go Battle</button>
                    <button>Check Spells</button>
                    <button>Save Character</button>
                </div>
            </div>
        );
    }
}
export default PlayerScreen;