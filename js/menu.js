(function() {
  var $, History, activate_pane, currentState, m, pane, paneexpr, topmenu_select;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $ = jQuery;
  History = window.History;
  topmenu_select = function(el) {
    return $(el).closest(".block").addClass("on clicked").siblings(".block").removeClass("on clicked");
  };
  $.fn.topmenu = function() {
    return this.each(function() {
      var c, h;
      c = __bind(function(ev) {
        var where;
        topmenu_select(ev.target);
        where = $(ev.target).closest(".block").data();
        return History.pushState({
          pane: where.pane
        }, where.title, "?" + where.pane);
      }, this);
      h = function(ev) {
        return $(ev.target).closest(".block").filter(":not(.clicked)").toggleClass("on");
      };
      $(this).find(".block img").click(c).hover(h);
      return $(this).find("a").click(c);
    });
  };
  activate_pane = function(pane) {
    $(".pane").hide();
    $("#" + pane).show();
    return topmenu_select($("#header .block[data-pane=" + pane + "]").get(0));
  };
  History.Adapter.bind(window, 'statechange', function(ev) {
    var pane, state;
    state = History.getState();
    pane = state.data.pane;
    return activate_pane(pane);
  });
  $("#header").topmenu();
  paneexpr = /^[/][?](\w+)/;
  currentState = History.getState();
  console.log(currentState);
  if (currentState.data.pane != null) {
    pane = currentState.data.pane;
    History.replaceState({
      pane: pane
    }, "", "?" + pane);
    activate_pane(pane);
  } else if ((currentState.hash != null) && (m = paneexpr.exec(currentState.hash))) {
    pane = m[1];
    History.replaceState({
      pane: pane
    }, "", "?" + pane);
  } else {
    History.replaceState({
      pane: "products"
    }, "Products", "?products");
  }
}).call(this);
