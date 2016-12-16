$(".sidebar-nav").children().not(".sidebar-brand").each(function() {
    var link = $(this).find('a');
    link.click(function() {
        $(".sidebar-nav").children().find('a').removeClass('active');
        console.log(link)
        link.addClass('active');
    });
});
