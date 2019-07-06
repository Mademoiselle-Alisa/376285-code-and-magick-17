'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var setup = document.querySelector('.setup');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var firstName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

function wizardsGenerate(wizardCount) {
  var wizards = [];
  for (var i = 1; i <= wizardCount; i++) {
    var wizardDesc = {
      name: firstName[getRandomInt(0, firstName.length)] + ' ' + secondName[getRandomInt(0, secondName.length)],
      coatColor: coatColor[getRandomInt(0, coatColor.length)],
      eyesColor: eyesColor[getRandomInt(0, eyesColor.length)]
    };

    wizards.push(wizardDesc);
  }

  return wizards;
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

function wizardsFillBlock() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

  setup.querySelector('.setup-similar').classList.remove('hidden');
}

var wizards = wizardsGenerate(4);

wizardsFillBlock();

// 1. Открытие/закрытие окна настройки персонажа:

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closePopup();
  }
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// 3. Изменение цвета мантии персонажа по нажатию. 4.Изменение цвета глаз персонажа по нажатию. 5.Изменение цвета фаерболов по нажатию.

var userWizard = setup.querySelector('.setup-wizard');

var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var userWizardFireball = setup.querySelector('.setup-fireball-wrap');

var hiddenWizardCoat = setup.querySelector('input[name=coat-color]');
var hiddenWizardEyes = setup.querySelector('input[name=eyes-color]');
var hiddenWizardFireball = setup.querySelector('input[name=fireball-color]');

var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var coatColorCount = 1;
var eyesColorCount = 1;
var fireballColorCount = 1;

var changeColor = function (evt) {
  if (evt.currentTarget === userWizardCoat) {
    userWizardCoat.style.fill = coatColor[coatColorCount];
    hiddenWizardCoat.value = coatColor[coatColorCount];
    coatColorCount++;
    if (coatColorCount === coatColor.length) {
      coatColorCount = 0;
    }
  }

  if (evt.currentTarget === userWizardEyes) {
    userWizardEyes.style.fill = eyesColor[eyesColorCount];
    hiddenWizardEyes.value = eyesColor[eyesColorCount];
    eyesColorCount++;
    if (eyesColorCount === eyesColor.length) {
      eyesColorCount = 0;
    }
  }

  if (evt.currentTarget === userWizardFireball) {
    userWizardFireball.style.background = fireballColor[fireballColorCount];
    hiddenWizardFireball.value = fireballColor[fireballColorCount];
    fireballColorCount++;
    if (fireballColorCount === fireballColor.length) {
      fireballColorCount = 0;
    }
  }
};

userWizardCoat.addEventListener('click', changeColor);
userWizardEyes.addEventListener('click', changeColor);
userWizardFireball.addEventListener('click', changeColor);
