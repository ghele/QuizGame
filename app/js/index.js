 $("#login-button").click(function(event) {
		event.preventDefault();

    var var_username = document.getElementById('form_username_login').value;
    var var_password = document.getElementById('form_password_login').value;
    
    //var found = Boolean;
    // var user_list = [];
    // var password_list = [];

    //   ref.once("value", function(snapshot) {
    //     // The callback function will get called twice, once for "fred" and once for "barney"
    //     snapshot.forEach(function(childSnapshot) {
    //       // key will be "fred" the first time and "barney" the second time
    //       var key = childSnapshot.key().split("-")[1];
    //       // childData will be the actual contents of the child
    //       var childDataPassword = childSnapshot.val().password;
    //       //console.log(typeof(key));
    //       //console.log(childData);
    //       user_list.push(key);
    //       password_list.push(childDataPassword);
    //       // console.log(user_list);
    //     });
    // console.log(user_list);
    // // console.log(var_username);
    //
    // console.log(password_list);

    // var username_found = $.inArray(var_username, user_list) > -1
    // var password_found = $.inArray(var_username, user_list) > -1
    //
    // var username_index = $.inArray(var_username, user_list)
    // var password_index = $.inArray(var_password, password_list)
    //
    // console.log(username_found);
    // console.log(password_found);
    // console.log(username_index);
    // console.log(password_index);


    var rootRef = new Firebase("https://quiz1-app.firebaseIO.com/");
    rootRef.once("value", function(snapshot) {
      var username_found = snapshot.child("user-" + var_username).hasChildren();
      var password_found = snapshot.child("user-" + var_username + "/password").val();
      console.log(username_found);
      console.log(password_found);

      if(var_username.length === 0 || var_password.length === 0) {
          console.log("Please fill in the both the username and password fields!");
          $("form").append("<p class = 'comments'>Please fill in both the username and password fields!</p>");
      }

      if(username_found === true && password_found === var_password) {
          console.log("Welcome existing user");
          //$("form").append("<p class = 'comments'>Welcome " + var_username + "!</p>");
          $(".container").append("<h1>Welcome " + var_username +"!</h1>");
          localStorage.setItem("username", var_username);
          $("form").fadeOut(2000);
          $(".wrapper").addClass("form-success");
          setTimeout("window.location.href = '../Web/html/first_page_html.html'", 2000);
      }

      if(username_found === true && password_found !== var_password && var_password.length > 0 ) {
          console.log("If you already have an account, then probably you inserted your pass incorrectly. If you are a new user, then choose another username or enter a longer password");
          $("form").append("<p class = 'long-comments'>If you cannot progress to the tests, it can be because of different reasons: <p class = 'child-comments'>The password you entered is wrong!</p><p class = 'child-comments'>The username already exists.</p></p>" );
      }

      if (var_username.length !== 0 && var_password.length !== 0 && var_password.length < 7 && username_found === false) {
        console.log("New user, please enter a longer password!");
        $("form").append("<p class = 'comments'>Password is too short!</p>");
      }

      if (var_username.length !== 0 && var_password.length !== 0 && var_password.length > 6 && username_found === false) {
        console.log("Welcome new user!");
        //$( "form" ).append("<p class = 'comments'>Welcome " + var_username +"!</p>");
        $(".container").append("<h1>Welcome " + var_username +"!</h1>");
        localStorage.setItem("username", var_username);
        $("form").fadeOut(2000);
        $(".wrapper").addClass("form-success");
        setTimeout("window.location.href = '../Web/html/first_page_html.html'", 2000);
        var myDataRef = new Firebase('https://quiz1-app.firebaseIO.com/user-' + var_username);
        myDataRef.set({
         username: var_username,
         password: var_password
        });

      }
    });
});


		 // var myDataRef = new Firebase('https://quiz1-app.firebaseIO.com/user-' + var_username);


   //  myDataRef.set({
   //    username: var_username,
   //    password: 'awrv'
   //  });

// myDataRef.on("value", function(snapshot) {
//   console.log(snapshot.key().username);
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });


// var myDataRef = new Firebase('https://quiz1-app.firebaseIO.com/');
      // var childRef = myDataRef.child('username');

		  //    childRef.push({


    //   score: "9",
    //   test: 'Go'
    // });

  // Retrieve new posts as they are added to our database
// var myDataRef = new Firebase('https://quiz1-app.firebaseIO.com/user-' + var_username);
  // var myDataRef = new Firebase('https://quiz1-app.firebaseIO.com/');
// childRef.on("child_added", function(snapshot) {
//   var newPost = snapshot.val();   pentru retrieve score
//   console.log(newPost.score);
// });


     // daca lungime username sau password este 0, atunci "Make sure you complete both username and password fields"
     //      if(var_username.length === 0 || var_password.length === 0) {
     //    console.log('werbvrbvg');
     // }

     // daca username exista, atunci "Please choose another username. This already exists."

     // altfel, se executa un insert in tabela si acest cod





	 // $("form").fadeOut(500);
	 // $(".wrapper").addClass("form-success");
	 //$(location).attr('href','first_page_html.html');
	 //setTimeout("window.location.href = '../first_page_html.html';", 2000);
