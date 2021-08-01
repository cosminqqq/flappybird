 
 var sprite = new Image();
     sprite.src = "Flappy_Bird_Sprite.png";
 var step = 0;
 var frameNumber = 0;
 var startAnimation = false;
 

    function backgroundSprites(backgroundHeight, groundHeight, xPos, t) {
	     this.backgroundHeight = backgroundHeight;
	     this.groundHeight = groundHeight;
	     this.xPos = xPos;
		 this.t = t;
	 
	
	 
		this.start = function() {
	         t -= 3;	   

    	     ctx.drawImage(sprite, 0, 0, 145, 257, 0, canvas.height - backgroundHeight - groundHeight, 202, 257); // The background made with 3 pieces
	         ctx.drawImage(sprite, 0, 0, 145, 257, 200, canvas.height - backgroundHeight - groundHeight, 202, 257); // The background made with 3 pieces
	         ctx.drawImage(sprite, 0, 0, 145, 257, 400, canvas.height - backgroundHeight - groundHeight, 202, 257); // The background made with 3 pieces
	   	   
		 
		 if(bird1.hit == true){ //If bird hits pipes, ground stops 	
			 t = 0;
		 }
       ctx.drawImage(sprite, 292, 2, 168, 54, xPos * 0 + t, canvas.height - groundHeight, 201, groundHeight); // The ground made with 3 pieces
	   ctx.drawImage(sprite, 292, 2, 168, 54, xPos + t, canvas.height - groundHeight, 201, groundHeight); // The ground made with 3 pieces
	   ctx.drawImage(sprite, 292, 2, 168, 54, xPos * 2 + t, canvas.height - groundHeight, 201, groundHeight); // The ground made with 3 pieces
	   ctx.drawImage(sprite, 292, 2, 168, 54, xPos * 3  + t, canvas.height - groundHeight, 200, groundHeight); // The ground made with 3 pieces
	   if(t < -200){
		   t = 0;
	   }		

	   if(startAnimation == false) {
		bird1.beforeStart();
		bird1.show();
		}
		 

		
	 }
	}

	function Bird (x, y, velocity, gravity, radius, lift) {
	 this.x = x;
	 this.y = y;
	 this.radius = radius;
	 this.velocity = velocity;
	 this.gravity = gravity;
	 this.lift = lift;
	 this.hit = false;
	 
	 var startSpeed = 1;

	   
	   this.resetPosition = function () {
	        this.velocity = 0;
            this.y = 200;
        }
		
 	  this.beforeStart = function () {

				  
			 ctx.drawImage(sprite, 292, 91, 57, 50, 225, 180, 150, 100);
			 flappyBird.draw();
			 
			 this.y += startSpeed;
			   if(this.y == 320) {
				  startSpeed = -startSpeed;
			   }
			   if(this.y == 280) {
				   startSpeed = -startSpeed;
			   }
		 
	  } 
	
       this.show = function() {
	   	   
		  
		     step++;
		     ctx.drawImage(sprite, (frameNumber) * 28, 491, 23, 12, this.x - 25, this.y - 20, 50, 40); //bird sprite animation
             if(step > 5){
		        frameNumber++;
		        step = 0;
	              if (frameNumber == 3) {
					  frameNumber = 0;
		                    }  
		 }
		 
		 
		 ctx.beginPath();	
	     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
         //ctx.fillStyle= 'rgba(76, 175, 80, 0.8)'; Colision
	     //ctx.fill();
		
	 }
	
	
	 this.update = function() { // updateing the position of the bird
		 
	    this.velocity +=  this.gravity; 
		 
		if(this.y < 26.1){
			this.y = 31;
			this.velocity = 1.2;
		}
   		
		 this.y += this.velocity;
		 
		 if(this.y > canvas.height - this.radius){
			 this.y = canvas.height - this.radius;
		 }
		 
		 if(this.y < this.radius){
			 this.y = this.radius;
		 }
		 
		 	  
		 this.show();
		 
}
     this.jump = function () {

		 this.velocity = 0;
		 
		 this.velocity += this.lift;
	
	 }	

}

      function Pipe (x, mTop, mBottom, width, speed) {
	this.x = x;
	this.mTop = mTop;
	this.width = width;
	this.mBottom = mBottom;
	this.speed = speed;
	
	this.highlight = false;
	var mBottomDif = 600 - this.mBottom - 70;
	
	this.initialPosition = function () {
		pipes = [];
		//pipe1.speed = 2; Why did I put this here...
	}
	
	this.draw = function () {
		ctx.fillStyle = 'green';
		if(this.highlight) {
			ctx.fillStyle = 'red';
		}
	

      
      // ctx.fillRect(this.x, 0, this.width, this.mTop) //Top-Bottom pipe - replaced rectangle with pipe image
	  // ctx.fillRect(this.x, this.mBottom, this.width, mBottomDif); // Bottom-Top pipe - replaced rectangle with pipe image
 	
	   
	   ctx.drawImage(sprite, 56, 324, 26, 140, this.x, 0, this.width, this.mTop - 20); // Top-Bottom pipe made of 2 pieces because of bad resolution(first peace)
	   ctx.drawImage(sprite, 56, 464, 26, 20, this.x, this.mTop - 20, this.width, 20); // Top-Bottom pipe (second peace)
	   
	   
       ctx.drawImage(sprite, 84, 324, 26, 20, this.x, this.mBottom, this.width, 20); // Bottom-Top pipe made of 2 pieces because of bad resolution(first peace)
	   ctx.drawImage(sprite, 84, 344, 26, 140, this.x, this.mBottom + 20, this.width, mBottomDif - 20);  // Top-Bottom pipe made of 2 pieces because of bad resolution(second peace)
		
		
	}
	
	this.update = function () {
		if(pipes[0].hits(bird1)){
			this.speed = 0;
		}
		 this.x -= this.speed; 
		this.draw();
	}
	

	
	this.offScreen = function () {
		return this.x;
	}
	
	this.hits = function (bird) {


		
		if(bird.y - bird.radius < this.mTop || bird.y + bird.radius > this.mBottom){
			 if(bird.x + bird.radius > this.x && bird.x - bird.radius < this.x + this.width){
				this.highlight = true;
				return true;

			} 
			
		
	  }
	  this.highlight = false;
	  return false; 
	}
 	
}


         function eventHandler (event) { //Bird jumps on space
	if(event.keyCode == '32') {
		 
		 if(bird1.hit == false){
		 bird1.jump();
			}
		
	if(event.keyCode ==  '32' && startAnimation == false) {
			 clearInterval(intRval);
			 animate();
			 startAnimation	= true;
		 }
			console.log("space")
		  }
}

         function clickEvent (event) { //Click event function
		 
	if(event.which == 1 && startAnimation == false) { //Animation starts at click when there is the floating screen
			 clearInterval(intRval);
			 animate();
			 startAnimation	= true;
		 }
        
      if(event.which == 1){ //Bird jumps on click
			if(bird1.hit == false){
		     bird1.jump();
			}
       
           }
		     console.log("You pressed the left click of the mouse");
         } 
		 

			 
		function Sprite (img, a, b, c, d, e, f, g, h) {
			this.img = img;
			this.a = a;
			this.b = b;
			this.c = c;
			this.d = d;
			this.e = e;
			this.f = f;
			this.g = g;
			this.h = h;
			

		}
		
		var btnStart = {
			xLeft: 150,
			yTop: 320,
			xRight: 270,
			yBottom: 370
		}
		
		btnStart.checkClicked = function () {
			if( btnStart.xLeft <= mouseX && btnStart.xRight >= mouseX && btnStart.yTop <= mouseY && btnStart.yBottom >= mouseY && functionStart == 1) return true; //If "OK" button is pressed, restart animation
		}
		

		
		let mouse = {
	x: 0,
	y: 0
};


