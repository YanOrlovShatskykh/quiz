document.addEventListener('DOMContentLoaded', () => {
  'use strict';

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
  const sendBtn = document.querySelector('#send');
  const modalTitle = document.querySelector('.modal-title');

  let clientWidth = document.documentElement.clientWidth;
  let count = -100;

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBe4VE1LCXDfXXLpncZ4QM5PGwqlCBxV0Y",
    authDomain: "testburger-6ba96.firebaseapp.com",
    databaseURL: "https://testburger-6ba96.firebaseio.com",
    projectId: "testburger-6ba96",
    storageBucket: "testburger-6ba96.appspot.com",
    messagingSenderId: "389660030922",
    appId: "1:389660030922:web:cb592e8cf6ac9a5eea0133",
    measurementId: "G-T67QG9J1S5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const getData = () => {
    formAnswers.textContent = 'LOAD';
    firebase.database().ref().child('questions').once('value')
      .then(snap => playTest(snap.val()));
  };

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
    getData();
  };

  const playTest = (questions) => {
    const finalAnswers = [];
    const obj = {};
    let numberQuestion = 0;
    const renderAnswers = (index) => {  
      questions[index].answers.forEach(answer => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center'); 
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
      `;
      formAnswers.append(answerItem);
      });      
    };    

    const renderQuestions = (indexQuestion) => {
      modalTitle.textContent = 'Ответьте на вопрос:';
      formAnswers.innerHTML = '';

      switch(true) {
        case(numberQuestion >= 0 && numberQuestion <= questions.length - 1):
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);
          prevBtn.classList.remove('d-none');
          nextBtn.classList.remove('d-none');
          sendBtn.classList.add('d-none');
          break;
        case(numberQuestion === 0):
          prevBtn.style.display = 'none';
          break;
        case(numberQuestion === questions.length):
          questionTitle.textContent = '';
          modalTitle.textContent = '';
          nextBtn.classList.add('d-none');
          prevBtn.classList.add('d-none');
          sendBtn.classList.remove('d-none');
          formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Enter your phone</label>
            <input type="tel" class="form-control" id="numberPhone">
          </div>
          `;
          const numberPhone = document.getElementById('numberPhone');
          numberPhone.addEventListener('input', event => {
            event.target.value = event.target.value.replace(/[^0-9+-]/, '');
          });  
          break;
        case(numberQuestion === questions.length + 1):
          formAnswers.textContent = 'Спасибо за пройденный тест!';
          sendBtn.classList.add('d-none');
          for(let key in obj) {
            let newObj = {};
            newObj[key] = obj[key];
            finalAnswers.push(newObj);
          }
          setTimeout(() => {
            modalBlock.classList.remove('d-block');
          }, 2000);
      }
    };
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
      inputs.forEach((input, index) => {

        if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }

        if(numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value;
        }
      });
    };

    nextBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };

    prevBtn.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    sendBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      firebase.database().ref().child('contacts').push(finalAnswers)
    };
  };

  btnOpenModal.addEventListener('click', openModal);

  burgerBtn.addEventListener('click', openModal);

  modalWrap.addEventListener('click', closeModal);

































});
