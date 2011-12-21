(function() {
  var ProductEditor, UIElement, select_default;
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
  select_default = function(text, render) {
    var o;
    o = $(render(text));
    $("select[default-data]", o).each(function(idx, el) {
      var v;
      v = $(el).data('default');
      return $("option[value=" + v + "]").attr('selected', 'selected');
    });
    return o.html();
  };
  ProductEditor = {
    options: {
      store: null,
      row_edit_class: 'edit-row'
    },
    _create: function() {
      var c, cats, _i, _len;
      this.element.addClass("product-editor");
      cats = this.options.store.getAllCategories();
      for (_i = 0, _len = cats.length; _i < _len; _i++) {
        c = cats[_i];
        this.drawCategory(c);
      }
      return $("." + this.options.row_edit_class, this.element).click(__bind(function(ev) {
        var frm, product, product_id;
        ev.preventDefault();
        product_id = $(ev.target).closest('.product').data('id');
        product = this.options.store.getProduct(product_id);
        frm = this.render('product-edit', $.extend(product, {
          select_default: select_default
        }));
        return $(ev.target).closest('.product').replaceWith(frm);
      }, this));
    },
    drawCategory: function(cat) {
      var c, cprod, ctitle, p, _i, _len, _ref;
      c = $("<div>").addClass('category');
      ctitle = this.render('category', cat);
      c.append(ctitle);
      if (cat.items != null) {
        _ref = cat.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          cprod = this.render('product', p);
          c.append(cprod);
        }
      }
      return this.element.append(c);
    },
    addCategory: function() {
      var cancel, dbody, frm;
      dbody = $(this.render('category-edit', {}));
      frm = dbody.find("form");
      frm.submit(__bind(function(ev) {
        var cat;
        ev.preventDefault();
        cat = frm.formdata();
        this.drawCategory(cat);
        dbody.modal("hide");
        dbody.remove();
        return false;
      }, this));
      cancel = __bind(function(ev) {
        dbody.modal('hide');
        return dbody.remove();
      }, this);
      dbody.find(':button.primary').click(function() {
        return frm.submit();
      });
      dbody.find(':button.cancel').click(cancel);
      return dbody.modal({
        show: true
      });
    }
  };
  $.widget("foodcoop.ProductEditor", $.foodcoop.UIElement, ProductEditor);
}).call(this);
