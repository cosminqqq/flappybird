/*  let mouse = {
	x: canvas.width,
	y: canvas.height
	
}

addEventListener("mousemove", function(event){
             mouse.x = event.clientX;
			 mouse.y = event.clientY;
			 
})

function getDistance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
    let yDistance = y2 - y1;
	let value = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	return value;
}

function Circle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	
	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	this.update = function () {
		
		this.draw();
	}
}

var circle1 = new Circle(300, 300, 50, 'blue');
var circle2 = new Circle(100, 100, 10, 'red');


function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
circle1.update();
circle2.x = mouse.x;
circle2.y = mouse.y;

circle2.update();

if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
	circle1.color = "white";
}else{
	circle1.color = "blue"
}


	}
animate(); 
 */



/* function Pipe (x, heightTop, heightBottom, width, speed) {
	this.x = x;
	this.heightTop = heightTop;
	this.heightBottom = heightBottom;
	this.width = width;
    this.speed = speed;
	
	this.draw = function () {
		
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, 0, this.width, this.heightTop);
		ctx.fillRect(this.x, this.heightBottom, this.width, 600);
	}
	
	this.update = function () {
		this.movement();
		this.draw();
	}
	
	this.movement = function () {
		this.x -= this.speed; 
	}
	
	this.xposition = function () {
		return this.x;
	}
}

let i = 0;
function animate () {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, 600, 600)

 	do{
      	    heightTop = Math.floor(Math.random()*354)+150;
            heightBottom = Math.floor(Math.random()*354)+150;
			value = Math.abs(heightTop + (600 - heightBottom));
			
		}while(value < 440 || value > 460); 
       
	   
	   
		
		
		if( i % 160 === 0 ) {
		
		pipes.push(new Pipe(500, heightTop, heightBottom, 75, 2));
		
      
}
      for (let j = 0; j < pipes.length; j++) {
	    pipes[j].update();
	}
	
	if(pipes[0].xposition() < -75){
		pipes.splice(0,1);
	}
		
i++;	  		
} 

animate(); */


 

  
/* 	 var frameNumber = 1;
	 var step = 0;
 var sprite = new Image();
     sprite.src = "Flappy_Bird_Sprite.png";
	 
	 function animate () {
		 requestAnimationFrame(animate); 
		  
 	      step++;
	
	if(step > 5){
		  frameNumber++;
		 if(frameNumber - 1  < 3) {
		 ctx.clearRect(0, 0, canvas.width, canvas.height)
		 ctx.drawImage(sprite, (frameNumber - 1) * 28, 491, 23, 12, 250, 250, 30, 30);
		  step = 0; 
		 
	                   }else{
		   frameNumber = 0;
					   }	 
			   }    
	   }
 animate(); */
  
/*  var sprite = new Image();
     sprite.src = "Flappy_Bird_Sprite.png"
	 
function drawSprite (img, x_crop, y_crop, x_width, y_height, x_pos, y_pos, x_posWidth, y_posHeight) {
	this.img = img;
	this.x_crop = x_crop;
	this.y_crop = y_crop;
	this.x_width = x_width;
	this.y_height = y_height;
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.x_posWidth = x_posWidth;
	this.y_posHeight = y_posHeight;
}
var position = 292.5;
   
   drawSprite.prototype.draw = function () {

	 	 
	   ctx.drawImage(this.img, this.x_crop, this.y_crop, this.x_width, this.y_height, this.x_pos, this.y_pos, this.x_posWidth, this.y_posHeight);
   }
				 var arr = [
				    new drawSprite(sprite, 137, 306, 7, 10, position, 50, 20, 40), 
		            new drawSprite(sprite, 139, 477, 5, 10, position, 50, 15, 40),
		            new drawSprite(sprite, 292, 160, 12, 18, position, 50, 15, 40),
					new drawSprite(sprite, 306, 160, 12, 18, position, 50, 15, 40),
					new drawSprite(sprite, 320, 160, 12, 18, position, 50, 15, 40),
					new drawSprite(sprite, 334, 160, 12, 18, position, 50, 15, 40),
					new drawSprite(sprite, 292, 184, 12, 18, position, 50, 15, 40),
					new drawSprite(sprite, 306, 184, 12, 18, position, 50, 15, 40),
					new drawSprite(sprite, 320, 184, 12, 18, position, 50, 15, 40),
					new drawSprite(sprite, 334, 184, 12, 18, position, 50, 15, 40),
					]

					
 	 var increment = 0;
	 
 function animate () {
	 requestAnimationFrame(animate);
     increment++;

	 if (increment % 1 == 0){
		 score += 1;
	 }
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	  			var tString  = score.toString(); //Makeing the score into a string so I can select each number with the substring function
				var length = tString.length; //Finding out the length of the string(in our case is 2)
				
				for(var i = 0; i < length; i++){
			
					var substring = tString.substring(i,i+1); //Selecting each digit of that number in order to draw each of them separately
					var toNumber = parseInt(substring); //Setting that "string" back into a number so I can acces that number in the array
					
		
                    var maxLength = length * 15 + 10 * (length - 1);
			        var arrayPosition = (canvas.width / 2) - maxLength/2;
                    var finalPosition = i * 15 + i * 10;					 
                    var realPosition = (canvas.width / 2) - maxLength / 2 + finalPosition
	
					 
                    arr[toNumber].x_pos = realPosition;
   					 
					arr[toNumber].draw();
		              	
			}	                     
 }
 
 animate(); */

 
 
 
 
 
 

 
 



