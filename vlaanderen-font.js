'use strict';

(function() {
    const id = 'vlaanderen_font_style';
    addStyle();

    function addStyle() {
        if (!document.head.querySelector('#' + id)) {
            var style = getStyle();
            document.head.appendChild(style);
        }
    }

    function getStyle() {
        var link = document.createElement('link');
        link.setAttribute('id', id);
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'https://cdn.milieuinfo.be/vlaanderen-font/LATEST/style.css');
        return link;
    }
})();