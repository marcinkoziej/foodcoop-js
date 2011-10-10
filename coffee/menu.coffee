$ = jQuery

# setup navigation.
History = window.History

topmenu_select = (el) ->
  $(el).closest(".block").addClass("on clicked")
    .siblings(".block").removeClass("on clicked")

$.fn.topmenu = ->
  @each ->
    c = (ev) =>
      topmenu_select(ev.target)
      where = $(ev.target).closest(".block").data()

      History.pushState({pane: where.pane}, where.title, "?"+where.pane)

    h = (ev) ->
#      console.log("hover: "+ev.type+" on "+ev.target.src)
      $(ev.target).closest(".block")
        .filter(":not(.clicked)").toggleClass("on")

    $(this).find(".block img").click(c).hover(h)
    $(this).find("a").click(c)


activate_pane = (pane) ->
  $(".pane").hide()
  $("#"+pane).show()
  topmenu_select( $("#header .block[data-pane="+pane+"]").get(0) )

# change states
History.Adapter.bind window, 'statechange', (ev) ->
  state = History.getState()
  # change pane
  pane = state.data.pane
  activate_pane pane


# Setup top menu  & basic transitions
$("#header").topmenu()

# & run initial state
currentState = History.getState()
console.log(currentState)
if currentState.data.pane?
  pane = currentState.data.pane
  activate_pane pane
else if currentState.hash?
  # we need to figure out where we are!
  s = /^[/][?](\w+)/
  m = s.exec(currentState.hash)
  pane = m[1]
  History.replaceState({pane: pane}, "", "?" + pane)
else
  History.replaceState({pane: "products"}, "Products", "?products")


