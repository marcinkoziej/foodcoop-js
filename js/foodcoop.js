(function() {
  window.foodstore = new LocalFoodStore;
  $(".product-list").ProductEditor({
    store: window.foodstore
  });
}).call(this);
