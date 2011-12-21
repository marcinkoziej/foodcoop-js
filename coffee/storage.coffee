
class IFoodStore
  getAllCategories: ->
    return window.fixture.getAllCategories

  getProduct: (id) ->
    return window.fixture.products[id];

class LocalFoodStore extends IFoodStore

window.LocalFoodStore = LocalFoodStore

