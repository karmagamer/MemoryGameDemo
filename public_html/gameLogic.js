	var person = prompt("Please enter your name");
	// checking for valid input
	var gamesize =0;
	if(/^[A-Za-z\s]+$/.test(person) === false){reset();
			alert("Game Restarting! Don't fool me !");
}
else{// gamesize == card deck. Input is 6 . card deck will be 6x6
	gamesize = prompt("Select Card Size. Please");
}
// checking for valid input
if(/^-?\d*[02468]$/.test(gamesize)===false){
	reset();
	alert("Game Restarting! Don't fool me ! Enter even number");
}

	var score = 0;
	var attempts = 0;
	var scoreLabel = $("<h2>Score: <span id=\"scorePrompt\"></span></h2>");
	// Time function is based on card size .
	function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = "Time Over";
						location.realod();
        }
    }, 1000);
}

window.onload = function () {
	// Time function is based on card size . 30 seconds multiplied by deck choice.
	// for example. 6x6 gamesize would give user 30*6 = 180 seconds.
    var remainingTime = 30 * gamesize,
        display = document.querySelector('#time');
    startTimer(remainingTime, display);
};

	$("#scorePrompt").append(scoreLabel);


// Reset function to reload page incase of error or invalid arguments or to restart the game.
	function reset(){
		location.reload();
	}


	function playGame(){

		$.ajax({
		  method:"GET",
		  url:'/memory/intro',
		  data: {username:person, size:gamesize},
		  success: displayGame,
		  dataType:'json'
		});

		//Check to see how many tiles have flipped
		var flippedTiles = [];

		function displayGame(data){

			console.log(data);

			$("#gameboard").empty();

			var indexIncrement = 0;

			//Nested for loop to create the Tiles on th browser
			for (var i = 0; i < gamesize; i++){

				var tileObject = $("<tr id=\"row"+i+"\"  > </tr>");

				//Create divs according to gamesize
				//Add the row to the board
				for(var r=0; r < gamesize; r++){
				 	var object  = $("<div class='tile' id=\"tileId"+i+r+"\" data-rowindex='"+i+"' data-columnindex='"+r+"'></div> ");
				 	object.click(chooseTile);
				 	tileObject.append(object);
				}
				//Add the row to the board
			 	$("#gameboard").append(tileObject);


			}
			//Add the username to the screen

			$("#userPrompt").append(person);
		}


		function chooseTile(){
			$.ajax({
			  method:"GET",
			  url:'/memory/card',
			  data: {username : person, rowindex : $(this).data('rowindex'), columnindex : $(this).data('columnindex') },
			  success: checkTile,
			  dataType:'json'
			});

			//Use this function to check which tile it was
			function checkTile(data){

				var rowString="#row"+data.row;
				var tileString="#tileId"+data.row+data.column;

				//find the tile Class
				var tileClass = $($("#gameboard > "+rowString+" > "+tileString)).attr('class');

				//Change the tile to the flippedtile class with a changed background
				$("#gameboard > "+rowString+" > "+tileString).toggleClass("flippedtile");
				//Remove the click handler while flipped
				$("#gameboard > "+rowString+" > "+tileString).off();
				//Find the value and add it as a div in the tile element
				var valueObject = $("<div> <span>"+data.value+" </span> </div> ");
				$("#gameboard > "+rowString+" > "+tileString).append(valueObject);

				//Push this tile info as an array to a list
				flippedTiles.push([data.row, data.column, data.value]);

				compareTiles();
				console.log(flippedTiles);





			}


		}

		function compareTiles(){

			//If more than 2 tiles have been flipped
			if(flippedTiles.length === 3){

				//Increment attempts
				attempts++;

				//Find the values associated with the tiles
				var value1 = flippedTiles[0][2];
				var value2 = flippedTiles[1][2];

				//If they are the same
				if(value1 === value2){
					//Remove their click functionality
					$("#gameboard > #row"+flippedTiles[0][0]+" > #tileId"+flippedTiles[0][0]+flippedTiles[0][1]).off();
					$("#gameboard > #row"+flippedTiles[1][0]+" > #tileId"+flippedTiles[1][0]+flippedTiles[1][1]).off();

					//Remove them from the list
					flippedTiles.splice(0, 1);
					flippedTiles.splice(0, 1);
					//Increment the score
					score++;
					//Update the score label
					$("#scorePrompt").empty();
					$("#scorePrompt").append(score);
				}
				//If they are not the same
				else{
					//Add the click listener back
					$("#gameboard > #row"+flippedTiles[0][0]+" > #tileId"+flippedTiles[0][0]+flippedTiles[0][1]).click(chooseTile);
					$("#gameboard > #row"+flippedTiles[1][0]+" > #tileId"+flippedTiles[1][0]+flippedTiles[1][1]).click(chooseTile);
					//Toggle the class back to tile
					$("#gameboard > #row"+flippedTiles[0][0]+" > #tileId"+flippedTiles[0][0]+flippedTiles[0][1]).toggleClass("flippedtile");
					$("#gameboard > #row"+flippedTiles[1][0]+" > #tileId"+flippedTiles[1][0]+flippedTiles[1][1]).toggleClass("flippedtile");
					//Remove the value from the tile
					$("#gameboard > #row"+flippedTiles[0][0]+" > #tileId"+flippedTiles[0][0]+flippedTiles[0][1]).empty();
					$("#gameboard > #row"+flippedTiles[1][0]+" > #tileId"+flippedTiles[1][0]+flippedTiles[1][1]).empty();

					//Remove them from the list
					flippedTiles.splice(0, 1);
					flippedTiles.splice(0, 1);
				}
			}
			//check for tiles remaining and score neeed.
			var scoreNeeded = (((gamesize*gamesize)/2) - 1);
			if(score === scoreNeeded && flippedTiles.length === 2){
				//Alert the player they won
				finalScore();
			}

		}
		function finalScore(){
			$.ajax({
			  method:"GET",
			  url:'/memory/finish',
			  data: {username:person, size:gamesize, gameattempts:attempts, gamescore:score},
			  dataType:'json'
			});

			alert("You Won! Attempts : "+attempts);

			//Set the labels back to initial to start new game
			$("#userPrompt").empty();
			$("#scorePrompt").empty();
			$("#scorePrompt").append(0);
			score = 0;
			//Rerun the whole function
			playGame();

	}
	}

	//Start the game
	playGame()
