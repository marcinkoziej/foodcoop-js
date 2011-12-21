
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

select_default = (text, render) ->
  o = $(render(text))
  $("select[default-data]", o).each (idx, el) ->
    v = $(el).data('default')
    $("option[value="+v+"]").attr('selected', 'selected')
  return o.html()

ProductEditor =
  options:
    store: null,
    row_edit_class: 'edit-row'

  _create: ->
    @element.addClass("product-editor")
    cats = @options.store.getAllCategories()
    for c in cats
      @drawCategory c

    $("."+@options.row_edit_class, @element).click (ev) =>
      ev.preventDefault()
      product_id = $(ev.target).closest('.product').data('id')
      product = @options.store.getProduct product_id
      frm = @render('product-edit', $.extend(product, {select_default: select_default}))
      $(ev.target).closest('.product').replaceWith frm

  drawCategory: (cat) ->
    c = $("<div>").addClass('category')
    ctitle = @render('category', cat )
    c.append ctitle

    if cat.items?
      for p in cat.items
        cprod = @render('product', p)
        c.append cprod
    @element.append c

  addCategory: ->
    dbody = $(@render('category-edit', {}))
    frm = dbody.find("form")

    frm.submit (ev) =>
      ev.preventDefault()
      cat = frm.formdata()
      @drawCategory cat
      dbody.modal "hide"
      dbody.remove()
      false

    cancel = (ev) =>
      dbody.modal 'hide'
      dbody.remove()

    dbody.find(':button.primary').click -> frm.submit()
    dbody.find(':button.cancel').click cancel

    dbody.modal
      show: true


$.widget("foodcoop.ProductEditor", $.foodcoop.UIElement,  ProductEditor)

