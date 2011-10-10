
class IFoodStore
  getAllCategories: ->
    return window.fixture.getAllCategories

class LocalFoodStore extends IFoodStore

window.LocalFoodStore = LocalFoodStore

