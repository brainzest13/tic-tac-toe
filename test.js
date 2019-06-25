const Test= require('./tic.js');
var assert = require('assert');
//var grid = ['1','2','3','4','5','6','7','8','9']

// writing a test case for one function  checks in grid if Tie condition is met
function checkTie(){
    
    var grids = [['1','2','3','4','5','6','7','8','9'],['x','2','o','x','x','o','7','8','o'],['x','o','x']]

    grids.forEach( val =>{
	    try {
	    	assert.equal(Test.checkTie(val), true);
	    	console.log('Its a tie, Passed.');
		} catch (error) {
			//assert.equal(Test.checkTie(), true);
		    console.error('Its not a tie, Failed.');
		}
	});
	
}
checkTie();
