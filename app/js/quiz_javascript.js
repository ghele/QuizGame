(function() {


  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem("correct_answers");
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#log_out').hide();
    $('#hide_scores').hide();
    $('#start').hide();
    $('#first_page').hide();
    $('#registration').hide();
    $('#questionp').remove();
  });

  $('#first_page').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem("correct_answers");
    window.location.href='../html/first_page_html.html';
  });

  // Click handler for the 'prev' button
  // $('#other_scores').on('click', function (e) {

  //   console.log(test_name);
  //   var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
  //   db.transaction(function (tx) {
  //     tx.executeSql('SELECT * FROM registration', [], function (tx, results) {
  //       var len = results.rows.length, i;
  //       for (i = 0; i < len; i++) {

  //         user = "<p><b>" + results.rows.item(i).username + "</b></p>";
  //         score = "<p><b>" + results.rows.item(i).score + "</b></p>";
  //         $('.scores').append(user);
  //         $('.scores').append(score);

  //       }

  //     });
  // });
  // });

  $('#log_out').on('click', function (e) {
    //location.reload();
    localStorage.removeItem("username");
    localStorage.removeItem("correct_answers");
    });

  $('#hide_scores').on('click', function (e) {
    $("p#questionp .table-header").remove();
    $("p#questionp .table-content").remove();
    $(this).hide();
  });  
  // $('#hide_scores').on('click', function (e) {
  //     $('.scores p').remove();
  // });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  $('#registration').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('#registration').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p class = "question">').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<label for =  ' + i + '> <input type = "radio" name = "answer" id = ' + i + ' value=' + i + ' style = "visibility: hidden"/> ';
      input += questions[index].choices[i] + '</label>';
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#log_out').hide();
          $('#hide_scores').hide();
          $('#prev').show();
          $('#first_page').hide();
          $('#registration').hide();
        } else if(questionCounter === 0){

          $('#log_out').hide();
          $('#hide_scores').hide();
          $('#prev').hide();
          $('#next').show();
          $('#first_page').hide();
          $('#registration').hide();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
        $('#first_page').show();
        $('#log_out').show();
        $('#hide_scores').hide();
        $('#registration').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed

  function displayScore() {
    var score = $('<p>',{id: 'questionp'});


    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('<br><br>You answered ' + numCorrect + ' question(s) out of ' +
                 questions.length + ' right.');

    localStorage.setItem('correct_answers', numCorrect);

    if (numCorrect < 6) {
      score.append("<br><br>Back to coding!");
    }
    else if (numCorrect > 8) {
      score.append("<br><br>Nice work! Congratulations!");
    }
    else {
      score.append("<br><br>Don't give up! You've got the sense of it!");
    }

    return score;
  }
})();
