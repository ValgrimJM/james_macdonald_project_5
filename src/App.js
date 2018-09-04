import React, { Component } from 'react';
import './App.css';
import "./styles/styles.css";

// import database
import firebase from "./components/firebase.js";
import PlayerScreen from './components/PlayerScreen.js';
import GameScreen from "./components/GameScreen.js";
import TextBlock from "./components/TextBlock.js";
import swal from 'sweetalert';

// create reference to firebase database root
const dbRef = firebase.database().ref("project5Characters");
const stats = ["hp", "mp", "str", "def"];
let battleText = [];

const nameAdject = ["insane", "blundering", "distracted", "sleepy", "hungry", "vibrant", "verbose", "antiquated", "bloated", "vicious", "defiant", "mumbling", "silent", "confident", "alert", "buff"];
const nameJob = ["thinker", "chomper", "smasher", "conjuror", "debator", "hunter", "cleaner", "destructor", "crafter", "swimmer", "stalker", "gamer", "deleter", "jokester", "influencer", "planner"];

class App extends Component {
    constructor(){
        super();
        this.state = {
            canBattle: false,
            player: {
                name: "",
                lvl: "",
                exp: "",
                hp: "",
                mp: "",
                str: "",
                def: "",
                key: "sample",
                img: 0,
                playerRef: {
                    hp: "",
                    mp: "",
                    str: "",
                    def: "",
                }
            },
            isPlayerTurn: false,
            enemy: {
                name: "",
                lvl: 1,
                hp: 10,
                maxHp: 10,
                mp: 10,
                str: 10,
                def: 10,
                isFighting: false,
                img: ""
            },
            availPoints: 0,
            canLvl: false,
            battleText: []
            
        }
    }
    // List of functions for the player's different Attacks
    attack = (enemyDmg = null) =>{
        
        if(enemyDmg === null){
            let attackChoice = this.enemyDamage();
            this.attack(attackChoice);
        }
        else{
            battleText.push("You attack the enemy with your weapon!");
            let player = this.state.player
            let enemy = this.state.enemy
            let dmgNum = Math.floor(Math.random() * 10 ) + player.str - enemy.def;
            console.log(dmgNum);
            this.damageCalc(dmgNum, enemyDmg);
        }
    }
    castSpell = (enemyDmg = null) => {
        
        if (enemyDmg === null) {
            let attackChoice = this.enemyDamage();
            this.castSpell(attackChoice);
        }
        else{
            battleText.push("You launch a magical blast at the enemy!");
            let player = this.state.player;
            player.playerRef.mp -= 5;
            let dmgNum = Math.floor(Math.random() * 10) +  5;
            this.setState({
                player: player
            })
            this.damageCalc(dmgNum, enemyDmg);
        }
    }
    castHeal = (enemyDmg = null) => {
        if (enemyDmg === null) {
            let attackChoice = this.enemyDamage();
            this.castHeal(attackChoice);
        }
        else{
            
            let player = this.state.player;
            player.playerRef.mp -= 5;
            let healNum = Math.floor(Math.random() * (player.playerRef.hp * 0.5)) + 5;
            battleText.push(`You use magic to tend to your wounds, healing ${healNum} HP!`);
            player.playerRef.hp += healNum;
            this.setState({
                player: player
            })
            this.damageCalc(0, enemyDmg);
        }
    }
    defend = (enemyDmg = null) => {
        if (enemyDmg === null) {
            let player = this.state.player;
            player.def *= 2;
            this.setState({
                player: player
            })
            let attackChoice = this.enemyDamage();
            player.def /= 2;
            this.setState({
                player: player
            })
            this.defend(attackChoice);
        }
        else{
            battleText.push(`You take a defensive stance!`);
            this.damageCalc(0, enemyDmg);
        }
    }
    collapseStats = () => {
        let stats = document.getElementById("playerScreen");
        let game = document.getElementById("gameScreen");
        let text = document.getElementById("textBlock");

        stats.classList.toggle("collapsed");
        game.classList.toggle("collapsed");
        text.classList.toggle("collapsed");

    }
    darkMode = () => {
        let app = document.getElementById("App");
        app.classList.toggle("dark");
    }
    // function to determine the enemy's damage
    enemyDamage = () => {
        let player = this.state.player;
        let enemy = this.state.enemy;
        let attackNum = Math.floor(Math.random() * 3) + 1;
        if(attackNum === 1){
            battleText.push(`The enemy lunges and attacks you!`);
            let dmgNum = Math.floor(Math.random() * 10) + enemy.str - player.def;
            if(dmgNum < 0){
                dmgNum = 0;
            }
            return dmgNum;
            
        }
        else if(attackNum === 2){
            battleText.push(`The enemy launches magical blasts at you!`);
            let dmgNum = Math.floor(Math.random() * 5) + enemy.lvl;
            return dmgNum;
        }
        else {
            battleText.push(`The enemy raises it's guard!`);
            return 0;
            
        }

    }
    // calculate damage and update both hp values
    damageCalc = (playerDmg, enemyDmg) => {
        
        let enemyRef = this.state.enemy;
        let playerRef = this.state.player;
        
        console.log(battleText);

        if(playerDmg >= enemyRef.hp){
            playerRef.playerRef.hp -= enemyDmg;
            enemyRef.hp -= playerDmg;
            
            
            battleText.push(`You deal ${playerDmg} DMG to the enemy!`);
            battleText.push("The enemy is defeated!");
            
            this.setState({
                player: playerRef,
                enemy: enemyRef,
                isPlayerTurn: false,
                battleText: battleText
            })
        }
        else{
            if(enemyDmg >= playerRef.playerRef.hp){
                playerRef.playerRef.hp -= enemyDmg;
                enemyRef.hp -= playerDmg
                battleText.push(`You deal ${playerDmg} DMG to the enemy!`);
                battleText.push(`The enemy deals ${enemyDmg} DMG to you!`);
                battleText.push(`You are defeated!`);
                // insert damage animation here
                swal("Defeat!", "You were defeated by the enemy. Start or Load Again.");
                enemyRef.isFighting = false;
                this.setState({
                    player: {
                        name: "",
                        lvl: "",
                        exp: "",
                        hp: "",
                        mp: "",
                        str: "",
                        def: "",
                        key: "sample",
                        img: 0,
                        playerRef: {
                            hp: "",
                            mp: "",
                            str: "",
                            def: "",
                        }
                    },
                    enemy: enemyRef,
                    isPlayerTurn: false,
                    battleText: battleText,
                    canBattle: false,
                })
            }
            else{
                playerRef.playerRef.hp -= enemyDmg;
                enemyRef.hp -= playerDmg
                battleText.push(`You deal ${playerDmg} DMG to the enemy!`);
                battleText.push(`The enemy deals ${enemyDmg} DMG to you!`);
                // insert damage animation here
                this.setState({
                    player: playerRef,
                    enemy: enemyRef,
                    isPlayerTurn: false,
                    battleText: battleText
                })
            }
        }
        
    }
    checkCharName = (charName) =>{
        let playerRef = this.state.player;
        let canBattle = false;
        dbRef.once("value", function (snapshot) {
            let doesExist = false;
            let characters = snapshot.val();

            for (let char in characters) {
                if (characters[char].name === charName) {
                    doesExist = true;
                }
            }

            if(doesExist === false){
                // if(player does not exist in database){
                let imgNum = Math.floor(Math.random() * 9) + 1; 
                playerRef = Object.assign({
                    name: charName,
                    lvl: 1,
                    exp: 0,
                    hp: 10,
                    mp: 10,
                    str: 10,
                    def: 10,
                    key: "sample",
                    img: imgNum,
                    playerRef: {
                        hp: 10,
                        mp: 10,
                        str: 10,
                        def: 10,
                    }
                });
                canBattle = true;
            }
            else{
                swal("Error!",`${charName} already exists in the database, please choose another name.`, "error");
            }
        });
        this.setState({
            player: playerRef,
            canBattle: canBattle
        });

    }
    componentDidMount(){
        
        // add event listener for any changes to database
        dbRef.on("value", (snapshot) => {
            // call sortBooks method
            
        });
    }
    confirmStats = () => {
        const newPlayer = this.state.player;
        stats.forEach((stat) => {
            newPlayer[stat] = newPlayer.playerRef[stat];
        });
        this.setState({
            player: newPlayer,
            canLvl: false,
            canBattle: true
        })
        
    }
    goBattle = () =>{
        const newEnemy = this.state.enemy;
        let adjNum = Math.floor(Math.random() * 16);
        let jobNum = Math.floor(Math.random() * 16);
        newEnemy.name = `${nameAdject[adjNum]}  ${nameJob[jobNum]}`;

        newEnemy.lvl = this.state.player.lvl + 1;
        stats.forEach((stat) => {

            const statRoll = Math.floor((Math.random() *  6) + (Math.random() * 6)) + newEnemy.lvl;
            console.log(stat, statRoll);
            newEnemy[stat] = statRoll;
        });
        newEnemy.maxHp = newEnemy.hp;
        newEnemy.isFighting = true;
        newEnemy.img = Math.floor(Math.random() * 9);
        this.setState({
            canBattle: false,
            enemy: newEnemy,
            battleText: ""
        });
        console.log(this.state.enemy);
        

    }
    levelUp = () =>{
        let playerRef = this.state.player;
        let enemyRef = this.state.enemy;

        playerRef.playerRef.hp = playerRef.hp;
        playerRef.playerRef.mp = playerRef.mp;
        playerRef.lvl ++;
        playerRef.exp += 1000;

        enemyRef.isFighting = false;

        this.setState({
            player: playerRef,
            enemy: enemyRef,
            canLvl: true,
            availPoints: 5,
        })
    }
    loadChar = (charString) => {
        console.log('test');
        
        let playerRef = this.state.player;
        let canBattle = false;
        let charData = null;
        dbRef.once("value", function(snapshot){
            let doesExist = false;
            let characters = snapshot.val();

            for(let char in characters){
                if(characters[char].key === charString){
                    doesExist = true;
                    charData = characters[char];
                }
            }
            if(doesExist === true){
                canBattle = true;
                console.log(charData);
                
                playerRef = Object.assign({
                    name: charData.name,
                    lvl: charData.stats.lvl,
                    exp: charData.stats.exp,
                    hp: charData.stats.hp,
                    mp: charData.stats.mp,
                    str: charData.stats.str,
                    def: charData.stats.def,
                    key: charData.key,
                    img: charData.img,
                    playerRef: {
                        hp: charData.stats.hp,
                        mp: charData.stats.mp,
                        str: charData.stats.str,
                        def: charData.stats.def,
                    }
                });
                swal("Accepted!", "Character Loaded", "success");
            }
            else{
                swal("Error!","Player does not exist in the database, change character string or create a new character.", "error");
            }
        });
        this.setState({
            player: playerRef,
            canBattle: canBattle
        });
    }
    playerTurn = () => {
        const newTurn = !this.state.isPlayerTurn;
        battleText = [];
        this.setState({
            isPlayerTurn: newTurn,
            battleText: battleText
        })
    }
    saveChar = () => {
        let playerRef = this.state.player;
        dbRef.once("value", function(snapshot){
            let doesExist = false;
            let characters = snapshot.val();
            

            for(let char in characters){
                if(characters[char].key === playerRef.key){
                    doesExist = true;
                }
            }
            if(doesExist === false){
                const playerKey = dbRef.push().key;
                const itemReference = firebase.database().ref(`project5Characters/${playerKey}`);

                itemReference.set({
                    key: playerKey,
                    name: playerRef.name,
                    img: playerRef.img,
                    stats: {
                        lvl: playerRef.lvl,
                        exp: playerRef.exp,
                        hp: playerRef.hp,
                        mp: playerRef.mp,
                        str: playerRef.str,
                        def: playerRef.def
                    }
                });
                swal("Congrats!",`Your character has been saved, your code is ${playerKey}`, "success");
            }
            else{
                const itemReference = firebase.database().ref(`project5Characters/${playerRef.key}`); 
                
                itemReference.update({
                    stats: {
                        lvl: playerRef.lvl,
                        exp: playerRef.exp,
                        hp: playerRef.hp,
                        mp: playerRef.mp,
                        str: playerRef.str,
                        def: playerRef.def
                    }
                })
                swal("Congrats!",`Your character has been saved, your code is ${playerRef.key}`, "success");
            }
            
        });

    }
    statUp = (stat) => {      
        const statName = Object.keys(stat)[0];
        const newPlayer = this.state.player;
        const newAvail = this.state.availPoints -1;
        newPlayer.playerRef[statName] = newPlayer.playerRef[statName] + 1;
        
        this.setState({
            player: newPlayer,
            availPoints: newAvail
        });
        
    }
    statDown = (stat) => {
        const statName = Object.keys(stat)[0];
        const newPlayer = this.state.player;
        const newAvail = this.state.availPoints + 1;
        newPlayer.playerRef[statName] = newPlayer.playerRef[statName] - 1;

        this.setState({
            player: newPlayer,
            availPoints: newAvail
        });

    }

    render() {
        console.log(this.state);

        return (
            <div className="App" id="App">
                <PlayerScreen player={this.state.player} availPoints={this.state.availPoints} statUp={this.statUp} statDown={this.statDown} confirmStats={this.confirmStats} canLvl={this.state.canLvl} goBattle={this.goBattle} canBattle={this.state.canBattle} isBattle={this.state.enemy.isFighting} saveChar={this.saveChar} darkMode={this.darkMode} collapseStats={this.collapseStats}/>
                <div className="gameSection">
                    <GameScreen enemy={this.state.enemy} player={this.state.player} canBattle={this.state.canBattle} canLvl={this.state.canLvl} checkCharName={this.checkCharName} loadChar={this.loadChar} collapseStats={this.collapseStats}/>
                    <TextBlock enemy={this.state.enemy} player={this.state.player} battleText={this.state.battleText} isPlayerTurn={this.state.isPlayerTurn} playerTurn={this.playerTurn} attack={this.attack} castSpell={this.castSpell} castHeal={this.castHeal} defend={this.defend} levelUp={this.levelUp}/>
                </div>
            </div>
            )
    }
}
export default App;