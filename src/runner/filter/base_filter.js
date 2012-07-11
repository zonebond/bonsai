define([], function() {
  'use strict';

  var filter = {

    /**
     * The Filter base class.
     *
     * This base class is not intended to be used directly
     * but rather as a base class for filter implementations.
     *
     * @constructor
     *
     * @param {string} type The type of Filter.
     * @param {mixed} [value] Filter value.
     * @param {mixed} [defaultValue] Default value if value is omitted.
     *
     * @example
     *    var filter = new filter.BaseFilter('blur', 1);
     *    var filter = new filter.BaseFilter('blur', 1, 2);
     *
     */
    BaseFilter: function(type, value, defaultValue) {
      this.type = type;

      if (typeof value == 'undefined') {
        this.value = defaultValue;
      } else {
        this.value = value;
      }
    },

    /**
     * Method to create filter factory.
     *
     * @param  {string} factoryName name of the to be created factory.
     * @param  {string} className name of the to be exposed class.
     *
     */
    createFactory: function(factoryName, Constructor) {
      filter[factoryName] = function() {
        // we need to `apply` and therefore can't use `new Constructor`
        var filter = Object.create(Constructor.prototype);
        var constructed = Constructor.apply(filter, arguments);
        return typeof constructed === 'object' ? constructed : filter;
      };
    }
  };

  return filter;
});