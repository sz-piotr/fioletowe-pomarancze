(function($) {
    $.fn.component = function(href) {
        var self = this;
        $.get(href, function(data) {
            self.html(data);
        });
        return this;
    }
})(jQuery);
