'use strict';

(function () {
  var closeErrorPopup = function () {
    var saveError = document.querySelector('.save-error');
    saveError.remove();
  };
  window.errorPopup = {
    createErrorElement: function (message) {
      var body = document.querySelector('body');
      var errorFragment = document.createDocumentFragment();
      var errorElement = document.createElement('div');
      errorElement.className = 'save-error';
      errorElement.innerHTML = '<p> Произошла ошибка!<br>' + message + '</p>';
      var buttonElement = document.createElement('button');
      buttonElement.className = 'close-save-error';
      buttonElement.innerHTML = 'Закрыть';
      errorElement.appendChild(buttonElement);
      errorFragment.appendChild(errorElement);
      body.appendChild(errorFragment);

      buttonElement.addEventListener('click', closeErrorPopup);
    }
  };
})();
