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
  var time = 30; // tempo inicial em segundos
  var timerDisplay = document.createElement('div');
  quizContainer.parentNode.insertBefore(timerDisplay, quizContainer);
  var intervalId;
  var questionIndex = 0; // Índice para acompanhar as questões

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  function startQuiz() {
      shuffleArray(questions); // Embaralha as questões
      questionIndex = 0;
      showQuestion(questionIndex);
      startButton.style.display = 'none';
      quizContainer.style.display = 'block';
      resetTimer(time); // Passa o tempo inicial ao resetar
  }

  function resetTimer(initialTime) {
      clearInterval(intervalId); // Para o timer existente
      time = initialTime;
      timerDisplay.textContent = `Tempo: ${time} segundos`;
      intervalId = setInterval(function() {
          time--;
          timerDisplay.textContent = `Tempo: ${time} segundos`;
          if (time <= 0) {
              clearInterval(intervalId); // Para o timer
              alert("Tempo esgotado!");
              resetTimer(time); // Reinicia o timer, mas mantém o progresso do quiz
              showQuestion(questionIndex); // Mostra a mesma questão novamente ao esgotar o tempo
          }
      }, 1000);
  }

  // Função que verifica se a escolha está correta comparando com a pergunta
  function checkAnswer(question, choice) {
      return question === choice; // Verifica se a escolha é a mesma que a pergunta
  }

  function showQuestion(index) {
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
              if (checkAnswer(question.question, choice)) {
                  alert("Resposta correta!");
                  if (questionIndex < questions.length - 1) {
                      questionIndex++;
                      resetTimer(time); // Reinicia o timer ao acertar
                      showQuestion(questionIndex); // Avança para a próxima pergunta
                  } else {
                      clearInterval(intervalId); // Para o timer após completar todas as perguntas
                      alert("Parabéns! Você completou o quiz!");
                      startButton.style.display = 'block'; // Mostra botão iniciar novamente
                      quizContainer.style.display = 'none'; // Oculta o quiz ao terminar
                  }
              } else {
                  alert("Resposta errada.");
                  resetTimer(time); // Reinicia o timer ao errar
                  showQuestion(questionIndex); // Mostra a mesma pergunta novamente
              }
          };
          li.appendChild(button);
          ul.appendChild(li);
      });
      quizContainer.appendChild(ul);
  }

  startButton.addEventListener('click', startQuiz);
});