function mouseMove (event) { //Check if mouse is inside "OK" botton
	
	let canvasPositionX = document.getElementById("canvas-parent").offsetLeft;
	let canvasPositionY = document.getElementById("canvas-parent").offsetTop;
	
 	 mouse.x = event.clientX;
	 mouse.y = event.clientY;
	
     mouseX = mouse.x - canvasPositionX;
	 mouseY = mouse.y - canvasPositionY;
	 
	 
	 if (btnStart.checkClicked()) {
		 animate(); 
	     bird1.jump();
	 }

	
	}

	  		function restartButton() {
			if(functionStart == 1){
				 if(1 == 1){
			       // animate();
			       // bird1.jump();
			  }
         }	
	}

	 

		
		Sprite.prototype.draw = function (){
			ctx.drawImage(this.img, this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h)
		}
		
						 var arr = [
				    new Sprite(sprite, 137, 306, 7, 10, this.e, this.f, this.g, this.h),
		            new Sprite(sprite, 139, 477, 5, 10, this.e, this.f, this.g, this.h),
		            new Sprite(sprite, 292, 160, 12, 18, this.e, this.f, this.g, this.h),
					new Sprite(sprite, 306, 160, 12, 18, this.e, this.f, this.g, this.h),
					new Sprite(sprite, 320, 160, 12, 18, this.e, this.f, this.g, this.h),
					new Sprite(sprite, 334, 160, 12, 18, this.e, this.f, this.g, this.h),
					new Sprite(sprite, 292, 184, 12, 18, this.e, this.f, this.g, this.h),
					new Sprite(sprite, 306, 184, 12, 18, this.e, this.f, this.g, this.h),
					new Sprite(sprite, 320, 184, 12, 18, this.e, this.f, this.g, this.h),
					new Sprite(sprite, 334, 184, 12, 18, this.e, this.f, this.g, this.h)
					
					]
					
                    var btnArray = [
					     new Sprite (sprite, 462, 42, 40, 14, 150, 320, 120, 50),
						 new Sprite (sprite, 292, 142, 40, 14, 330, 320, 120, 50)
					]
		
		var gmOver = new Sprite (sprite, 395, 59, 96, 21, 200, 100, 200, 50);
		var scoreBoard = new Sprite (sprite, 3, 259, 113, 57, 150, 160, 300, 150); 
		var newScore = new Sprite (sprite, 112, 501, 16, 7, 160, 150, 300, 150);
		var flappyBird = new Sprite (sprite, 351, 91, 89, 24, 200, 100, 200, 50);
		var topScores = new Sprite (sprite, 414, 118, 52, 29, 160, 150, 300, 150);
		
		   var medalArray = [
		                     new Sprite (sprite, 112, 477, 22, 22, 185, 216, 58, 58),
							 new Sprite (sprite, 112, 453, 22, 22, 185, 216, 58, 58),
							 new Sprite (sprite, 121, 282, 22, 22, 185, 216, 58, 58)
		                  ]
	
	
 
   var bird1 = new Bird(50,300, 0, 0.6, 20, -10);
   var backgroundAnimation = new backgroundSprites(256, 70, 200, 0); 
  
  sprite.onload = function () {
   intRval = setInterval(startScreen,20);
  }
  
  function startScreen(){ //Floating bird before the player taps and the game starts
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	   backgroundAnimation.start();
	
  }


   function animate () {	   
	   
	 var reqAF =  requestAnimationFrame(animate);
	   
 	    do{
      	    heightTop = Math.floor(Math.random()*354)+150; // Random number between 150 - 500
            heightBottom = Math.floor(Math.random()*354)+150; // // Random number between 150 - 500
			value = Math.abs(heightTop + (530 - heightBottom));
			
		 }while(value < 370 || value > 390)  
				   
        var pipe1 = new Pipe(800, heightTop, heightBottom, 75, 2);		
		
			

        if(functionStart == 1){
				   startOver();
		         	   } 
			   
			function startOver() {
             
    			 bird1.hit = false;
				 score = 0;
	             count = 0;
	             functionStart = 0;
				 
                 bird1.resetPosition(); 
				 
	             pipe1.initialPosition();
				
	   
}
			   
	     	ctx.clearRect(0, 0, canvas.width, canvas.height);
			
	 	    backgroundAnimation.start();
		    bird1.update();	
	 	

		if(count % 160 == 0){ //Every 160 frames add a pipe
			pipes.push(pipe1);
			
		}
		
		for(var i = 0; i < pipes.length; i++){ //For every pipe in the array, update it's position
        pipes[i].update();
		
		}
		  
		if(pipes[0].hits(bird1) || bird1.y > 500) {
			bird1.hit = true;

		    if(bird1.y > 500) {
				
				bird1.hit = false;
				functionStart = 1;
				

				
				
				var tString  = score.toString();
				var length = tString.length;
				
					for(var i = length; i > 0; i--){
						
				
					var substring = tString.substring(i-1,i); //Selecting each digit of that number in order to draw each of them separately
					var toNumber = parseInt(substring); //Setting that "string" back into a number so I can acces that number in the array
					
		
                    var maxLength = length * 20 + 5 * (length - 1); //Max length of the numbers "div"
			        var arrayPosition = (canvas.width / 2) - maxLength/2; //Centering the "div"
                    var finalPosition = (410 - maxLength) + (i * 15 + i * 5); //The position from the start of the "div" of each digid in that "div" + padding					 
                    var realPosition = 405 //The position in the canvas
	
					 
 
                    arr[toNumber].e = finalPosition; //Updateing real position
   					arr[toNumber].f = 205;
					arr[toNumber].g = 20;
					arr[toNumber].h = 20;
					
					
				    gmOver.draw();
				    scoreBoard.draw();
					
				    arr[toNumber].draw(); 

					
               }
			   
                  if(score > 10){
					  medalArray[0].draw();
				  }
				  if(score > 20) {
					  medalArray[1].draw();
				  }
				  if(score > 45) {
					  medalArray[2].draw();
				  }
              
                btnArray[0].draw();
				btnArray[1].draw();
				
 

			cancelAnimationFrame(reqAF);
			}
			
			
	}
				
	      count++;
	      var imageObj = new Image();
              imageObj.src = 'flappybird.png';
	 		  ctx.drawImage(imageObj, 550, 0, 50, 50);
			  
	
			  

		
	    if(pipes[0].offScreen() < -75 ){
			pipes.splice(0,1);
		}
		
	    if(pipes[0].x + pipes[0].width < bird1.x - bird1.radius && pipes[0].x + pipes[0].width === 29) {
			score += 1;
		};
		

 				
				 
				var tString  = score.toString();
				var length = tString.length;

				 
				
				for(var i = 0; i < length; i++){
				
					var substring = tString.substring(i,i+1); //Selecting each digit of that number in order to draw each of them separately
					var toNumber = parseInt(substring); //Setting that "string" back into a number so I can acces that number in the array
					
		
                    var maxLength = length * 15 + 2 * (length - 1); //Max length of the numbers "div"
			        var arrayPosition = (canvas.width / 2) - maxLength/2; //Centering the "div"
                    var finalPosition = i * 15 + i * 2; //The position from the start of the "div" of each digid in that "div" + padding					 
                    var realPosition = arrayPosition + finalPosition //The position in the canvas
	
                    arr[toNumber].e = realPosition; //Updateing real position
   					arr[toNumber].f = 50;
					arr[toNumber].g = 15;
					arr[toNumber].h = 40;
					
					
				 	arr[toNumber].draw(); 
                				
			}


   }

 
 window.addEventListener("click", mouseMove);
 window.addEventListener("click", restartButton, false);
 window.addEventListener("keydown",  eventHandler);




