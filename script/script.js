document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const closeModal = document.getElementById('closeModal');
  const questionTitle = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const imgPath = './image/burger.png';
  const burgName = 'Стандарт';

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    closeModal.addEventListener('click', () => {
      modalBlock.classList.remove('d-block');
    });
    playTest();
  });

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
});