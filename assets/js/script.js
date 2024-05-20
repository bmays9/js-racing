// Setup initial game data and configuration -> 1 player, 10 races.
let numberOfPlayers = 1;
let numberOfRaces = 10;
const playersInTotal = 10;  // Number of game players, including computer controlled.
let playerNames = ["Player1", "Basa", "Carol",
    "Dwight", "Ernest", "Fatima", "Glenn", "Hideki", "India", "Jerry"];
let cars = ["Audi", "Mercedes", "Ferrari", "BMW", "Tesla",
    "Jaguar", "Ford", "Toyota", "Honda", "Porsche"];
let countries = ["Australia", "Japan", "Germany", "Malaysia", "Hungary", "U.S.A.", "Monaco", "Brazil", "Italy", "South Africa"];
let pointsAwarded = [15, 12, 10, 8, 6, 5, 4, 3, 2, 1];
let boostAwarded = [2, 2, 2, 1, 1, 1, 1, 0, 0, 0];
let playerData = [];
const raceDelay = 400;
let firstSeason = true;

/**
 * Initialises the game data and waits for user action.
 */
function runGame() {
    console.log("func:runGame");

    // Setup initial game data and configuration - Player 1 name:
    document.getElementById('player-name').value = playerNames[numberOfPlayers-1];

    buildPlayerData();
    
    buildGameTable("start");
    
    if (firstSeason === true) {      // check if first season to setup Event Listeners.
        setupEventListeners();
        firstSeason = false;
    } else {
        console.log("Event Listeners already set up");
    }
    }

/**
 * Populating initial array of playerData objects. 
 */
function buildPlayerData() {
    console.log("func: buildPlayerData");
    playerData = [];
    for (let i = 0; i < playersInTotal; i++) {
        playerData.push({
            "name": playerNames[i],
            "car": cars[i],
            "boost": 0,
            "rating": 0,
            "racePoints": 0,
            "seasonPoints": 0,
            "level": "random",      // By default every player starts at random difficulty level
        });
    }
    console.log(playerData);
}

/**
 * Building the html for the table in the game-space div 
 * start, standings
 */
function buildGameTable(stage) {
    console.log("func: buildGameTable");
    let tableHtml = "";
    if (stage === "start") {
        tableHtml = `<tr>
                <th>Player #</th>
                <th>Driver</th>
                <th>Car</th>
                <th>Difficulty</th>
                </tr>`;
        for (let i = 0; i < 10; i++) {
            tableHtml += `
        <tr>
                <td>${i + 1}</td>
                <td>${playerData[i].name}</td>
                <td>${playerData[i].car}</td>
                <td>${playerData[i].level}</td>
        </tr>`;
        }
    } else if (stage === "standings") {
        tableHtml = `<tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Car</th>
                <th>Boost</th>
                <th>Points</th>
                </tr>`;
        for (let i = 0; i < 10; i++) {
            tableHtml += `
        <tr>
                <td>${i + 1}</td>
                <td>${playerData[i].name}</td>
                <td>${playerData[i].car}</td>
                <td>${playerData[i].boost}</td>
                <td>${playerData[i].seasonPoints}</td>
        </tr>`;
        }
    } else {
        console.log("error");
    }
    document.getElementById('game-table').innerHTML = tableHtml;
}

/**
 * Creating Event listeners for the 2 setup options, 
 * Changing the number of players, and clicking the submit button 
 */
function setupEventListeners() {
    let numPlayers = document.getElementById('number-of-players');
    numPlayers.addEventListener("change", function () {
        console.log("num of players changed");
        numberOfPlayers = parseInt(numPlayers.value);
        console.log(numberOfPlayers);
        playerNumberChange();
    });
    console.log("Number of Players:" + numberOfPlayers);

    document.getElementById('submit-button').addEventListener("click", confirmPlayer);

    document.getElementById('next-button').addEventListener("click", function () {
        if (this.textContent === "Start Race!") {
            startRace();
        } else if (this.textContent === "View Standings") {
            displayStandings();
        } else if (this.textContent === "Next Race") {
            let thisCountry = document.getElementById('race-country').textContent;
            console.log("This country" + thisCountry);
            let raceNext = countries.indexOf(thisCountry);
            console.log(raceNext);
            setupRace(raceNext + 2);
        } else if (this.textContent === "Play Again") {
            //reset and prepare new game
            document.getElementById("setup-area").style.display = "flex";
            document.getElementById('race-country').textContent = "--Setup Game--";
            document.getElementById('next-button').disabled = true;
            document.getElementById('next-button').textContent = "Start Race!";
            runGame();
        } else {
            console.log("Error in next-button event handler");
        }
    });
}

/**
 * Changing the number of user players in the game resets the form back to player 1 details
 * and asks for confirmation. Stored data is displayed for each player but confirmation required again. 
 */
