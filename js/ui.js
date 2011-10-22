(function() {
  var ProductEditor, UIElement;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $.fn.formdata = function() {
    var fds;
    fds = {};
    this.each(function() {
      return $.map($(this).serializeArray(), function(fv) {
        return fds[fv.name] = fv.value;
      });
    });
    return fds;
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
    },
    empty: function() {
      return this.element.children(":not(.template)").remove();
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
    },
    add_category: function() {
      var add, cancel, dbody;
      dbody = $(this.render('category-edit', {}));
      add = __bind(function(ev) {
        var cat, ctitle;
        cat = dbody.find("form").formdata();
        ctitle = this.render('category', cat);
        this.element.append(ctitle);
        dbody.modal("hide");
        return dbody.remove();
      }, this);
      cancel = __bind(function(ev) {
        dbody.modal('hide');
        return dbody.remove();
      }, this);
      dbody.find(':button.primary').click(add);
      dbody.find(':button.cancel').click(cancel);
      return dbody.modal({
        show: true
      });
    }
  };
  $.widget("foodcoop.ProductEditor", $.foodcoop.UIElement, ProductEditor);
}).call(this);
