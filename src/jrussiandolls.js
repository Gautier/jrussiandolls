/**
 * Copyright 2010, 2011 Gautier Hayoun.
 *
 * Requires jQuery >= 1.5.1
 *
 * Released under MIT license (see README)
 */
(function(jQuery) {
  function setupRussianDoll(value, opts) {
    var params = {};
    params[opts.paramName] = value;
    var select = opts.child;

    jQuery.ajax({
      url: opts.url,
      data: params,
      dataType: opts.dataType,
    }).success(function(result) {
        select.empty();
        if (result && result.length > 0) {
          jQuery(result).each(function (index, resultData) {
            if (opts.extractField) {
              resultData = resultData[opts.extractField];
            }
            select.append("<option value=" +resultData.id+ ">"
                            +resultData[opts.labelName]+"</option>");
          });
        } else {
          select.append("<option value=''>" + opts.emptyMsg + "</option>");
        }
        select.trigger("change");
      hideLoading();
    }).error(function () {
      select.empty();
      select.append("<option value=''>" + opts.emptyMsg + "</option>");
      hideLoading();
    });

    function showLoading() {
      var height = select.height();
      var loading_html = "<span class='loading'> " +
          "<img height='" + height + "px' src='" + opts.loadingIcon + "' />" +
          "</span>";
      select.after(loading_html);
    }

    function hideLoading() {
      select.next("span.loading").remove();
    }

    if (opts.loadingIcon) {
      showLoading();
    }
  }


  jQuery.fn.russiandolls = function(options) {
    var opts = jQuery.extend({}, jQuery.fn.russiandolls.defaults, options);
    if (opts.root) {
      opts.child = this;
      return setupRussianDoll("", opts);
    } else {
      return this.each(function() {
        jQuery(this).change(function(e) {
          if (!this.value || this.value == "") return false;
          var self = this;
          setupRussianDoll(this.value, opts);
        });
        jQuery(this).trigger("change");
      });
    }
  };

  jQuery.fn.russiandolls.defaults = {
    root: false,
    url: "/data.json",
    paramName: "filter",
    extractField: null,
    loadingIcon: null,
    labelName: "label",
    dataType: "json",
    child: null,
    emptyMsg: "No data found"
  };
})(jQuery);
