(function() {
  var product_editor;
  window.foodstore = new LocalFoodStore;
  product_editor = $(".product-list").ProductEditor({
    store: window.foodstore
  });
  $("#product-list-add-category").click(function(ev) {
    return product_editor.ProductEditor("add_category");
  });
}).call(this);
