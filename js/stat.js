'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_X = 120;
var TEXT_Y = 40;
var TEXT_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_WIDTH_GAP = BAR_WIDTH + BAR_GAP;

var NAME_TEXT_Y = 260;
var TIME_TEXT_Y = 80;

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = 'white';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:', TEXT_X, TEXT_Y + TEXT_GAP);

  var maxElementHeight = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    }

    var elementHeight = BAR_HEIGHT * times[i] / maxElementHeight;
    ctx.fillRect(BAR_HEIGHT + i * BAR_WIDTH_GAP, BAR_HEIGHT - elementHeight + BAR_WIDTH_GAP, BAR_WIDTH, elementHeight);

    ctx.fillStyle = 'black';
    ctx.font = '16px PT Mono';
    ctx.fillText(names[i], BAR_HEIGHT + i * BAR_WIDTH_GAP, NAME_TEXT_Y);
    ctx.fillText(Math.round(times[i]), BAR_HEIGHT + i * BAR_WIDTH_GAP, BAR_HEIGHT - elementHeight + TIME_TEXT_Y);
  }
};
