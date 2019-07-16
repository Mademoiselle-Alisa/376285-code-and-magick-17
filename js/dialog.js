'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var draggableAvatar = setup.querySelector('.upload');
  // 1. Открытие/закрытие окна настройки персонажа:
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var userWizard = setup.querySelector('.setup-wizard');

  var userWizardCoat = userWizard.querySelector('.wizard-coat');
  var userWizardEyes = userWizard.querySelector('.wizard-eyes');
  var userWizardFireball = setup.querySelector('.setup-fireball-wrap');
  var hiddenWizardCoat = setup.querySelector('input[name=coat-color]');
  var hiddenWizardEyes = setup.querySelector('input[name=eyes-color]');
  var hiddenWizardFireball = setup.querySelector('input[name=fireball-color]');
  var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var coatColorCount = 1;
  var eyesColorCount = 1;
  var fireballColorCount = 1;
  var globalStartCoords = {
    x: 0,
    y: 0
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);

    globalStartCoords = {
      x: setup.offsetLeft,
      y: setup.offsetTop
    };

  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);

    setup.style.top = globalStartCoords.y + 'px';
    setup.style.left = globalStartCoords.x + 'px';
  };

  var onPopupEscPress = function (evt) {
    if (userNameInput !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // 3. Изменение цвета мантии персонажа по нажатию. 4.Изменение цвета глаз персонажа по нажатию. 5.Изменение цвета фаерболов по нажатию.
  var changeColor = function (evt) {
    switch (evt.currentTarget) {
      case userWizardCoat:
        userWizardCoat.style.fill = coatColor[coatColorCount];
        hiddenWizardCoat.value = coatColor[coatColorCount];
        coatColorCount++;
        if (coatColorCount === coatColor.length) {
          coatColorCount = 0;
        }
        break;
      case userWizardEyes:
        userWizardEyes.style.fill = eyesColor[eyesColorCount];
        hiddenWizardEyes.value = eyesColor[eyesColorCount];
        eyesColorCount++;
        if (eyesColorCount === eyesColor.length) {
          eyesColorCount = 0;
        }
        break;
      case userWizardFireball:
        userWizardFireball.style.background = fireballColor[fireballColorCount];
        hiddenWizardFireball.value = fireballColor[fireballColorCount];
        fireballColorCount++;
        if (fireballColorCount === fireballColor.length) {
          fireballColorCount = 0;
        }
        break;
    }
  };

  userWizardCoat.addEventListener('click', changeColor);
  userWizardEyes.addEventListener('click', changeColor);
  userWizardFireball.addEventListener('click', changeColor);

  // Перемещение диалогового окна. Координаты окна открытия/закрытия прописаны в setup.js

  draggableAvatar.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var draggableAvatarMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shiftCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shiftCoords.y) + 'px';
      setup.style.left = (setup.offsetLeft - shiftCoords.x) + 'px';
    };

    var draggableAvatarUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', draggableAvatarMove);
      document.removeEventListener('mouseup', draggableAvatarUp);

      if (dragged) {
        var avatarClickPreventDefault = function (evtAvatar) {
          evtAvatar.preventDefault();
          draggableAvatar.removeEventListener('click', avatarClickPreventDefault);
        };
        draggableAvatar.addEventListener('click', avatarClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', draggableAvatarMove);
    document.addEventListener('mouseup', draggableAvatarUp);
  });

})();
