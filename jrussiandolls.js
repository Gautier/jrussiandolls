/**
 * Copyright 2010 Gautier Hayoun. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 * 
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY Gautier Hayoun ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Gautier Hayoun OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * Documentation
 *
 * TODO
 *
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
                                  +data.label+"</option>");
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
    child: null,
    emptyMsg: "No data found"
  };
})(jQuery);
