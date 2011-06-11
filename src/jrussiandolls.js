/**
 * Copyright 2010 Gautier Hayoun.
 *
 * Requires jQuery >= 1.5.1
 *
 * See README for documentation
 */
(function(jQuery) {
  jQuery.fn.russiandolls = function(options) {
    var opts = jQuery.extend({}, jQuery.fn.russiandolls.defaults, options);
    return this.each(function() {
      jQuery(this).change(function(e) {
        if (!this.value || this.value == "") return false;

        params = {};
        params[opts.paramName] = this.value;

        jQuery.ajax({
          url: opts.url,
          data: params,
          dataType: opts.dataType,
        }).success(function(result) {
            var select = opts.child;
            select.empty();
            if (result && result.length > 0) {
              jQuery(result).each(function (dummy) {
                data = this;
                if (opts.extractField !== null) {
                  data = data[opts.extractField];
                }
                select.append("<option value=" +data.id+ ">"
                                +data[opts.labelName]+"</option>");
              });
            } else {
              select.append("<option value=''>" + opts.emptyMsg + "</option>");
            }
            select.trigger("change");
        }).error(function () {
          select.empty();
          select.append("<option value=''>" + opts.emptyMsg + "</option>");
        });

      });
      jQuery(this).trigger("change");
    });
  };

  jQuery.fn.russiandolls.defaults = {
    url: "/data.json",
    paramName: "filter",
    extractField: null,
    labelName: "label",
    dataType: "json",
    child: null,
    emptyMsg: "No data found"
  };
})(jQuery);
