'use strict';

(function() {
    var style = getStyle();
    document.head.appendChild(style);

    function getStyle() {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'https://cdn.milieuinfo.be/vlaanderen-font/LATEST/style.css');
        return link;
    }
})();