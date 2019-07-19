'use strict';

(function () {

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var setup = document.querySelector('.setup');

  var similarListElement = setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  /*
  var firstName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var secondName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
*/
  /* function wizardsGenerate(wizardCount) {
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
  } */
  var onLoad = function (data) {
    wizardsFillBlock(data);
  };

  var onError = function (message) {
    window.errorPopup.createErrorElement(message);
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  function wizardsFillBlock(wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[getRandomInt(0, wizards.length)]));
    }

    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  }

  window.backend.load(onLoad, onError);
})();
