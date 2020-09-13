'use strict'

if (document.querySelector(".navigation__list")) {
  let menu = document.querySelector(".navigation__list");
  let toggler = document.querySelector(".navigation__toggle-button");

  toggler.addEventListener("click", function() {
    toggler.classList.toggle("navigation__toggle-button--close")
    menu.classList.toggle("navigation__list--show");
  })
}

if (document.querySelector(".sedona-review__form")) {
  let tel = document.getElementById("user-tel");
  let email = document.getElementById("user-email");
  let popup_err = document.querySelector(".modal--failure");
  let popup_suc = document.querySelector(".modal--success");
  let err_close = popup_err.querySelector(".modal__btn-close");
  let suc_close = popup_suc.querySelector(".modal__btn-close");
  let form = document.querySelector(".sedona-review__form");

  let isValid = (tel, email) => {
    if (!tel.value || !email.value || tel.value.match(/\D/gi) || !email.value.match(/@/)) return false;
    else return true
  }

  form.addEventListener("submit", function(evt) {
    if (!isValid(tel, email)) {
      evt.preventDefault();
      popup_err.classList.add("modal--show");
    } else {
      popup_suc.classList.add(".modal--show");
    }
  })

  err_close.addEventListener("click", function() {
    popup_err.classList.remove("modal--show");
  })

  suc_close.addEventListener("click", function() {
    popup_suc.classList.remove("modal--show");
  })
}
