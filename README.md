# QuizGame

The project is a application implemented that verifies the technical knowledge of a user related to two high-level programmin langugaes (Java and C#) and two scripting languages (Python and Go). At the end of the challenge the user is able to check the number of good and wrong answers. The application is implemented entirely using front end languages: JavaScript (jQuery), CSS and HTML. The user relate data is stored in an online database, called Firebase.

### Installation

The application can be started by double clicking the *index.html* file. No other library installation is needed as the project is implemented using languages that are executed in the browser. <br/>
The JavaScript library intensively used in the project, called jQuery, is downloaded from Google. <br/> 
The data related to each user logged in, is saved in Firebase that can be seen in *Figure 1*, so you can use the Firebase account from the application or your personal one (in this situation you will have to modify the Firebase endpoint used in the project) if you do not want to see the scores of the existent users from my Firebase account (the users that have already taken the tests). For the temporary storing of data also Local Storage was used.


<p align="center">
  <img src="https://github.com/ghele/QuizGame/blob/master/images/firebase.PNG" align="middle"></img>
</p>
*<p align="center">Figure 1. </p>*

### Flow

The user who is trying to take the quizes have firstly to log in to the application using *the calm breeze login screen* inspired from CodePen. 
Then, he/she will have to choose one of the four tests as in *Figure 2*: 

<p align="center">
  <img src="https://github.com/ghele/QuizGame/blob/master/images/tests.PNG" align="middle"></img>
</p>
*<p align="center">Figure 2. </p>*

Only one answer is correct, the user must make a choice, *Figure 3*, and can go back to the previous question if he changed his mind:

<p align="center">
  <img src="https://github.com/ghele/QuizGame/blob/master/images/question.PNG" align="middle"></img>
</p>
*<p align="center">Figure 3. </p>*

After he/she finshed the test, the quiz result will be provided to the user as in *Figure 4*, who will submit its score, *Figure 5*. The score obtained by a user is temporarily stored in Local Storage and it is compared with the value typed by him/her in the modal pop up (score registration/submission window), this way its fairness being checked.

<p align="center">
  <img src="https://github.com/ghele/QuizGame/blob/master/images/score.PNG" align="middle"></img>
</p>
*<p align="center">Figure 4. </p>*

<p align="center">
  <img src="https://github.com/ghele/QuizGame/blob/master/images/registration.PNG" align="middle"></img>
</p>
*<p align="center">Figure 5. </p>*

The username, submit date/time, test name and score will be stored to Firebase. Then, the user can also choose another test and see its history: the taken tests and its scores, that can be seen in *Figure 6*:

<p align="center">
  <img src="https://github.com/ghele/QuizGame/blob/master/images/history.PNG" align="middle"></img>
</p>
*<p align="center">Figure 6. </p>*

