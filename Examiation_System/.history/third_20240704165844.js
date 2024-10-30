// At the beginning of your script, add:
$(".questions-container").animate(
  {
    top: "0"
  },
  1500
);
$("#hiddenSubmit").animate(
  {
    top: "55%"
  },
  2000
);
$(".previous").animate(
  {
    top: "0"
  },
  2000
);
$(".next").animate(
  {
    top: "0"
  },
  2000
);
$(".mark").animate(
  {
    left: "0"
  },
  2000
);
$("#questionNumber").animate(
  {
    opacity: "1"
  },
  3000
);
$("#timer").animate(
  {
    opacity: "1"
  },
  3000
);
var idx = 0;
var isAllSelected = false;
//Timer
var distance = 60*60; // tTime in milliseconds
var x = setInterval(function() {
  distance -= 1000;
  var hours = Math.floor(distance % (1000 * 60 * 60 * 60) / (1000 * 60 * 60));
  var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(distance % (1000 * 60) / 1000);

  document.getElementById("timer").textContent =
    hours + " hours " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    handleTimerEnd(); // Call a function to handle what should happen when the timer ends
  }
}, 1000);

function handleTimerEnd() {
  // Here, you can perform actions when the timer reaches zero
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].selectedAnswer === questions[i].rightAnswer) {
      totalResult += 10;
    }
  }
  // You may want to display the result or perform other actions
  localStorage.setItem("totalResult", totalResult);
  var redirectURL = "timeOut.html";
  // Replace the current history entry with a new one (prevent going back)
  window.history.replaceState({}, document.title, redirectURL);
  // Redirect to the specified URL
  window.location.href = redirectURL;
}

function Question(questionText, answers, rightAns) {
  this.questionText = questionText; // question head
  this.answers = answers || []; // the array which i push the answer in it
  this.selectedAnswer = ""; // the container which i store the value of the question's answer in it
  this.rightAnswer = rightAns; // the right answer
  this.marked = false; // the flag which i stop it when question is marked
}

function Answer(text, isCorrect) {
  this.text = text; // the answer text
  this.isCorrect = isCorrect; // the true && false which specify if the answer is correct or not
}

var questions = [
  new Question(
    "What is the capital of France?",
    [
      // this question is Questions.questionText after spread operator the questions
      new Answer("Berlin", false), // (Berlin) is questions[0].answers.foreach(function(answer,index){then =>answer.text}) in function constructor answer -- // (false) is original[0].answers[0].isCorrect = false
      new Answer("Madrid", false),
      new Answer("Paris", true),
      new Answer("Rome", false)
    ],
    "Paris"
  ),
  new Question(
    "Which programming language is known as the 'language of the web'?",
    [
      new Answer("Java", false),
      new Answer("Python", false),
      new Answer("JavaScript", true),
      new Answer("C++", false)
    ],
    "JavaScript"
  ),
  new Question(
    "What is the largest planet in our solar system?",
    [
      new Answer("Mars", false),
      new Answer("Jupiter", true),
      new Answer("Saturn", false),
      new Answer("Earth", false)
    ],
    "Jupiter"
  ),
  new Question(
    "Who wrote 'Romeo and Juliet'?",
    [
      new Answer("Charles Dickens", false),
      new Answer("William Shakespeare", true),
      new Answer("Jane Austen", false),
      new Answer("Mark Twain", false)
    ],
    "William Shakespeare"
  ),
  new Question(
    "Which country is known as the 'Land of the Rising Sun'?",
    [
      new Answer("China", false),
      new Answer("Japan", true),
      new Answer("India", false),
      new Answer("South Korea", false)
    ],
    "Japan"
  ),
  new Question(
    "What is the capital of Australia?",
    [
      new Answer("Sydney", false),
      new Answer("Canberra", true),
      new Answer("Melbourne", false),
      new Answer("Brisbane", false)
    ],
    "Canberra"
  ),
  new Question(
    "What is the square root of 64?",
    [
      new Answer("6", false),
      new Answer("8", true),
      new Answer("10", false),
      new Answer("12", false)
    ],
    "8"
  ),
  new Question(
    "Which ocean is the largest?",
    [
      new Answer("Atlantic Ocean", false),
      new Answer("Southern Ocean", false),
      new Answer("Arctic Ocean", false),
      new Answer("Pacific Ocean", true)
    ],
    "Pacific Ocean"
  ),
  new Question(
    "Who invented the telephone?",
    [
      new Answer("Thomas Edison", false),
      new Answer("Alexander Graham Bell", true),
      new Answer("Nikola Tesla", false),
      new Answer("Marie Curie", false)
    ],
    "Alexander Graham Bell"
  ),
  new Question(
    "What is the capital of Brazil?",
    [
      new Answer("Sao Paulo", false),
      new Answer("Rio de Janeiro", false),
      new Answer("Brasilia", true),
      new Answer("Salvador", false)
    ],
    "Brasilia"
  )
  // Add more questions as needed
];

