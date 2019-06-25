
var grid = ['1','2','3','4','5','6','7','8','9']

var player1,player2;

function main(){
    //readline built-in module to get input from user in the console
    const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        })

    readline.question(`Enter name for Player 1:\n`, (result) => {
        player1=result;
        readline.question(`Enter name for Player 2:\n`, (result2) => {
            player2=result2;
            readline.close();
            console.log('Game started: \n' +
                ' 1 | 2 | 3 \n' +
                ' --------- \n' +
                ' 4 | 5 | 6 \n' +
                ' --------- \n' +
                ' 7 | 8 | 9 \n');

            //game starts with player1 always, player 1 has 'x' symbol. player2 has 'o'
            playerTurn(player1,'x');
        });
    });
}


function updateGrid(position, symbol) {
    grid[position] = symbol;
}

function printStatus() {
    console.log('\n' +
        ' ' + grid[0] + ' | ' + grid[1] + ' | ' + grid[2] + '\n' +
        ' ---------\n' +
        ' ' + grid[3] + ' | ' + grid[4] + ' | ' + grid[5] + '\n' +
        ' ---------\n' +
        ' ' + grid[6] + ' | ' + grid[7] + ' | ' + grid[8] + '\n');

}

 //check if the user input is a valid position in grid
 //check if input is a number and between the range of 1-9 (0-8 for index),
 //check grid position is available  
function isValid(position) {

   return !isNaN(position) && parseInt(grid[position]) && (position >= 0 && position <= 8);
}

// possible combination of three in a row, 3 in a column, and diagonals
const winMoves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                       [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// check for the winner
function isWinner(symbol) {
   
    //iterate through every possible winning move 
    for (let i = 0; i < winMoves.length; i++) {
        // inside winmove condition check for every value and match with grid index
        let count = 0;
        for (let j = 0; j <3; j++) {
            // if grid index value found with the symbol 'x' or 'o' passed to function,
            //increment the count
            if (grid[winMoves[i][j]] === symbol) {
                count++;
            }
            //winner is when the count of total match with any of winMoves array is 3
            if (count === 3) {
                return true;
            }
        }
    }
    return false;
}

//check for the tie condition
function checkTie(grids){
    let count =0;
    //iterate through the grid array and if value is x or o increment count
    grids.forEach(val => { if(val == 'x' || val =='o') count +=1});
    //if count = total number of elements in the grid ,it's a tie. hence true.
    return count==grids.length ? true:false;
    
}


//play function
function playerTurn(player,symbol) {
    //get player's input to play at which box
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    readline.question(`${player},choose a box to place an '${symbol}' into: \n`, (box) => {
     
        readline.close()
        box=parseInt(box)-1; // parse the string input to integer, suntract 1 to get the values for array index
        if (isValid(box)) {
            updateGrid(box, symbol);
            printStatus();
            if (isWinner(symbol) === true) {
                console.log(`Congratulations ${player}! You have won.`);
                return;
            }
            else if( checkTie(grid)){
                console.log(`It's a tie`);
                return;
            }
            else if (symbol=='x') {
                playerTurn(player2,'o');
            } else {
                playerTurn(player1,'x');
            }
        } else {
            console.log('Incorrect input please try again...');
            playerTurn(player,symbol);
        }

    });
}

main();

module.exports= {checkTie};
