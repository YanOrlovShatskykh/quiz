document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const modalWrap = document.querySelector('.modal');
  const closeModal = document.getElementById('closeModal');
  const questionTitle = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const imgPath = './image/burger.png';
  const burgName = 'Стандарт';
  const burgerBtn = document.getElementById('burger');

  let clientWidth = document.documentElement.clientWidth;

  if(clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }

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
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    document.addEventListener('click', modalClassCheck);
    playTest();
  };

  const playTest = () => {
    const renderQuestions = () => {
      questionTitle.innerHTML = 'Кокого цвета бургер Вы хотите?';
      formAnswers.innerHTML = `
        <div class="answers-item d-flex flex-column">
          <input type="radio" id="answerItem1" name="answer" class="d-none">
          <label for="answerItem1" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${imgPath}" alt="burger">
            <span>${burgName}</span>
          </label>
        </div>
      `;
    };
    renderQuestions();
  };

  btnOpenModal.addEventListener('click', openModal);

  burgerBtn.addEventListener('click', openModal);

  modalWrap.addEventListener('click', closeModal);



































});
