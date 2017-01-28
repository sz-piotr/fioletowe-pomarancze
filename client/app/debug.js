if (global.cfg.debug) {
    setInterval(function() {
        $('title').html('Fioletowe pomarancze ' + window.location.hash);
    }, 100);
    require('nw.gui').Window.get().showDevTools();
}