function playerNumberChange() {
    console.log("func: playerNumberChange");
    let numElement = document.getElementById("submit-button");
    (numberOfPlayers === 1) ? numElement.textContent = "Let's Play!" : numElement.textContent = "Confirm Player";
    console.log(playerData[0].name);
    console.log(playerData[0].level);
    displayPlayerSetup(0);
}

/**
 * Stores the details of the player into playerData array
 * Driver Name, and Difficulty.
 * If last player to confirm, the number of races is stored and game moves on.
 */
function confirmPlayer() {
    console.log("func: confirmPlayer");
    let thisPlayer = parseInt(document.getElementById("player-number-details").textContent - 1); // minus 1 for array value
    let enteredName = document.getElementById("player-name").value; 
    console.log("this player" + thisPlayer);

    // check if entered name is a duplicate
    for (let i = 0; i < playerData.length; i++) {
        if ((enteredName === playerData[i].name) && (thisPlayer !== i)) {
            alert("Player name is already taken");
            return
        }
    }

    playerData[thisPlayer].name = document.getElementById("player-name").value;  // updates the playerData value
    playerData[thisPlayer].level = document.getElementById("difficulty").value;  // updates the playerData value

    // update race table
    buildGameTable("start");

    // check player number compared to total players to either edit next player or start racing
    if (thisPlayer + 1 === numberOfPlayers) {
        numberOfRaces = parseInt(document.getElementById('number-of-races').value);
        document.getElementById("setup-area").style.display = "none"; // hide setup area
        assignRatings();

    } else if (thisPlayer + 1 < numberOfPlayers) {
        // display next player details for editing & confirming.
        displayPlayerSetup(thisPlayer +1); // + 1 
        
    } else {
        console.log("Error in confirmPlayer function");
    }

    document.getElementById("player-name").focus();
}

/**
 * Displays the next player information in the set up area. Num is the array number of playerData.
 * @param {any} num
 */
function displayPlayerSetup(num) {              // num = playerData array number 
    console.log("func: displayPlayerSetup");
    console.log("num=" + num);
    document.getElementById("player-number-details").textContent = num + 1;  // sets the text to Player number
    document.getElementById("player-name").value = playerData[num].name;  // sets the Name input to stored Player name
    document.getElementById("difficulty").value = playerData[num].level;  // sets the difficulty level to stored Player difficulty
    document.getElementById("player-name").focus();

    if (numberOfPlayers === num + 1) {      // if player is last to edit, then change button text. 
        document.getElementById("submit-button").textContent = "Let's Play!";
    }
}

/**
 * Assign ratings to playerData using difficulty level
 * random 1-10; hard: 1/2/3; normal: 5/6; easy: 8/9/10
 */
function assignRatings() {
    console.log("func: assignRatings");
    let range = 0;      //number of values
    let add = 0;       //number to add from 0 to get rating range

    for (let i = 0; i < 10; i++) {
        switch (playerData[i].level) {
            case "random":
                range = 10;
                add = 1;
                break;
            case "easy":
                range = 3;
                add = 8;
                break;
            case "normal":
                range = 2;
                add = 5;
                break;
            case "hard":
                range = 3;
                add = 1;
                break;
        }
        playerData[i].rating = Math.floor(Math.random() * range) + add;
    }
    console.log(playerData);

    setupRace(1);
}

/**
 * Display race details and starting positions of players.
 * raceNum starts at 1
 */
function setupRace(raceNum) {
    console.log("func: setupRace");
    //Update info-space div
    let detailsDiv = document.getElementById('info-space');
    let children = detailsDiv.children;
    children[0].textContent = countries[raceNum-1];
    children[1].textContent = `Race ${raceNum} of ${numberOfRaces}`;
    children[2].textContent = "Starting Line Up";
    document.getElementById('next-action-text').textContent = "Drivers are ready...";
    let button = document.getElementById('next-button');
    (raceNum === 1) ? button.disabled = false : button.textContent = "Start Race!"; // enable gameplay button
}

/**
 * Generates the race result
 */
function startRace() {
    console.log("func: startRace");
    let race = createRaceArray(); 
    let result = createFinishArray(race);
    document.getElementById('next-button').disabled = true; //disable button while race is happening.
    assignRacePoints(result);
    sortPlayerArray("race-result");
    buildResult();
    displayResult();
 }

/**
 * Creates race array for the random number picks. One position in the array is assigned for each rating point, 
 * another for each boost point. Array is populated with the player name.
 */
function createRaceArray() {
    console.log("Setting up the race array");
    let raceArray = [];
    for (let i = 0; i < 10; i++) {      // loop players
        for (let x = 0; x < (playerData[i].rating + playerData[i].boost); x++) {    //loop rating + boost
            raceArray.push(playerData[i].name);
        }
    }
    console.log(raceArray);
    return raceArray;
}

/**
 * From array of player names, pick random numbers to determine finishing places - first to last. 
 * Once picked, that players name is removed from the array before the next finisher is selected. 
 * finshArray is populated with players names in order they finished. [0] is the winner
 * @param {any} raceRunning
 */
