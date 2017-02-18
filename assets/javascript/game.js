(function() {
  'use strict'; 



	// build hangman game object
	var hm = {

  	   container: document.getElementById("container"),

  	   wordToGuess: document.getElementById("wordToGuess"),

  	   numLivesRemaining: document.getElementById("numLivesRemaining"),

  	   guessedLetters: document.getElementById("guessedLetters"),	

  	   numGuessesRemaining: document.getElementById("numGuessesRemaining"),	

  	   numWinsTotal: document.getElementById("numWinsTotal"),	

  	   mainContent: document.getElementById("mainContent"),	

  	   winnerMessage: document.getElementById("winnerMessage"),	

  	   loserMessage: document.getElementById("loserMessage"),	

  	   playAgain: document.getElementById("playAgain"),		

  	   audioToggle: document.getElementById("audioToggle"),

  	   audioPlaying: true,	 

	   numGuesses: 8,

	   numLives: 3,	 

	   numWins: 0,	   

	   wordsArray: [
	   	'atlanta', 
	   	'baller', 
	   	'rapper', 
	   	'dancers', 
	   	'stiletto'
	   ], 

	   wordByChar: [],

	   usedChars: [], 

	   init: function(){ 

	   		//set defaults and pick first word to begin game
	   		this.numGuessesRemaining.innerHTML = this.numGuesses;
	   		this.numWinsTotal.innerHTML = this.numWins;
	   		this.newLevel();
	   		this.audioLoad();

			setTimeout(function(){
				this.container.className = 'loadOn';
			}, 1000); 

	   },

	   pickWord: function(){

	   		//grab random word from wordsArray to play
	   		//remove word from array once used
	   		//if there are no more words left, user has completed game

	   		var arrLength = this.wordsArray.length;

	   		if (arrLength > 0) { 
		   		var word = this.wordsArray[Math.floor(Math.random() * arrLength)];
		   		this.splitWord(word);

		   		//remove from list so it isn't re-used
				var index = this.wordsArray.indexOf(word);
				this.wordsArray.splice(index, 1); 
	   		}else{
	   			this.userWon();
	   			return false;
	   		};

	   },

	   splitWord: function(word){
	   		//bust out random word in array by each character
	   		this.wordByChar = word.split(''); 

	   		//build blanks for user to guess from
	   		this.set_blankWord(); 
	   },

	   set_blankWord: function(){ 
	   		var eachLetter = '';

	   		//for each character in array, add blank element 
			for (var i = 0, len = this.wordByChar.length; i < len; i++) {	
			  eachLetter += '<li><span>&nbsp;</span></li>';		 
			};	   			   		

			this.wordToGuess.innerHTML = eachLetter;
	   },

	   handle_keyPress: function(key){

	   		//first, make sure char has not already been used
	   		if (this.usedChars.indexOf(key) < 0) {

		   		//add char to list of used chars
		   		this.usedChars.push(key);

		   		//check if character exists in current word wordToGuess
		   		if (this.wordByChar.indexOf(key) >= 0) {
		   			this.handle_correctKey(key);
		   		}else{
		   			this.handle_incorrectKey(key);
		   		}

	   		}else{
	   			//do nothing for now
	   		};
 
	   },

	   handle_correctKey: function(key){	   		

	   		//find all places in word correct char is used, fill it in
			for (var i = 0, len = this.wordByChar.length; i < len; i++) {
				if (this.wordByChar[i] === key) {
					var thisLi = this.wordToGuess.getElementsByTagName("LI")[i];
					thisLi.getElementsByTagName("span")[0].innerHTML = key;
					thisLi.className = "check";
				};	 
			};

			//check if user has filled in all blanks
			var slides = document.getElementsByClassName("check");
			if (slides.length === this.wordByChar.length) {

				this.numWins++;
				this.numWinsTotal.innerHTML = this.numWins;

				setTimeout(function(){
					hm.newLevel();
				}, 1000);  	
				
			};

	   },

	   handle_incorrectKey: function(key){

	   		//check if user has run out of guesses
	   		if (this.numGuesses > 1) {
	   			//reduce number of remaining guesses
	   			this.numGuesses--;
	   			this.numGuessesRemaining.innerHTML = this.numGuesses;

		   		//add incorrect char to array and to guessedLetters ul 
		   		this.guessedLetters.innerHTML = this.guessedLetters.innerHTML + '<li>'+key+'</li>'; 
	   		}else{
	   			//user loses a life, pick a new word until those run out
	   			if (this.numLives > 1) {
		   			this.numLives--;
		   			this.newLevel();
	   			}else{
	   				this.gameOver();
	   			};

	   		}; 

	   },

	   newLevel: function(){
	   		this.wordByChar = [];
	   		this.usedChars = []; 
	   		this.numGuesses = 8;

	   		this.numGuessesRemaining.innerHTML = this.numGuesses;
	   		this.guessedLetters.innerHTML = '';
	   		this.numLivesRemaining.innerHTML = this.numLives;
	   		this.pickWord();
	   },

	   gameOver: function(){
	   		this.mainContent.className = "animOff";
	   		this.loserMessage.className = "finalResult";	   			   		
	   		this.playAgain.className = "finalResult";	   			   		
	   },

	   userWon: function(){
	   		makeItRain();
	   		this.mainContent.className = "animOff";
	   		this.winnerMessage.className = "finalResult";
	   		this.playAgain.className = "finalResult";
	   },

	   audioLoad: function(){

	        this.audioElement = document.createElement("audio");
	        this.audioElement.setAttribute("src", "assets/audio/future-maskOff.mp3");

	        //Ya know what? Go ahead and auot-play, it's a game...
	        this.audioElement.play();

	   },

	   trigger_audioToggle: function(){

	   		if (this.audioPlaying) {
	   			this.audioToggle.classList.remove("playing");	   			
	   			this.audioPlaying = false;
	   			this.audioElement.pause();
	   		}else{	  
	   			this.audioToggle.className = 'playing'; 			
	   			this.audioPlaying = true;
	   			this.audioElement.play();
	   		};

	   }

	};


	// kick off game 
	hm.init(); 

	










	//user events
	//**************************************************//


	//get user key input
	window.addEventListener('keydown', function(event) {
		//don't track any key that isn't a letter
		if (event.keyCode >= 65 && event.keyCode <= 90){
			hm.handle_keyPress(event.key);
		}
	}, false);


	//play again btn
	hm.playAgain.addEventListener('click', function(event) {
		document.getElementsByTagName("body")[0].className = 'allOff';

		setTimeout(function(){
			location.reload();
		}, 3500);  

	});


	//play again btn
	hm.audioToggle.addEventListener('click', function(event) {		
		hm.trigger_audioToggle();
	});












}()); 