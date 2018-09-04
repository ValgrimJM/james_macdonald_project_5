let app = {};

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXqWVdM1bS4mb9O-M_ht69CRcP0IUsD-Q",
    authDomain: "jamesmacdonaldproject5.firebaseapp.com",
    databaseURL: "https://jamesmacdonaldproject5.firebaseio.com",
    projectId: "jamesmacdonaldproject5",
    storageBucket: "jamesmacdonaldproject5.appspot.com",
    messagingSenderId: "809523473986"
};
firebase.initializeApp(config);

app.dbRef = firebase.database().ref("project5SavedCharacters");

app.playerCharacter = {};

class Character {
    constructor(name, lvl, hp, mp, str, def, spd, exp) {
        this.name = name;
        this.lvl = lvl;
        this.hp = hp;
        this.mp = mp;
        this.str = str;
        this.def = def;
        this.spd = spd;
        this.exp = exp;
    }
    basicAttack() {
        // calculate damage based on players STR status, LVL and DEF of enemy

    }
    magicSkill() {
        // calculate damage based on spell strength, player lvl

        // subtract spell cost from players MP
    }
}

app.newCharacter = (playerName) =>{
    let existingCharacter = app.findExistingCharacter();
    if(existingCharacter[0] == false){
        app.playerCharacter = new Character(playerName, 1, 10, 10, 10, 10, 10, 10, 0);
    }
    else{
        alert("A character already exists with this name.  Please choose another");
    }
}

app.findExistingCharacter = () => {
    app.dbRef.once("value", function (snapshot) {
        let existingCharacter = false;
        let existingKey = null;
        let savedCharacters = snapshot.val();
        for (let char in savedCharacters) {
            if (char.name == playerName) {
                existingCharacter = true;
                existingKey = char.id;
            }
        }
        return [existingCharacter, existingKey];
    });
}

app.saveCharacter = (playerCharacter) => {
    const itemReference;
    let existingCharacter = app.findExistingCharacter();
    app.dbRef.once("value", function (snapshot) {
        let savedCharacters = snapshot.val();
        if (existingCharacter[0] == false) {
            const id = app.dbRef.push().key;
            itemReference = firebase.database().ref(`project5SavedCharacters/${id}`);

            itemReference.set({
                key: id,
                name: playerCharacter.name,
                lvl: playerCharacter.lvl,
                hp: playerCharacter.hp,
                str: playerCharacter.str,
                def: playerCharacter.def,
                spd: playerCharacter.spd,
                exp: playerCharacter.exp,
                // pass in spell/ability names here
            });
        }
        else {
            itemReference = firebase.database().ref(`project5SavedCharacters/${existingCharacter[1]}`);
            itemReference.update({
                lvl: playerCharacter.lvl,
                hp: playerCharacter.hp,
                str: playerCharacter.str,
                def: playerCharacter.def,
                spd: playerCharacter.spd,
                exp: playerCharacter.exp,
                // pass in spell/ability names here
            })
        }
    });

}

app.battleTurn = (playerCharacter, enemyCharacter) => {

    // generate random number to determine attack enemy will use

    // get user input to determine player attack

    // calculate math for each attack to determine damage dealt to both characters

    // update player health and mana values

    // check if a player has a hp value of 0
    // execute function with end of combat

    // otherwise run combat again
}
app.PlayerLevelUp = () =>{
    // increase player level by one

    // give player points to freely distribute among stats

    // give player option to gain new ability from list

    // when options are selected, listen for submission click

    
}