// WowJS
new WOW().init();



$(function () {

  // Menu burger
  document.querySelector('.header__burger').onclick = function () {
    document.querySelector('.header__burger-btn').classList.toggle('active');
    document.querySelector('.mobile__menu-wrapper').classList.toggle('active');
    document.querySelector('body').classList.toggle('active');
  };

  $('.nav__link').click(function () {
    $('.mobile__menu-wrapper').removeClass('active');
    $('.header__burger-btn').removeClass('active');
    $('body').removeClass('active');
  });

  $('.user').click(function () {
    $('.mobile__menu-wrapper').removeClass('active');
    $('.header__burger-btn').removeClass('active');
    $('body').removeClass('active');
  });




});




/* Filter 
=================*/
function app() {
  const buttons = document.querySelectorAll('.filter__btn');
  const cards = document.querySelectorAll('.card');

  function filter(category, items) {
    items.forEach((item) => {
      const isItemFiltered = !item.classList.contains(category);
      const isShowAll = category.toLowerCase() === 'all'
      if (isItemFiltered && !isShowAll) {
        item.classList.add('anime')
      } else {
        item.classList.remove('hide')
        item.classList.remove('anime')
      }
    })
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const currentCategory = button.dataset.filter
      filter(currentCategory, cards)
    })
  })

  cards.forEach((card) => {
    card.ontransitionend = function () {
      if (card.classList.contains('anime')) {
        card.classList.add('hide')
      }
    }
  })

}

app()


// Плавный scroll

const anchors = document.querySelectorAll('a[href*="#"]')


anchors.forEach((item) => {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    const blockID = item.getAttribute('href')
    document.querySelector('' + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
})



// Popup window
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popuplink = popupLinks[i];
    popuplink.addEventListener('click', function (e) {
      const popupName = popuplink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.opne');
    popupClose(popupActive);
  }
});