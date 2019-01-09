'use strict';

(function() {
    var style = getStyle();
    document.head.appendChild(style);

    function getStyle() {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', getStyleLink());
        return link;
    }

    function getStyleLink() {
        return window.location.hostname.indexOf('.ruimteinfo.be') > 0 ? 'https://cdn.ruimteinfo.be/vlaanderen-font/LATEST/ruimteinfo.style.css' : 'https://cdn.milieuinfo.be/vlaanderen-font/LATEST/milieuinfo.style.css';
    }
})();