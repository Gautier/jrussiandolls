/**
 * Copyright 2010 Gautier Hayoun.
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
            success: function(result) {
              var select = opts.child;
              select.empty();
              if (result.size() > 0) {
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
          }});
        });
        jQuery(this).change();
    });
  };

  jQuery.fn.russiandolls.defaults = {
    url: "/data.json",
    paramName: "filter",
    extractField: null,
    labelName: "label",
    child: null,
    emptyMsg: "No data found"
  };
})(jQuery);
