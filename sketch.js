let player;
let collectibles = [];
let enemy;
let walls = [];
let gameOver = false;


function setup() {
	createCanvas(windowWidth, windowHeight);

	//create player
	player = new Sprite();
	

	//create collectibles
	for (let i = 0; i < 10; i++) {
		let collectible = createSprite(random(width), random(height), 20, 20);
		collectible.shapeColor = color(0, 255, 0); // Green
		collectibles.push(collectible);
	  }

	  //create enemy sprite
	  enemy = new Sprite(15, 15, 60, 60); // Place enemy in top-left corner
	  

	   // Set initial random velocity for the enemy
 	 enemy.velocity.x = random(-1, 1);
 	 enemy.velocity.y = random(-1, 1);

}

function draw() {
	background(255);

	if (!gameOver) {
	//control player w mouse keys
	player.speed = 3;
	
	if (kb.pressing('up')) {
		player.direction = -90;
	} else if (kb.pressing('down')) {
		player.direction = 90;
	} else if (kb.pressing('left')) {
		player.direction = 180;
	} else if (kb.pressing('right')) {
		player.direction = 0;
	} else {
	  player.speed = 0;
	}

	//move enemy randomly
	enemy.position.x += enemy.velocity.x;
	enemy.position.y += enemy.velocity.y;

	 // Check for collision with the edges of the screen for the enemy
	 if (enemy.position.x < 15 || enemy.position.x > width - 15) {
		enemy.velocity.x *= -1; // Reverse horizontal direction
		enemy.position.x = constrain(enemy.position.x, 15, width - 15); // Prevent getting stuck
	  }
	  if (enemy.position.y < 15 || enemy.position.y > height - 15) {
		enemy.velocity.y *= -1; // Reverse vertical direction
		enemy.position.y = constrain(enemy.position.y, 15, height - 15); // Prevent getting stuck
	  }

	  // Check for collisions with collectibles
  for (let i = collectibles.length - 1; i >= 0; i--) {
    if (player.overlap(collectibles[i])) {
      collectibles[i].remove();
	  

	}
  }
	// Check for collision with enemy
	if (player.overlap(enemy)) {
		gameOver = true;
		player.speed = 0; //stop player movement
		enemy.velocity.x = 0; // Stop enemy movement
      enemy.velocity.y = 0; // Stop enemy movement
	  }

	} else {
		//game over text
		textSize (50);
		fill(255, 0, 0);
		textAlign (CENTER,CENTER);
		text("YOU LOSE");
	  }
	
}