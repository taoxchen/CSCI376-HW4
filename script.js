// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "When was Williams College founded?",
      answers: [
        { text: "1790", correct: false },
        { text: "1791", correct: false },
        { text: "1792", correct: false },
        { text: "1793", correct: true }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // We know what id to search for when using document.getElementById() because it references to the html file, in this case, the index.html, and searches for elements, like <div id="question">, <div id="answer-buttons">, and <button id="next-btn">, that have unique identifiers. These same IDs are referenced in the JavaScript file using document.getElementById("id-name") to access and manipulate the elements during the quiz. 
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn"); 
  
  let hintUsed = false; 
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    hintUsed =  false; 
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // The answer button are made with JS because each question has different answers, and this lets the quiz update automatically without needing to change the HTML every time. 
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // This line adds the new answer button to the screen by putting it inside the answer-buttons container. Without it, the button wouldn’t show up.
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    hintButton.style.display = "inline-block";
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // The "Next" button is hidden at first, and after an answer is picked, the code shows the buttton to the user can go to the next question. If we didn't show it, the user can't continue. 
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // When the "Next" button is clicked, the code checks if there are more questions. If there are, it shows the next one, and if not, it restarts the quiz.

  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }

  });

  hintButton.addEventListener("click", () => {
    if (hintUsed) return;
  
    const buttons = Array.from(answerButtonsElement.querySelectorAll("button"));
    const wrongButtons = buttons.filter(btn => btn.dataset.correct !== "true" && !btn.classList.contains("wrong"));
  
    if (wrongButtons.length > 0) {
      const randomIndex = Math.floor(Math.random() * wrongButtons.length);
      wrongButtons[randomIndex].classList.add("wrong");
      hintUsed = true;
    }
  });
  
  startQuiz();
  