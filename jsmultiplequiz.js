document.addEventListener('DOMContentLoaded', function() {
    var questions = [
      { question: "casa", choices: ["caza", "casá", "cassa", "casa"]},
      { question: "bola", choices: ["bolla", "boal", "bolla", "bola"]},
      { question: "gato", choices: ["cato", "gatho", "gate", "gatu", "gato"]},
      { question: "pato", choices: ["pado", "patto", "bato", "peta", "pato"]},
      { question: "mesa", choices: ["mesah", "meza", "mesa", "meta", "mesá"]},
      { question: "flor", choices: ["flôr", "floor", "flor", "flur", "folr"]},
      { question: "rato", choices: ["ratoo", "ratu", "rato", "rato"]},
      { question: "lima", choices: ["lma", "limá", "lima", "lima"]},
      { question: "teto", choices: ["tito", "teta", "tito", "teto"]},
      { question: "mar", choices: ["mur", "mahr", "marr", "mar"]},
      { question: "sol", choices: ["solh", "sol", "soll", "sal", "soh"]},
      { question: "lua", choices: ["luah", "loua", "lua", "luá"]},
      { question: "pé", choices: ["pê", "peh", "pé", "pa", "péh"]},
      { question: "céu", choices: ["cêu", "seu", "ceh", "céu"]},
      { question: "doce", choices: ["dosse", "doce", "dose", "doze", "duce"]},
      { question: "mão", choices: ["mam", "mão", "meão", "mòa", "mãoh"]},
      { question: "som", choices: ["são", "som", "sou", "somh"]},
      { question: "luz", choices: ["lus", "luz", "lús", "loz", "lux"]},
      { question: "chá", choices: ["sha", "chá", "chah", "cha", "cháh"]},
      { question: "mel", choices: ["mil", "mel", "melh", "mal", "mehl"]},
      { question: "rio", choices: ["riu", "rio", "ryu", "ryo", "rioh"]},
      { question: "pó", choices: ["pu", "pã", "póh", "pó", "po"]},
      { question: "mil", choices: ["mel", "milh", "mil", "mehl"]},
      { question: "rei", choices: ["rai", "rey", "rhei", "rei"]},
      { question: "pai", choices: ["pai", "pae", "pae", "pay", "pah"]},
      { question: "dia", choices: ["diya", "díah", "dia", "dya", "deah"]},
      { question: "lã", choices: ["la", "laah", "lãh", "laà", "lã"]},
      { question: "voz", choices: ["vos", "vosz", "vós", "voz", "vaz"]}
    ];
  
    var quizContainer = document.getElementById('quiz');
    var startButton = document.getElementById('start');
    var questionIndex = 0; 
    var score = 0; 
    var timer;
    var timeLimit = 10;
  
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
  
    function startQuiz() {
        shuffleArray(questions); 
        questionIndex = 0;
        score = 0;
        showQuestion(questionIndex);
        startButton.style.display = 'none';
        quizContainer.style.display = 'block';
    }
  
    function checkAnswer(question, choice) {
        return question === choice;
    }
  
    function showQuestion(index) {
        if (index >= questions.length) {
            endQuiz();
            return;
        }
  
        quizContainer.innerHTML = '';
        var question = questions[index];
        var questionElem = document.createElement('h2');
        questionElem.textContent = question.question;
        quizContainer.appendChild(questionElem);
  
        var ul = document.createElement('ul');
        question.choices.forEach(function(choice) {
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.textContent = choice;
            button.onclick = function() {
                clearInterval(timer);
                if (checkAnswer(question.question, choice)) {
                    displayFeedback('correto');
                    score++; 
                } else {
                    displayFeedback('errado');
                }
                setTimeout(function() {
                    questionIndex++;
                    showQuestion(questionIndex); 
                }, 1000);
            };
            li.appendChild(button);
            ul.appendChild(li);
        });
        quizContainer.appendChild(ul);
        
        startTimer(); 
    }
  
    function startTimer() {
        var timeLeft = timeLimit;
        var timerDisplay = document.createElement('div');
        timerDisplay.id = 'timer';
        quizContainer.appendChild(timerDisplay);
        timer = setInterval(function() {
            timeLeft--;
            timerDisplay.textContent = `Tempo restante: ${timeLeft} segundos`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                displayFeedback('errado');
                setTimeout(function() {
                    questionIndex++;
                    showQuestion(questionIndex); 
                }, 1000);
            }
        }, 1000);
    }
  
    function displayFeedback(result) {
        var feedbackImage = document.createElement('img');
        if (result === 'correto') {
            feedbackImage.src = './assets/4f6bbec9-c076-40ec-bba0-3e22dcec0a3a.jpeg'; 
        } else {
            feedbackImage.src = './assets/d8b7ceb0-1d0f-4795-aa94-f24624e78eb6.jpeg'; 
        }
        feedbackImage.alt = result;
        quizContainer.innerHTML = '';
        quizContainer.appendChild(feedbackImage);
    }
  
    function endQuiz() {
        quizContainer.innerHTML = `<h2>Quiz finalizado!</h2><p>Você acertou ${score} de ${questions.length} perguntas.</p>`;
        startButton.style.display = 'block'; 
    }
  
    startButton.addEventListener('click', startQuiz);
  });
  
