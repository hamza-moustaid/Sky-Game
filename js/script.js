$(function(){
	xr=0;
	function rotateFrfara2(){
		if (gamePaused) {
			xr+=4;
			document.getElementById('frfara2').style.transform = 'rotateX('+xr+'deg)';
		}
	}
	
setInterval(rotateFrfara2,10);
	var animated = false;
	function extraire()
        {
        	if (animated){
        		if ( ++i[0] < Tmsg[0].length){
        			document.getElementById("msg1").innerHTML += Tmsg[0][i[0]];
        			$('#howtoplay table').css('border','2px solid #f2b451')
        		}
        	            	else {
        	            		$('.airplane').fadeIn('5000');
        	            		clearTimeout(interval);
        		            	if (++i[1] < Tmsg[1].length) {
        		            		$('#play-icon').fadeIn('5000');
        		            		$('#pause-icon').fadeIn('5000');
        		            		document.getElementById("msg2").innerHTML += Tmsg[1][i[1]];
        		            		interval = setInterval(extraire, 120); 
        		            	}
        		            	else {
        		            		clearTimeout(interval);
        		            		if (++i[2] < Tmsg[2].length) {
        		            			$('#volume-icon').fadeIn('5000');
        		            			$('#mute-icon').fadeIn('5000');
        			            		document.getElementById("msg3").innerHTML += Tmsg[2][i[2]];
        			            		interval = setInterval(extraire, 120); 
        		            		}
        		            		else {
        		            			clearTimeout(interval);
        		            			if (++i[3] < Tmsg[3].length) {
        		            				$('#font-icon').fadeIn('5000');
        				            		document.getElementById("msg4").innerHTML += Tmsg[3][i[3]];
        				            		interval = setInterval(extraire, 120); 
        			            		}
        			            		else {
        			            			clearTimeout(interval);
        			            			if (++i[4] < Tmsg[4].length) {
        			            				$('#fuel-icon').fadeIn('5000');
        					            		document.getElementById("msg5").innerHTML += Tmsg[4][i[4]];
        					            		interval = setInterval(extraire, 120); 
        				            		}
        				            		else {
        				            			clearTimeout(interval);
        				            			if (++i[5] < Tmsg[5].length) {
        				            				$('#star-icon').fadeIn('5000');
        						            		document.getElementById("msg6").innerHTML += Tmsg[5][i[5]];
        						            		interval = setInterval(extraire, 120); 
        				            			}
        				            			else clearTimeout(interval);
        				            			$('#retour').show('slow');
        				            		}
        				            	}
        			            	}
        		            	}
        		            }
        		        }

    }
        var Tmsg = ['Control Key : UP , DOWN , RIGHT and LEFT','Play/Stop the game','Play/Mute the sound','Change the font-size','If the fuel value down to 0 you lose','Number of stars collected'];
        var Timg = ['']
		var i = [-1,-1,-1,-1,-1,-1];


	var interval = setInterval(extraire, 120); 
	$('#btn_howtoplay').click(function(){
		animated = true;
		$('#howtoplay').show('fast');
		$('.startGame').hide('slow');
	})
	$('#retour').click(function(){
		$('#howtoplay').hide('fast');
		$('.startGame').show('slow');
	})

function collision (element1, element2) { 
	var Element1 = {}; 
	var Element2 = {}; 
	Element1.top = $(element1).offset().top; 
	Element1.left = $(element1).offset().left; 
	Element1.right = Number($(element1).offset().left) + Number($(element1).width()); 
	Element1.bottom = Number($(element1).offset().top) + Number($(element1).height());

	Element2.top = $(element2).offset().top; 
	Element2.left = $(element2).offset().left; 
	Element2.right = Number($(element2).offset().left) + Number($(element2).width()); 
	Element2.bottom = Number($(element2).offset().top) + Number($(element2).height()); 

	if (Element1.right > Element2.left && Element1.left < Element2.right && Element1.top < Element2.bottom && Element1.bottom > Element2.top) return true;
	else return false;
}



	//Variables
	var gamePaused = true;
	var soundActif = true;
	var cp_stars = 0;
	var cp_fuel = 10;
	var timer = 0;
	var listParachute = [];
	var listBird = [];
	var listStar = [];
	var bgMusic = document.createElement('audio');
	bgMusic.src = './sound/background.mp3';
	bgMusic.style.display = 'none';
	document.body.appendChild(bgMusic);


	//Start Game
	$('#content').hide();
	$('#gameover').hide();
	$('#btn_startGame').click(function(){
		$('.startGame').hide('slow');
		$('#content').show('slow');
		gamePaused = false;
		bgMusic.play();
		airPlaneControl();
		generateStars();
		generateBirds();
	});

	//Control Play/Pause
	$('.pause').click(function(){
		if (!gamePaused) {
			gamePaused = true;
			document.getElementById('pause').src = './img/play.png';
		}
		else{
			gamePaused = false;
			document.getElementById('pause').src = './img/pause.png';
		}
	});

	//Control Sound
	$('.volume').click(function(){
		if (soundActif) {
			document.getElementById('volume').src = './img/mute.png';
			bgMusic.pause();
			soundActif = false;
		}
		else{
			document.getElementById('volume').src = './img/volume.png';
			bgMusic.play();
			soundActif = true;
		}	
	});
	var cp_font = 32;
	$('.font').click(function(){
		cp_font +=1;
		if (cp_font == 35) cp_font = 32;
		$('#gmov').css('font-size',(cp_font - 0.5)+'px');
		$('#stars').css('font-size',cp_font+'px');
		$('#fuel').css('font-size',cp_font+'px');
		$('#timer').css('font-size',cp_font+'px');
	});

	x=0;
	y=0;
	z=0;
	function animateClouds(){
		if (!gamePaused) {
			x--;
			y-=1.2;
			z-=0.8;
			$('#clouds1').css('background-position',x+'px 0');
			$('#clouds2').css('background-position',y+'px 0');
			$('#clouds3').css('background-position',z+'px 0');
		}
		
	}
	var ac = setInterval(animateClouds,10);

	r=0;
	function rotateFrfara(){
		if (!gamePaused) {
			r+=4;
			document.getElementById('frfara').style.transform = 'rotateX('+r+'deg)';
		}
	}
	var rf = setInterval(rotateFrfara,10);


function stars_fuel()
{
	if(!gamePaused)
	{
		cp_fuel -= 1;
		if (cp_fuel<0) {
			cp_fuel = 0;
			gameOver();
		}
		if (cp_fuel<10) createParachut();	

		$("#stars").html(cp_stars);
		$("#fuel").html(cp_fuel);	
	}
}
var sf = setInterval(stars_fuel,1000);


	function checkStarsCollision(obj){
	
		var csc = setInterval(function() {

		var collisions = collision($("#airplane"),obj);
		
		if(collisions){
			obj.remove();
			cp_stars++;
			document.getElementById('take_star').play();
		}
		
		}, 1);
		
	}
	function checkBirdsCollision(obj){
	
		var cbc = setInterval(function() {

		var collisions = collision($("#airplane"),obj);
		
		if(collisions){
			document.getElementById('hit').play();
			gameOver();
		}
		
		}, 1);
		
	}
	function checkParachutCollision(obj){
	
		var cpc = setInterval(function() {

		var collisions = collision($("#airplane"),obj);
		
		if(collisions){
			obj.remove();
			cp_fuel+=10;
		}
		
		}, 1);
		
	}

var genpara = null;
function generateParachut()
{
	createParachut();
	genpara = setInterval(createParachut, Math.floor(Math.random() * 3000) + 5000);
}

	function createParachut(){
		var rdm = Math.floor(Math.random()*25)+ 25;
		listParachute.push($('<img class="parachut" src="./img/parachute.png" width="'+rdm+'px">'));
		var posPara = listParachute.length - 1;
		if (rdm>40) listParachute[posPara].css('z-index','5');
		listParachute[posPara].css({right: (Math.floor(Math.random() * (800))), top: 0});
		movePara(listParachute[posPara]);
		listParachute[posPara].appendTo('#content');
	}


	function movePara(parachut){

		var parachutPosition = 0;
		setInterval(function(){
			
			if(!gamePaused)
			{
				parachutPosition += 1;
				parachut.css('top', parachutPosition + 'px');
			}
			if (parachutPosition > 705) {
				parachut.remove();
			}
	   		}, 15);
		checkParachutCollision(parachut)
	}

	var genestar = null;
	function generateStars(){
		genestar = setInterval(function(){
			listStar.push($('<img class="stars" src="./img/star.png" width="25px">'));
			var posStar = listStar.length - 1;
			listStar[posStar].css({right: (Math.floor(Math.random()*(800) )), top:0});
			moveStar(listStar[posStar]);
			listStar[posStar].appendTo('#content');
		},Math.floor(Math.random()* 3000) + 5000)
		
	}

	function moveStar(star){
		var cp_star = 0;
		
		setInterval(function(){
			if (!gamePaused) {
				cp_star++;
				star.css('top', cp_star + 'px');
			}
			if (cp_star > 705) {
				star.remove();
			}
		}
		,10);
		checkStarsCollision(star);
	}

	var genebird = null;
	function generateBirds(){
		TBird = ['A','B','C','D'];

		genebird = setInterval(function(){
			var rdm = Math.floor(Math.random()*25)+ 25;
			listBird.push($('<img class="birds" src="" width="'+rdm+'px">'));
			var posBird = listBird.length - 1;
			if (rdm>40) listBird[posBird].css('z-index','5');
			listBird[posBird].css({'right': 0 , 'top' : (Math.floor(Math.random()*(500) + 110))});
			var selectedBird = TBird[Math.floor(Math.random()*TBird.length)];
			birdFrame(listBird[posBird],selectedBird);
			listBird[posBird].appendTo('#content');
		},Math.floor(Math.random()* 1500) + 2500)
	}

	function birdFrame(bird, selectedbird){
		var curFrame = 1;
		setInterval(function(){
			if (!gamePaused) {
				if (curFrame == 5) curFrame = 1;
				bird.attr('src', './img/birds/Bird ' + selectedbird + '/frame-'+curFrame+'.png');
				curFrame++;
			}
		},80);

		var cp_bird = 0 ;
		setInterval(function(){
			if (!gamePaused) {
				cp_bird++;
				bird.css('right',cp_bird + 'px');
				if (cp_bird > 965) {
					bird.remove();
				}
			}
		},8)
		checkBirdsCollision(bird);
	}


	function gameOver(){
		$('#content').hide('slow');
		$('#gameover').show('slow');
		$("#btn_restartGame").hide();
		bgMusic.pause();
		document.getElementById('finished').play();
		gamePaused = true;
		soundActif = false;
		clearInterval(stars_fuel);
		$("#scoreForm").show();
		$('#timePlayed').html($('#timer'));
		$('#scoreTable table tbody').html('');
	}

	function airPlaneControl(){
	
	if(!gamePaused)
	{
	
		var pane = $('#aircraft'),
			box = $('#airplane,#frfara'),
			w = pane.width() - box.width(),
			d = {},
			x = 3;

		function newv(v,a,b) { //?
			var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
			return n < 0 ? 0 : n > w ? w : n;//?
		}

		$(window).keydown(function(e) { 
		
		if([37,38,39,40].indexOf(e.keyCode) > -1){ //?
			e.preventDefault();
		}
		
		d[e.which] = true; 
		
		if([38,40].indexOf(e.keyCode) > -1 && !d[37])
			d[39] = true;
		
		});
		$(window).keyup(function(e) { 
		
		if([37,38,39,40].indexOf(e.keyCode) > -1){
			e.preventDefault();
		}
		
		d[e.which] = false; 
		
		if([38,40].indexOf(e.keyCode) > -1 && !d[37])
			d[39] = false;
		});

		var key = setInterval(function() {
			
			if(!gamePaused)
			{
				box.css({
					left: function(i,v) { return newv(v, 37, 39); },
					top: function(i,v) { return newv(v, 38, 40); }
				});
				if (box.position().top >= 705){
					box.css({
						left: function(i,v) { return newv(v, 37, 39); },
						top: '705px'
					});
				} 
					
			}
		}, 10);
	}

	
}

	function Timer()
	{	
		if(!gamePaused){
			++timer;
			$("#timer").html(editTimer(parseInt(timer/60)) + ":" + editTimer(timer%60));
		}
		}

		function editTimer(x){
			var val = x + "";
			if (val.length < 2) return "0" + val;
			else return val;
		}
		var ti = setInterval(Timer,1000);


		$('#btn_restartGame').click(function(){
		$('#gameover').hide('slow');
		$('#content').show('slow');
		gamePaused = false;
		bgMusic.play();
		timer = 0;
		listBird = [];
		listStar = [];
		listParachute = [];
		cp_fuel = 10;
		cp_stars = 0;
		$('.birds,.stars,.parachut').remove();
		$('#airplane').css({'left':0,'top':300});
		$('#frfara').css({'left':130,'top':300});
	});

$("#scoreForm").hide();
 $("#scoreTable").hide();


$("input[name='name']").keyup(function() {
		
		var name = $(this).val();

			if(name == '')
				
				$("#saveScore").attr("disabled", '1');
			
			else
				
				$("#saveScore").removeAttr("disabled");
			
		
		
	});

$("#saveScore").click(function() {
	$('#gameover').css('background','url("./img/bg-gameover2.png")');
	if( $("input[name='name']").val() != '' )
	{
		
		$.post( "./register.php", { name: $("input[name='name']").val(), timer: timer,stars: cp_stars }).done(function( data ) {
			
			var jsonData = JSON.parse(data);

			var tr;
			for (var i = 0; i < jsonData.length; i++) {
				tr = $('<tr/>');
				tr.append("<td>" + jsonData[i].id + "</td>");
				tr.append("<td>" + jsonData[i].name + "</td>");					
				tr.append("<td>" + jsonData[i].stars + "</td>");
				tr.append("<td>" + ( editTimer(parseInt(jsonData[i].time/60)) + ":" + editTimer(jsonData[i].time%60)) + "</td>");
				$('#scoreTable table tbody').append(tr);
			}
			
		  });
		  
		  $("#scoreTable").show("fast");
		  $("#btn_restartGame").show('fast');
		  $("#scoreForm").hide("fast");
		  $('#timePlayed').hide();

		
		
	}
});

});