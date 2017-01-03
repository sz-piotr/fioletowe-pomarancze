$(function() {
    $('#sidebar-wrapper').find('a').click(function() {
        $('#sidebar-wrapper').find('a').removeClass('active');
        $(this).addClass('active');
        link = $(this).attr('href');
        if (link !== '#') {
            $('#content-component').component(link);
            return false;
        }
    });
});
