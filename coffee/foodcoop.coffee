

# setup storage
window.foodstore = new LocalFoodStore


# setup widgets.
$(".product-list").ProductEditor(store: window.foodstore)

