// Setup initial game data and configuration -> 1 player, 10 races.
let numberOfPlayers = 1;
let numberOfRaces = 10;
const playersInTotal = 10;  // Number of game players, including computer controlled.
let playerNames = ["Player1", "Basa", "Carol",
    "Dwight", "Ernest", "Fatima", "Glenn", "Hideki", "India", "Jerry"];
let cars = ["Audi", "Mercedes", "Ferrari", "BMW", "Tesla",
    "Jaguar", "Ford", "Toyota", "Honda", "Porsche"];
let countries = ["Australia", "Japan", "Germany", "Malaysia", "Hungary", "U.S.A.", "Monaco", "Brazil", "Italy", "South Africa"]
let playerData = [];


/**
 * Initialises the game data and waits for user action.
 */
function runGame() {
    console.log("func:runGame")

    // Setup initial game data and configuration - Player 1 name:
    document.getElementById('player-name').value = playerNames[0];

    buildPlayerData();
    
    buildGameTable();

    setupEventListeners();
    
 
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

/**
 * Creating Event listeners for the 2 setup options, 
 * Changing the number of players, and clicking the submit button 
 */
function setupEventListeners() {
    let numPlayers = document.getElementById('number-of-players');
    numPlayers.addEventListener("change", function () {
        console.log("num of players changed");
        numberOfPlayers = numPlayers.value;
        console.log(numberOfPlayers);
        playerNumberChange();
    });
    console.log("Number of Players from within game function" + numberOfPlayers);

    //document.getElementById('number-of-races').addEventListener("change", numRaces);
    let playerConfirm = document.getElementById('submit-button').addEventListener("click", confirmPlayer);
}

/**
 * Changing the number of user players in the game resets the form back to player 1 details
 * and asks for confirmation. Previous changes are retained and displayed for each player
 * but confirmation required again. 
 */
function playerNumberChange() {
    console.log("func: numberOfPlayers")
}

/**
 * Confirming the details of the player details being requested.
 * Driver Name, and Difficulty.
 * Where confirmation is for the last user, number of races is also confirmed as the game setting 
 * and game moves to next phase.
 */
function confirmPlayer() {
    console.log("func: confirmPlayer")
}

runGame();


