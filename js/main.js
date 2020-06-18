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
  '14:00',
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

  var createPoint = function (index) {
    var location = {
      x: 645, //generateNumber(0, 1200),
      y: 345//generateNumber(130, 630)
    };
    return {
      author: {
        avatar: 'img/avatars/user0' + index + '.png'
      },
      offer: {
        title: TITLE[index],
        address: location.x + ', ' + location.y,
        price: 100,
        type: APPARTMENT_TYPE,
        rooms: 2,
        guests: 2,
        checkin: APPARTMENT_TIME[0],
        checkout: APPARTMENT_TIME[1],
        features: APPARTMENT_FEATURES,
        description: 'Надя невнимательна',
        pictures: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg']
      },
      location: location
    }
  };

  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var pins = [];
  var PIN_QUANTITY = 1;
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
  }
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }

  document.querySelector('.map__pins').appendChild(fragment);