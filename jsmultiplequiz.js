(function() {
  var questions = [
    {
      question: "Escolha a palavra correta para: casa",
      choices: ["caza", "casá", "cassa", "casa"],
      correctAnswer: 3
    },
    {
      question: "Escolha a palavra correta para: escola",
      choices: ["escola", "escolha", "escóla", "escolar"],
      correctAnswer: 0
    },
    {
      question: "Escolha a palavra correta para: exemplo",
      choices: ["ezemplo", "ecsamplo", "exemplo", "essamplo"],
      correctAnswer: 2
    },
    {
      question: "Escolha a palavra correta para: diferente",
      choices: ["diferrente", "diferente", "defirente", "diferênte"],
      correctAnswer: 1
    },
    {
      question: "Escolha a palavra correta para: necessário",
      choices: ["nescessário", "necessário", "necesário", "necesario"],
      correctAnswer: 1
    }
  ];

  var questionCounter = 0; // Segue número de questões
  var selections = []; // Respostas do usuário Array
  var quiz = $('#quiz'); // Div da quiz

  // Mostra questão inicial
  displayNext();

  // Click handler para botão "próxima"
  $('#next').on('click', function(e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler para o botão 'voltar'
  $('#prev').on('click', function(e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler para o botão 'iniciar'
  $('#start').on('click', function(e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }

  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  function displayScore() {
    var score = $('<p>',{id: 'question'});
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    score.append('Você acertou ' + numCorrect + ' de ' + questions.length + ' questões!');
    return score;
  }
})();
