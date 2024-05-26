$(function () {
  /* 새로고침시 최상단으로 이동 */
  setTimeout(function () {
    $(window).scrollTop(0);
  }, 0);

  var typed = new Typed("#typed", {
    strings: ["FRONTEND DEVELOPER", "OH EUN TEAK"],
    typeSpeed: 100,
    showCursor: false,
    fadeOut: true
  });

  $("#intro").each(function () {
    var _obj = $(this);
    var _$btn = $(".btn_scroll", _obj);

    _$btn.each(function () {
      var _$target = $(this);

      _$target.click(function () {
        var scroll = $(window).height();
        _obj.animate({ top: -scroll }, 600, function () {
          _obj.hide(0);
          $("#wrap").animate({ opacity: 1 }, 600);
        });
      });
    });

    $(window).one("wheel", function (e) {
      var E = e.originalEvent;
      if (E.deltaY > 0) {
        _$btn.trigger("click");
      }
    });
  });
});

$(function () {
  $("#container").each(function () {
    var _obj = $(this);

    var _$menu = $(".menu", _obj);

    var _$indicate = $(".indicate", _obj);
    var _$indicateItem = _$indicate.find("li");

    var _$oldObj = null;

    var stop = true;

    _$menu.each(function (index) {
      var _$obj = $(this);
      $(this).find(".menu_box> a").click(function () {
        if (stop == true) {
          stop = false;
          menuActive(_$obj);
          selectPager(_$obj.index());

          _$oldObj = _$obj;
          if (_$obj.hasClass("opening") == false) {
            _$oldObj = null;
          }

          setTimeout(function () {
            stop = true;
          }, 1200);
        }
      });
    });

    _$indicate.each(function () {
      _$indicateItem.click(function (e) {
        if (stop == true) {
          stop = false;
          var _$obj = $(".menu").eq($(this).index());
          if (_$oldObj != null) {
            if (_$obj.index() == _$oldObj.index()) {
              stop = true;
              return false;
            } else {
              menuActive(_$oldObj);
              selectPager(_$obj.index());

              setTimeout(function () {
                menuActive(_$obj);
              }, 1200);

              setTimeout(function () {
                stop = true;
              }, 2400);
            }
          } else {
            menuActive(_$obj);
            selectPager(_$obj.index());

            setTimeout(function () {
              stop = true;
            }, 1200);
          }
          _$oldObj = _$obj;
        }
      });
    });

    function logoColor(index) {
      var color;
      if (index == 0) {
        color = "#f6f7f8";
      } else if (index == 1) {
        color = "#000";
      } else if (index == 2) {
        color = "#fff";
      }

      return color;
    }

    function menuActive(obj) {
      if (obj.hasClass("open") || obj.hasClass("opening")) {
        obj.removeClass("open");
        obj.addClass("closing");
        obj.siblings().show(0).removeClass("hiiden").addClass("visible");

        setTimeout(function () {
          obj.removeClass("closing");
          obj.siblings().removeClass("visible");
        }, 600);
      } else {
        obj.addClass("opening");
        obj.siblings().addClass("hiiden").delay(600).hide(0);

        $(".logo a").css("color", logoColor(obj.index()));

        setTimeout(function () {
          obj.removeClass("opening").addClass("open");
        }, 1200);
      }
    }

    function selectPager(index) {
      var _$item = _$indicateItem.eq(index);
      if (_$item.hasClass("on")) {
        _$item.removeClass("on");
        _$indicate.removeClass("on");
      } else {
        _$item.siblings().removeClass("on");
        _$item.addClass("on");
        _$indicate.addClass("on");
      }
    }
  });
});
