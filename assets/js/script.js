console.log("It's working")
document.addEventListener("DOMContentLoaded", runGame()); 

/**
 * function called by DOMContentLoad. Contains all game code.
 */
function runGame() {
    console.log("func:runGame")

    // Setup initial game data and configuration - 1 player, 10 races.
    let numberOfPlayers = 1;
    let numberOfRaces = 10;
    let playerNames = ["Player1", "Basa", "Carol",
        "Dwight", "Ernest", "Fatima", "Glenn", "Herschel", "India", "Jadis"];
    let cars = ["Audi", "Mercedes", "Ferrari", "BMW", "Tesla",
        "Jaguar", "Ford", "Toyota", "Honda", "Porsche"];

    // add Player 1 name (playerNames[0]) to input text field
    document.getElementById('player-name').value = playerNames[0];

    //add event listeners to the 3 setup options
    //firstly, the 2 dropdowns
    let numPlayers = document.getElementById('number-of-players');
    numPlayers.addEventListener("change", function () {
        console.log("num of players changed");
        numberOfPlayers = numPlayers.value;
        console.log(numberOfPlayers);
    });
    console.log("Number of Players from within game function" + numberOfPlayers);

    //document.getElementById('number-of-races').addEventListener("change", numRaces);
    //document.getElementById('submit-button').addEventListener("click", submitChange);
    
}
     


;
}
