$('#longUrl').keyup(function(e) {
    if (e.keyCode == 13) {
        var input = $('#longUrl');
        var val = input.val();
        if (val && !val.match(/^.+:\/\/.*/)) {
            destValue = "http://" + $('#longUrl').val();
        } else {
            destValue = $('#longUrl').val();
        }

        $.ajax({
            url: "https://api.rebrandly.com/v1/links/",
            type: "post",
            data: JSON.stringify({
                "destination": destValue,
                "domain": {
                    "fullName": "clkhx.link"
                }
            }),
            headers: {
                "Content-Type": "application/json",
                "apikey": "faa6113eb476435986faf3870d034241"
            },
            dataType: "json",
            success: function(link) {
                var lShort = link.shortUrl;
                var lLong = link.destination;
                var lIdent = link.id;
                var lTitle = link.title;
                $('#shortUrl').attr("href", "http:\/\/www." + lShort).html("www." + lShort).removeClass("subtitle");
            }
        });
    }
});
