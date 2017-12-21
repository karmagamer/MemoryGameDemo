## Memory Game Node Js Application

Live demo available on heroku and AWS. Install locally by following the steps provided at the end.

https://cryptic-wildwood-82095.herokuapp.com/

or

http://ec2-35-167-12-18.us-west-2.compute.amazonaws.com:8080/



Goal of this application is to make memory based card flipping game on browser.



##The Rules of the memory game:
a.     The cards should be laid out in a grid

b.     Click to turn over any two cards.

c.      If the two cards match, keep them in a revealed state.

d.     If they don't match, turn them back over.

f.      The game is over when all the cards have been matched.

## Project Scope and Requirements
* Must use NodeJS
* Must have a README file for building and running the app
* The cards may be differentiated by colors, numbers, pictures or icons
* The game must be able to:
* Notify the user if they win or lose
* Allow the user to reset at any time
* Randomize the ‘cards’ layout every game
* The game grid must be at least 6x6 cards

Bonus Points:

* Multi Player mode
* Tracking Scores
* Tracking Best Score
* Tracking time
* Adjustable number of cards in the game (difficulty levels)

## Approach & Architecture.

I decided to use html, css, and jquery to make the front end of the application. Node Js was used for user information management 
and server side logic.
Below diagrams will help you with understanding of the application.
![image](https://user-images.githubusercontent.com/12129202/34258719-127efaea-e614-11e7-8d71-1cab24bc13fe.png)

## How to Install ?

Clone repo

git clone https://github.com/karmagamer/MemoryGameDemo.git

npm install

npm start

go to localhost:8080

If there is an error, it would require you to install mime-types. Please install before proceeding.
