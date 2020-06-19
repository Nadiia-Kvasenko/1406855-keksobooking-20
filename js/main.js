'use strict';

var TITLE = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Наркоманский притон',
  'Чёткая хата',
  'Стандартная квартира в центре',
  'Тихая квартирка недалеко от метро',
  'Милое гнездышко для фанатов Анимэ'
];

var APPARTMENT_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var APPARTMENT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var APPARTMENT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PIN_SHIFT_X = 25;
var PIN_SHIFT_Y = 70;

var ROOMS = [1, 2, 3, 100];
var GUESTS = [1, 2, 3];

var PICTURES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var randomNumber = function (min, max) {
  return min + Math.random() * (max - min);
};

var createPoint = function (index) {
  var location = {
    x: randomNumber(0, 1200),
    y: randomNumber(130, 630)
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: {
      title: TITLE[index],
      address: location.x + ', ' + location.y,
      price: randomNumber(0, 1000000),
      type: APPARTMENT_TYPE[randomNumber(0, APPARTMENT_TYPE.length)],
      rooms: ROOMS[randomNumber(0, GUESTS.length)],
      guests: GUESTS[randomNumber(0, ROOMS.length)],
      checkin: APPARTMENT_TIME[randomNumber(0, APPARTMENT_TIME.length)],
      checkout: APPARTMENT_TIME[randomNumber(0, APPARTMENT_TIME.length)],
      features: APPARTMENT_FEATURES.slice(0, randomNumber(0, APPARTMENT_FEATURES.length)),
      description: '',
      pictures: PICTURES.slice(0, randomNumber(0, PICTURES.length))
    },
    location: location
  };
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pins = [];
var PIN_QUANTITY = 8;
var fillArray = function () {
  for (var i = 0; i < PIN_QUANTITY; i++) {
    pins.push(createPoint(i + 1));
  }
};

fillArray();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var mapPin = pinTemplate.cloneNode(true);
  mapPin.style.left = Number(pin.location.x - PIN_SHIFT_X) + 'px';
  mapPin.style.top = Number(pin.location.y - PIN_SHIFT_Y) + 'px';
  mapPin.querySelector('img').src = pin.author.avatar;
  mapPin.querySelector('img').alt = pin.offer.title;
  return mapPin;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

document.querySelector('.map__pins').appendChild(fragment);