function shuffle(array) {
  var copy = [],
    n = array.length,
    i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);

    // And move it to the new array.
    copy.push(array.splice(i, 1)[0]);
  }

  return copy;
}

questions = shuffle(questions);
questionNumber = document.getElementById("questionNumber");

function displayQuestion(question) {
  var questionsContainer = $(".questions-container");
  questionsContainer.empty();

  var questionElement = $('<div class="question"></div>').text(
    question.questionText
  );
  var answersElement = $('<form class="answers"></form>');

  question.answers.forEach(function(answer, index) {
    var answerElement = $("<label></label>").text(answer.text);
    var radioButton = $(
      '<input type="radio" name="answer" value="' + answer.text + '">'
    );

    // Check the previously selected answer or the marked answer
    if (question.selectedAnswer === answer.text) {
      radioButton.prop("checked", true);
      answerElement.addClass("choosedAns");
      answerElement.css("background-color", "#f2c029");
    }

    answerElement.prepend(radioButton);
    answersElement.append(answerElement);
  });

  // Add change event to the radio buttons for the marked question
  answersElement.on("change", 'input[name="answer"]', function() {
    var selectedAnswer = $(this).val();
    question.selectedAnswer = selectedAnswer;
  });

  questionsContainer.append(questionElement);
  questionsContainer.append(answersElement);

  questionNumber.textContent = "Question " + (idx + 1);
  progressBar();
}

function preQ() {
  if (idx > 0) {
    idx--;
  }

  displayQuestion(questions[idx]);
}

function nextQ() {
  if (idx < questions.length - 1) {
    idx++;
  }

  displayQuestion(questions[idx]);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

let progress = document.querySelector(".progress");
let counter = 0;
let next = document.getElementsByClassName("next")[0];
let previous = document.getElementsByClassName("previous")[0];

// Next button
next.addEventListener("click", () => {
  if (idx < questions.length - 1) {
    nextQ();
    previous.style.visibility = "visible";
  }

  if (idx == questions.length - 1) {
    next.style.visibility = "hidden";
  }
});
// Previous button
previous.addEventListener("click", function() {
  preQ();
  next.style.visibility = "visible";

  if (idx == 0) {
    previous.style.visibility = "hidden";
  }
});
//the total result which increase with each right value choosen
var totalResult = 0;

// when click on the radio button the change of it's value changed with the answer value and it's related to jquery language
$(".questions-container").on("change", 'input[name="answer"]', function() {
  var selectedAnswer = $(this).val();
  $(this).parent().css("background-color", "#f2c029");
  $(".choosedAns").css("background-color", "transparent");
  $(".choosedAns").removeClass("choosedAns");
  $(this).parent().addClass("choosedAns");

  /* store the selected answer value in the variable which i created 
        in the function constructor and the index to mark the question which
        i select it's answer to compare it with the right answer
        */
  questions[idx].selectedAnswer = selectedAnswer;
  /*
        for loop on the question and see if all question's answer 
        not selected make the flag false means stay disapear the submit 
        button if selected make it true and keep going  
        */
  for (var i = 0; i < questions.length; i++) {
    if (!questions[i].selectedAnswer) {
      isAllSelected = false;
      break;
    }
    isAllSelected = true;
  }
  //if all selected apear the submit button and disapear the other button
  if (isAllSelected) {
    document.getElementById("submitBtn").style.display = "inline";
    document.getElementById("hiddenSubmit").style.display = "none";
  }
});

$("#submitBtn").on("click", function(event) {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].selectedAnswer === questions[i].rightAnswer) {
      totalResult += 10;
    }
  }
  window.history.replaceState({}, document.title, "result.html");
  window.location.href = "result.html";
  localStorage.setItem("totalResult", totalResult);
});
//---------------------------------------------------------------------------------------------------------------------------------------
//Mark Section

