$(function () {


  /* Filter 
  =================*/
  let filter = $("[data-filter]");

  filter.on("click", function (event) {
    event.preventDefault();

    let cat = $(this).data("filter");

    if (cat == 'all') {
      $("[data-cat]").removeClass('hide')
    } else {
      $("[data-cat]").each(function () {

        let workCat = $(this).data('cat');

        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });


  /* Modal  
  =================*/

  const modalCall = $("[data-modal]");
  const modalClose = $("[data-close]");

  modalCall.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalId = $this.data('modal');

    $(modalId).addClass("show");
    $("body").addClass('no-scroll');

    setTimeout(function () {
      $(modalId).find(".modal__dialog").css({
        transform: "rotateX(0)"
      });
    }, 200);

    $("#worksSlider").slick("setPosition");
  });

  modalClose.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalParent = $this.parents('.modal');

    modalParent.removeClass("show");
    $("body").removeClass('no-scroll');
  });

  $(".modal").on("click", function (event) {
    $(this).removeClass("show");
    $("body").removeClass('no-scroll');
  });

  $(".modal__dialog").on("click", function (event) {
    event.stopPropagation();
  });



  /* Slider: https://kenwheeler.github.io/slick/
  =================*/

  $('[data-slider="slick"]').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true
  });

  $(".slickPrev").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

    currentSlider.slick("slickPrev");
  });

  $(".slickNext").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

    currentSlider.slick("slickNext");
  });

  /* Mobile nav  
  =================*/

  const navToggle = $("#navToggle");
  const nav = $("#nav");

  navToggle.on("click", function (event) {
    event.preventDefault();

    nav.toggleClass("show");
  });


  // Menu burger
  document.querySelector('.header__burger').onclick = function () {
    document.querySelector('.header__burger-btn').classList.toggle('active');
    document.querySelector('.mobile__menu-wrapper').classList.toggle('active');
  };
});