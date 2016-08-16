/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md-close' );
				scores = modal.querySelector('#see_scores');

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md-show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md-setperspective' ) );
			}

			el.addEventListener( 'click', function( ev ) {
				classie.add( modal, 'md-show' );
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

				if( classie.has( el, 'md-setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}
			});

			close.addEventListener( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
				var test_name = window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split(".")[0];
				console.log(test_name);
				console.log('erg');
        		console.log(localStorage.getItem("username"));
				var date = new Date();
				var strDate = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        		var trueScore = localStorage.getItem("correct_answers");
        		var userScore = document.getElementById("score").value

		        if (userScore !== trueScore) {
        		  console.log("Please enter the correct score!");
       	 		}
        		else {
				  var myDataRef = new Firebase('https://quiz1-app.firebaseIO.com/user-' + localStorage.getItem("username"));
				  var childRef = myDataRef.child('username');
  	      		  childRef.push({
				      score: userScore,
              		  test: test_name,
					  submit_date: strDate
				    });
                }
			});

			scores.addEventListener( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
				//Retrieve new posts as they are added to our database
			    var myDataRef = new Firebase('https://quiz1-app.firebaseIO.com/user-' + localStorage.getItem("username"));
				var childRef = myDataRef.child('username');
				$("#hide_scores").show();
				$("p#questionp").append("<div class = 'table-header' style = 'font-size: 24px; margin-top: 60px; margin-bottom: 20px;'><tr><td>Username&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Submit date&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Test&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Score&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></div>");
			    childRef.on("child_added", function(snapshot) {
			    	var newPost = snapshot.val();   //pentru retrieve score
	                $("p#questionp").append("<div class = 'table-content' style = 'font-size: 22px;'><tr><td>" + localStorage.getItem("username") + "&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + newPost.submit_date + "&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + newPost.test + "&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + newPost.score + "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></div>");
			    	console.log(newPost.test);
					console.log(newPost.score);
					console.log(newPost.submit_date);				
			    });
		 });
	});
	}

	init();

})();