let markButton = $(".mark");
let markedQuestionsContainer = $("#markedQuestionsContainer");

markButton.on("click", function() {
  // Mark the current question if it's not already marked
  markCurrentQuestion();
  // Display marked questions in the container
  displayMarkedQuestions();
});

function markCurrentQuestion() {
  // Check if the question is not already marked
  if (!questions[idx].marked) {
    // Mark the question as "marked" and this mark
    questions[idx].marked = true;
  }
}
function displayMarkedQuestions() {
  markedQuestionsContainer.empty();
  var markedQuestions = questions.filter(question => question.marked);

  if (markedQuestions.length > 0) {
    var markedQuestionsList = $("<ul></ul>");
    markedQuestions.forEach(function(markedQuestion, index) {
      var markedQuestionItem = $("<li></li>");
      var questionLink = $(
        '<a href="#" class="marked-question-link"></a>'
      ).text(
        "Question number " +
          Number(index + 1) +
          " :" +
          markedQuestion.questionText
      );
      var deleteQuestionButton = $(
        '<button class="deleteMarkedQuestion">Delete</button>'
      );

      questionLink.append(deleteQuestionButton);
      markedQuestionItem.append(questionLink);
      markedQuestionsList.append(markedQuestionItem);

      // Add a click event to the link
      questionLink.on("click", function(event) {
        // event.preventDefault();
        // Scroll to and display the marked question
        scrollToMarkedQuestion(markedQuestion);
      });

      deleteQuestionButton.on("click", function() {
        for (var i = 0; i < questions.length; i++) {
          if (questions[i].questionText === markedQuestion.questionText) {
            questions[i].marked = false;
            break;
          }
        }
        markedQuestionItem.remove();

        if (markedQuestionsList.children().length === 0) {
          markedQuestionsContainer.hide();
        }
      });
    });

    markedQuestionsContainer.append(
      '<p id="marked" style="margin-left:10px;margin-top:10px;">' +
        " " +
        " Marked Questions:</p>"
    );
    markedQuestionsContainer.append(markedQuestionsList);
    markedQuestionsContainer.show();
  } else {
    markedQuestionsContainer.append("<p>No marked questions.</p>");
  }
}

function scrollToMarkedQuestion(markedQuestion) {
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].questionText === markedQuestion.questionText) {
      idx = i;
      break;
    }
  }

  displayQuestion(markedQuestion);
}

function progressBar() {
  if (parseInt(progress.value) <= 100) {
    counter = (idx + 1) * 10;
    progress.value = counter;
    if (idx == questions.length - 1) {
      next.style.visibility = "hidden";
    } else {
      next.style.visibility = "visible";
    }

    if (idx == 0) {
      previous.style.visibility = "hidden";
    } else {
      previous.style.visibility = "visible";
    }
  }
}

displayQuestion(questions[idx]);
