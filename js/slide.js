/*
 고정형 넓이일 경우 target 과 panelItems에 넓이값을 설정
 가변형 넓이, 높이일 경우 target 과 panelItems에 넓이값 X
*/
(function($){
  function Slide(target, options) {
    this._$target= null;
    this._$panel = null;
    this._$panelItems = null;

    this._$next = null;
    this._$prev = null;

    this._$navi = null;
    this._$naviItems = null;

    this._$start = null;
    this._$stop = null;

    this.timerID = null;

    this._options = null;

    this.currentIndex = -1;

    this.initOptions(options);
    this.init(target);
    this.initSet();
    this.initEvent();

    if(this._options.auto){
      this.auto();
    }
  }

  Slide.defaultOptions = {
    panel : "", // panel Class 명 (필수)
    next : "", // next 버튼 Class 명
    prev : "", // prev 버튼 Class 명
    navi : "", // navi 버튼 부모태그 Class 명
    start : "", // 오토플레이 시작 버튼 설정
    stop : "", // 오토플레이 일시정지 버튼 설정
    type : null,
    auto : false, // 페이지 로드시 오토플레이 설정 값
    motionDuration : 600, // 리스트 변경 시간
    rollingDuration : 2000, // 롤링 시간
    easing : "linear" // 롤링 이징값
  };


  Slide.prototype.initOptions = function(options){
    this._options = $.extend(null, Slide.defaultOptions, options);
    console.log(this._options);
  };

  Slide.prototype.init = function(target){
    this._$target = $(target);
    this._$panel = this._$target.find(this._options.panel);
    this._$panelItems = this._$panel.children("ul").children("li");

    this._$next = this._$target.find(this._options.next);
    this._$prev = this._$target.find(this._options.prev);

    this._$navi = this._$target.find(this._options.navi);
    this._$naviItems = this._$navi.find("li");

    this._$start = this._$target.find(this._options.start);
    this._$stop = this._$target.find(this._options.stop);
  };

  Slide.prototype.initSet = function(){
    this._$target.css("position","relative");
    this._$panel.css("position","relative");

    var liHeight = this._$target.height();


    this._$panelItems.css({
      position : "absolute",
      top : 0,
      left : 0,
      width : "100%",
      opacity : 0
    });

    this._$panelItems.eq(0).css("position","relative");

    this.show(0);
  };

  Slide.prototype.setting = function(){
    var liWidth = this._$target.width();

    this._$panelItems.css("width",liWidth);
  };

  Slide.prototype.initEvent = function(){
    var obj = this;

    $(window).resize(function(){
      obj.setting();
    });

    if(this._options.next != ""){
      this._$next.click(function(e){
        e.preventDefault();
        obj.show(obj.currentIndex + 1, obj._options.type);
      });
    }
    if (this._options.prev != "") {
      this._$prev.click(function(e){
        e.preventDefault();
        obj.show(obj.currentIndex - 1, obj._options.type);
      });
    }

    if (this._options.navi != "") {
      this._$naviItems.click(function(e){
        e.preventDefault();
        obj.show($(this).index(), obj._options.type);
      });
    }

    if (this._options.start != "") {
      this._$start.click(function(e){
        e.preventDefault();

        obj.auto();
      });
    }

    if (this._options.stop != "") {
      this._$stop.click(function(e){
        e.preventDefault();

        obj.stopAuto();
      });
    }
  };

  Slide.prototype.auto = function(){
    var obj = this;
    if(this.timerID == null){
      this._$start.hide(0);
      this._$stop.show(0);

      this.timerID = setInterval(function(){
        obj.show(obj.currentIndex + 1, obj._options.type);
      },this._options.rollingDuration);
    }
  };

  Slide.prototype.stopAuto = function(){
    var obj = this;
    if(this.timerID != null){
      this._$start.show(0);
      this._$stop.hide(0);

      clearInterval(this.timerID);
      this.timerID = null;
    }
  };

  Slide.prototype.show = function(index, type){
    var obj = this;
    if(index >= this._$panelItems.length){
      index = 0;
    }
    if(index < 0){
      index = this._$panelItems.length - 1;
    }

    var $oldItem = this._$panelItems.eq(this.currentIndex);
    $oldItem.removeClass("on");

    var $newItem = this._$panelItems.eq(index);
    $newItem.addClass("on");

    if(type == null){
      Slide.normal.effect({
        $oldItem : $oldItem,
        $newItem : $newItem
      });
    } else if(type == "fade"){
      Slide.fade.effect({
        $oldItem : $oldItem,
        $newItem : $newItem,
        motionDuration : obj._options.motionDuration,
        easing : obj._options.easing
      });
    }

    this.selectNavi(index);

    this.currentIndex = index;
  };

  Slide.prototype.selectNavi = function(index){
    var $item = this._$naviItems.eq(index);

    if($item.siblings().hasClass("on")){
      $item.siblings().removeClass("on");
    }
    $item.addClass("on");
  };

  Slide.normal = {
    effect : function(options){
      options.$oldItem.css("opacity", 0);
      options.$newItem.css("opacity", 1);
    }
  };

  Slide.fade = {
    effect : function(options){
      options.$oldItem.stop().animate({
        opacity : 0
      },options.motionDuration,options.easing);
      options.$newItem.stop().animate({
        opacity : 1
      },options.motionDuration,options.easing);
    }
  };



  $.fn.slide = function(options){
    this.each(function(){
      new Slide(this, options);
    });
    return this;
  };
})(jQuery);
