

# setup storage
window.foodstore = new LocalFoodStore


# setup widgets.
product_editor = $(".product-list").ProductEditor(store: window.foodstore)
$("#product-list-add-category").click (ev) ->
  product_editor.ProductEditor("addCategory")

