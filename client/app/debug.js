setInterval(function() {
    $('title').html('Fioletowe pomarancze ' + window.location.hash);
}, 100);

if (global.cfg.debug) require('nw.gui').Window.get().showDevTools();
