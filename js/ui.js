(function() {
  var ProductEditor, UIElement;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  UIElement = {
    options: {
      templates: {}
    },
    render: function(template, view, partials) {
      var tbody;
      tbody = null;
      if (!(__indexOf.call(this.options.templates, template) >= 0)) {
        tbody = this.element.find(".template." + template).html();
        if (tbody === null) {
          throw "No template named " + template;
        }
        this.options.templates[template] = tbody;
      } else {
        tbody = this.options.templates[template];
      }
      return Mustache.to_html(tbody, view, partials);
    }
  };
  $.widget("foodcoop.UIElement", UIElement);
  ProductEditor = {
    options: {
      store: null
    },
    drawCategory: function(cat) {
      var c, cprod, ctitle, p, _i, _len, _ref;
      c = $("<div>").addClass('category');
      ctitle = this.render('category', cat);
      c.append(ctitle);
      _ref = cat.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        cprod = this.render('product', p);
        c.append(cprod);
      }
      return this.element.append(c);
    },
    _create: function() {
      var c, cats, _i, _len, _results;
      this.element.addClass("product-editor");
      cats = this.options.store.getAllCategories();
      _results = [];
      for (_i = 0, _len = cats.length; _i < _len; _i++) {
        c = cats[_i];
        _results.push(this.drawCategory(c));
      }
      return _results;
    }
  };
  $.widget("foodcoop.ProductEditor", $.foodcoop.UIElement, ProductEditor);
}).call(this);
