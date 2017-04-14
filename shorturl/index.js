$('#createShortU').click(function(e) {
  $('.createMsg').fadeIn();
        var input = $('#longUrl');
        var val = input.val();
        if (val && !val.match(/^.+:\/\/.*/)) {
            destValue = "http://" + $('#longUrl').val();
        } else {
            destValue = $('#longUrl').val();
        }
        var slugValI = $('#slug').val();
        if (slugValI) {
            slugValue = slugValI;
        }
        else {
          slugValue = "";
        }

        $.ajax({
            url: "https://api.rebrandly.com/v1/links/",
            type: "post",
            data: JSON.stringify({
                "destination": destValue,
                "domain": {
                    "fullName": "clkhx.link"
                },
                "slashtag": slugValue
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
                $('#shortUrl').attr("href", "http:\/\/www." + lShort).html("www." + lShort);
                $('.createMsg').hide();
                $('.newShortLink').removeClass('hidden');
            },
    error: function(){
       $('.createMsg').html("Error: Name Already Taken");
    }
        });
});
