(function($) {
  $.fn.fn = function() {
    var self = this;
    var extension = arguments[0], name = arguments[0];
    if (typeof name == "string") {
      return apply(self, name, $.makeArray(arguments).slice(1, arguments.length));
    } else {
      $.each(extension, function(key, value) {
        define(self, key, value);
      });
      return self;
    }
  }
  $.fn.mixin = function(element) {
    var methods = {},
      data = $.cache[$.data(element[0])],
      slot;
      
    for(slot in data)
      if(slot.match(/^fn\./))
        this.data(slot, data[slot]);
    
    return this;
  };
  function define(self, name, fn) {
    self.data(namespacedName(name), fn);
  };
  function apply(self, name, args) {
    var result;
    self.each(function(i, item) {
      var fn = $(item).data(namespacedName(name));
      if (fn)
        result = fn.apply(item, args);
      else
        throw(name + " is not defined");
    });
    return result;
  };
  function namespacedName(name) {
    return 'fn.' + name;
  }
})(jQuery);
