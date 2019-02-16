$(document).ready(function () {
    var jsonURL = "/public/feed.json";
    $.getJSON(jsonURL, function (json) {
        var appBlock = "";
        $.each(json, function () {
            appBlock += '<article><h1>' + this.title + '</h1><p>' + this.content + '</p><a href="' + this.url + '">[ Open App]</a><p></p></article>';
        });

        $('#wrapper').append(appBlock);
    });

});