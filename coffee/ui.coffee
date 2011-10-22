
$.fn.formdata = ->
  fds = {}
  @each ->
    $.map  $(this).serializeArray(), (fv) ->
      fds[fv.name] = fv.value
  fds


UIElement =
  options:
    templates: {}

  render: (template, view, partials) ->
    tbody = null
    if not (template in @options.templates)
      tbody = @element.find(".template."+template).html()
      if tbody == null
        throw "No template named "+ template
      # cache it
      @options.templates[template] = tbody
    else
      tbody = @options.templates[template]
    Mustache.to_html(tbody, view, partials)

  empty: ->
    @element.children(":not(.template)").remove()

$.widget("foodcoop.UIElement", UIElement)

ProductEditor =
  options:
    store: null

  drawCategory: (cat) ->
    c = $("<div>").addClass('category')
    ctitle = @render('category', cat )
    c.append ctitle

    for p in cat.items
      cprod = @render('product', p)
      c.append cprod
    @element.append c

  _create: ->
    @element.addClass("product-editor")
    cats = @options.store.getAllCategories()
    for c in cats
      @drawCategory c

  add_category: ->
    dbody = $(@render('category-edit', {}))
    add = (ev) =>
      cat = dbody.find("form").formdata()
      ctitle = @render('category', cat)
      @element.append(ctitle)
      dbody.modal "hide"
      dbody.remove()

    cancel = (ev) =>
      dbody.modal 'hide'
      dbody.remove()

    dbody.find(':button.primary').click add
    dbody.find(':button.cancel').click cancel

    dbody.modal
      show: true


$.widget("foodcoop.ProductEditor", $.foodcoop.UIElement,  ProductEditor)

