document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const questions = [
    {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Дополнительные ингредиенты?",
        answers: [
            {
                title: 'Помидор',
                url: './image/tomato.png'
            },
            {
                title: 'Огурец',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Лук',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Добавить соус?",
        answers: [
            {
                title: 'Чесночный',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатный',
                url: './image/sauce2.png'
            },
            {
                title: 'Горчичный',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
];

  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const modalWrap = document.querySelector('.modal');
  const closeModal = document.getElementById('closeModal');
  const questionTitle = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const burgerBtn = document.getElementById('burger');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const modalDialog = document.querySelector('.modal-dialog');

  let clientWidth = document.documentElement.clientWidth;
  let count = -100;

  modalDialog.style.top = count + '%';

  const animateModal = () => {
    modalDialog.style.top = count + '%';
    count += 3;

    if(count < 0) {
      requestAnimationFrame(animateModal); 
    } else {
      count = -100;
    }
  };

  // check clientWidth
  if(clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }

  // listen resize
  window.addEventListener('resize', () => {
    clientWidth = document.documentElement.clientWidth;

    if(clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  const modalClose = () => {    
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
    closeModal.removeEventListener('click', modalClose);   
  };

  const modalClassCheck = event => {
    const target = event.target;
        
    if(!target.closest('.modal-dialog') &&
      !target.closest('.burger') &&
      !target.closest('#btnOpenModal')) {
      modalClose();
      document.removeEventListener('click', modalClassCheck);  
    }
    closeModal.addEventListener('click', modalClose);    
  };
  
  const openModal = () => {
    requestAnimationFrame(animateModal);
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    document.addEventListener('click', modalClassCheck);
    playTest();
  };

  const playTest = () => {
    let numberQuestion = 0;
    const renderAnswers = (index) => {  
      questions[index].answers.forEach(answer => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'flex-column'); 
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
      `;
      formAnswers.append(answerItem);
      });      
    };    

    const renderQuestions = (indexQuestion) => {
      // check buttons
      !numberQuestion ? prevBtn.style.display = 'none' : prevBtn.style.display = 'inline-block';
      numberQuestion === questions.length - 1 ? nextBtn.style.display = 'none' : nextBtn.style.display = 'inline-block';
      
      //clear form
      formAnswers.innerHTML = '';
      questionTitle.textContent = `${questions[indexQuestion].question}`;
      renderAnswers(indexQuestion);
    };
    renderQuestions(numberQuestion);

    prevBtn.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    nextBtn.onclick = () => {
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
  };

  btnOpenModal.addEventListener('click', openModal);

  burgerBtn.addEventListener('click', openModal);

  modalWrap.addEventListener('click', closeModal);

































});