function createFinishArray(raceRunning) {
    console.log("func: createFinishArray");
    let finishArray = [];
    let finisher = "";
    for (let i = 0; i < 10; i++) {
        finisher = Math.floor(Math.random() * raceRunning.length);
        finishArray.push(raceRunning[finisher]);
        // remove name from tickets array
        let tempArray = raceRunning.filter(function (item) {
            return item !== raceRunning[finisher];
        });
        //update raceRunning array with new filtered array
        raceRunning = tempArray;
        console.log(finishArray);
        console.log(raceRunning);
    }
    
    return finishArray;
}

/**
 * Assigns race points to the playerData array and add to the season points
 * Code for finding object in an array by value sourced from:
 * https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
 * @param {any} resultArray
 */
function assignRacePoints(resultArray) {
    console.log("func: assignRacePoints");
    for (let i = 0; i < 10; i++) {
        let points = pointsAwarded[i];
        let thisPlayer = playerData.find(thisPlayer => thisPlayer.name === resultArray[i]);
        console.log(thisPlayer);
        thisPlayer.racePoints = points;
        thisPlayer.seasonPoints += points;
        console.log(thisPlayer);
    }
}

/**
 * Sort playerData array ready for displaying in html table
 * Code for sorting array by property helped by:
 * https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
 * @param {any} reason
 */
function sortPlayerArray(reason) {
    console.log("func: sortPlayerArray");
    if (reason === "race-result") {
        let sortedPlayers = playerData.sort((p1, p2) => (p1.racePoints < p2.racePoints) ? 1 : (p1.racePoints > p2.racePoints) ? -1 : 0);
        console.log(sortedPlayers);
        playerData = sortedPlayers;
        
    } else if (reason === "view-standings") {
        console.log("view-standings");
        let sortedPlayers = playerData.sort((p1, p2) => (p1.seasonPoints < p2.seasonPoints) ? 1 : (p1.seasonPoints > p2.seasonPoints) ? -1 : 0);
        console.log(sortedPlayers);
        playerData = sortedPlayers;
    }
}
/**
 * build HTML table for result, table will be hidden.
 */
function buildResult() {
    console.log("func: buildResult");
    let resultHtml = "";
    resultHtml = `<tr>
        <th>Pos.</th>
        <th>Driver</th>
        <th>Car</th>
        <th>Boost</th>
        <th>Points</th>
        </tr>`;
    for (let i = 0; i < 10; i++) {
        resultHtml += `
        <tr style="visibility:hidden;">
                <td>${i + 1}</td>
                <td>${playerData[i].name}</td>
                <td>${playerData[i].car}</td>
                <td>${playerData[i].boost}</td>
                <td>${playerData[i].racePoints}</td>
        </tr>`;
    } 

    document.getElementById('game-table').innerHTML = resultHtml;
}

/**
 * Displays the game table row by row, starting with 10th place.
 * Also calls addBoostPoints function. Boost points added after the race and first displayed in season standings.
 */
function displayResult() {
    console.log("func: displayResult");
    document.getElementById("table-info").textContent = "Race Result";
    document.getElementById("next-action-text").textContent = "";
    
    let racePositions = document.getElementsByTagName('tr');
    // code below adapted from Robinz_alumni post on Slack
    // https://code-institute-room.slack.com/archives/C7EJUQT2N/p1592124446412900
    let row = 10;
    function displayRow() {
        console.log(`Displaying row number ${row}`);
        racePositions[row].style.visibility = "visible";
        row--;
        if (row < 1) { // Full result is now displayed, 
            clearInterval(counterIntervalWinner);
            addBoostPoints(); // add boost points after result has been displayed.
            document.getElementById('next-button').disabled = false;
            document.getElementById('next-button').textContent = "View Standings";
        }
    }
    const counterIntervalWinner = setInterval(displayRow, raceDelay);
}

/**
 * Display the season standings
 */
function displayStandings() {
    // first sort the playerData array by season Points.
    sortPlayerArray("view-standings");
    console.log(playerData);
    //update info text
    document.getElementById("table-info").textContent = "Overall Standings";
    document.getElementById("next-action-text").textContent = "The season so far..";
    buildGameTable("standings");
    //check end of game
    if (document.getElementById('race-country').textContent === countries[numberOfRaces-1]) {
        endOfGame();
    } else {
        document.getElementById('next-button').textContent = "Next Race";
    }
}

function addBoostPoints() {
    for (let i = 0; i < playerData.length; i++) {
        playerData[i].boost += boostAwarded[i];
    }
}

function endOfGame() {
    console.log("func: endOfGame");
    document.getElementById("table-info").textContent = "Final Standings";
    document.getElementById("next-action-text").textContent = `${playerData[0].name} is the winner with ${playerData[0].seasonPoints} points!`;
    document.getElementById('next-button').textContent = "Play Again";
}

runGame();


