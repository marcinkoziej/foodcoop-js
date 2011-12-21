(function() {
  var IFoodStore, LocalFoodStore;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  IFoodStore = (function() {
    function IFoodStore() {}
    IFoodStore.prototype.getAllCategories = function() {
      return window.fixture.getAllCategories;
    };
    IFoodStore.prototype.getProduct = function(id) {
      return window.fixture.products[id];
    };
    return IFoodStore;
  })();
  LocalFoodStore = (function() {
    function LocalFoodStore() {
      LocalFoodStore.__super__.constructor.apply(this, arguments);
    }
    __extends(LocalFoodStore, IFoodStore);
    return LocalFoodStore;
  })();
  window.LocalFoodStore = LocalFoodStore;
}).call(this);
