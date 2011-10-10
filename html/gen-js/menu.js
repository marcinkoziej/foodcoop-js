(function() {
  var $;
  $ = jQuery;
  $.fn.topmenu = function() {
    var hide, show;
    show = function(ev) {
      $(ev.target).siblings('.block').find('img').removeClass('shown');
      return $(ev.target).find('img.vegetable-color').addClass('shown');
    };
    hide = function(ev) {
      return $(ev.target).siblings('.block').find('img').removeClass('shown');
    };
    return this.each(function() {
      return $(this).find(".block").click(show).hover(show, hide);
    });
  };
}).call(this);
