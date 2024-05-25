$(document).ready(function () {
  $(".header-lang__top").on("click", function () {
    $(".header__lang").toggleClass("active"); // Сначала удалить класс у всех элементов
  });

  $(".header__menu").on("click", function () {
    $(this).toggleClass("active");
    $(".header-list__wrapper, .header__right").toggleClass("active");
  });
  var sections = $(".section-class");
  var navItems = $(".section-list__item");

  function updateActiveSection() {
    var scrollPosition = $(document).scrollTop();
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();

    sections.each(function (index) {
      var sectionOffset = $(this).offset().top;
      if (scrollPosition >= sectionOffset - 10) {
        // -10 чтобы активировалось чуть раньше
        navItems.removeClass("active");
        navItems.eq(index).addClass("active");
      }
    });

    // Проверка, если достигнут низ страницы
    if (scrollPosition + windowHeight >= documentHeight - 10) {
      navItems.removeClass("active");
      navItems.last().addClass("active");
    }
  }

  updateActiveSection(); // Обновляем при загрузке страницы

  $(window).on("scroll", function () {
    updateActiveSection();
  });

  navItems.on("click", function () {
    var index = navItems.index(this);
    var targetSection = sections.eq(index);
    $("html, body").animate(
      {
        scrollTop: targetSection.offset().top,
      },
      500
    ); // 500 - длительность анимации в миллисекундах
  });
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".header-lang__dropdown, .header-lang__top")
        .length
    ) {
      $(".header__lang").removeClass("active");
    }
  });
  $(".spoiler-item__top").on("click", function () {
    var $currentParent = $(this).closest(".spoiler__item");
    var $currentBottom = $currentParent.find(".spoiler-item__bottom");

    // Закрываем все открытые спойлеры, кроме текущего
    $(".spoiler__item")
      .not($currentParent)
      .removeClass("active")
      .find(".spoiler-item__bottom")
      .css("height", 0);

    // Переключаем состояние текущего спойлера
    $currentParent.toggleClass("active");

    if ($currentParent.hasClass("active")) {
      var bottomHeight = $currentBottom[0].scrollHeight;
      $currentBottom.css("height", bottomHeight);
    } else {
      $currentBottom.css("height", 0);
    }
  });
  $(".deskr-aside__item")
    .click(function () {
      if (!$(this).hasClass("deskr-aside__item--empty")) {
        // Удалить класс active у всех aside-элементов и добавить к текущему
        $(".deskr-aside__item").removeClass("deskr-aside__item--active");
        $(this).addClass("deskr-aside__item--active");

        // Показать соответствующий контент-элемент
        var index = $(this).index(
          ".deskr-aside__item:not(.deskr-aside__item--empty)"
        );
        $(".deskr-content__item").hide().eq(index).fadeIn();
      }
    })
    .eq(0)
    .click();
  function wrapTable() {
    if ($(window).width() < 992) {
      $(".text-area table").each(function () {
        if (!$(this).parent().hasClass("table-box")) {
          $(this).wrap('<div class="table-box"></div>');
        }
      });
    } else {
      $(".text-area .table-box").each(function () {
        $(this).find("table").unwrap();
      });
    }
  }

  wrapTable();

  $(window).resize(function () {
    wrapTable();
  });
  $(".changes__slider").owlCarousel({
    loop: true,
    nav: true,
    items: 5,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 3,
      },
      1360: {
        items: 3,
      },
      1601: {
        items: 4,
      },
      1921: {
        items: 5,
      },
    },
  });
});
