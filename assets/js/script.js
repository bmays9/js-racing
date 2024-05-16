console.log("It's working")

// Setup initial game data and configuration - 1 player, 10 races.
let numberOfPlayers = 1;
let numberOfRaces = 10;
const playersInTotal = 10;  // Number of game players, including computer controlled.
let playerNames = ["Player1", "Basa", "Carol",
    "Dwight", "Ernest", "Fatima", "Glenn", "Hideki", "India", "Jerry"];
let cars = ["Audi", "Mercedes", "Ferrari", "BMW", "Tesla",
    "Jaguar", "Ford", "Toyota", "Honda", "Porsche"];
let countries = ["Australia", "Japan", "Germany", "Malaysia", "Hungary", "U.S.A.", "Monaco", "Brazil", "Italy", "South Africa"]
let playerData = [];

document.addEventListener("DOMContentLoaded", runGame); 

/**
 * function called by DOMContentLoad. Initialises the game data and waits for user action.
 */
function runGame() {
    console.log("func:runGame")

    // Setup initial game data and configuration - Player 1 name:
    document.getElementById('player-name').value = playerNames[0];

    buildPlayerData();
    console.log(playerData);

    buildGameTable();
    

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
/**
 * Populating initial array of playerData objects. 
 */
function buildPlayerData() {
    console.log("func: buildPlayerData")
    for (let i = 0; i < playersInTotal; i++) {
        playerData.push({
            "name": playerNames[i],
            "car": cars[i],
            "boost": 0,
            "rating": 0,
            "racePoints": 0,
            "seasonPoints": 0,
        });
    };
    console.log(playerData);
};

/**
 * Building the html for the table in the game-space div 
 */
function buildGameTable() {
    console.log("func: buildGameTable")
    let tableHtml = `<tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Car</th>
                <th>Boost</th>
                <th>Points</th>
            </tr>`
    for (i = 0; i < 10; i++) {
        tableHtml += `
        <tr>
                <td>${i + 1}</td>
                <td>${playerData[i].name}</td>
                <td>${playerData[i].car}</td>
                <td>${playerData[i].boost}</td>
                <td>${playerData[i].racePoints}</td>
        </tr>`;
    }
    document.getElementById('game-table').innerHTML = tableHtml
}

