// Create Base64 Object
function base64_encode() {

  var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
      var t = "";
      var n, r, i, s, o, u, a;
      var f = 0;
      e = Base64._utf8_encode(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64
        } else if (isNaN(i)) {
          a = 64
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
      }
      return t
    },
    _utf8_encode: function(e) {
      e = e.replace(/rn/g, "n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode(r >> 6 | 192);
          t += String.fromCharCode(r & 63 | 128)
        } else {
          t += String.fromCharCode(r >> 12 | 224);
          t += String.fromCharCode(r >> 6 & 63 | 128);
          t += String.fromCharCode(r & 63 | 128)
        }
      }
      return t
    },
    _utf8_decode: function(e) {
      var t = "";
      var n = 0;
      var r = c1 = c2 = 0;
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
          n++
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t += String.fromCharCode((r & 31) << 6 | c2 & 63);
          n += 2
        } else {
          c2 = e.charCodeAt(n + 1);
          c3 = e.charCodeAt(n + 2);
          t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          n += 3
        }
      }
      return t
    }
  }

  var textNoteData = document.getElementById("myRawNotes").value;
  // Define the string
  var rawNoteData = textNoteData;

// 	Check for hash already
	// if (window.location.hash){
	//     getElementById("rawNoteData").value = window.location.hash.substr(1);
	//     };

  // Encode the String
  baseNotes = Base64.encode(rawNoteData);
  console.log(baseNotes);

return baseNotes;


};
// BEGIN SHORT


function makeShort()
{
   var longUrl= "https://apps.clarkhacks.com/bin/" + "view#" + baseNotes;
    var request = gapi.client.urlshortener.url.insert({
    'resource': {
      'longUrl': longUrl
	}
    });
    request.execute(function(response)
	{

		if(response.id != null)
		{

			str ="<input id=\"shareUrlOutput\" type=\"text\" value='" +response.id+ "'>";
			document.getElementById("output").innerHTML = str;
		}
		else
		{
			alert("error: creating short url");
		}

    });

    // Get the shareModal
    var shareModal = document.getElementById('myshareModal');
    // Get the <span> element that closes the shareModal
    var span = document.getElementsByClassName("close")[0];
        shareModal.style.display = "block";

    // When the user clicks on <span> (x), close the shareModal
    span.onclick = function() {
        shareModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the shareModal, close it
    window.onclick = function(event) {
        if (event.target == shareModal) {
            shareModal.style.display = "none";
        }
    }

 }

function load()
{
	gapi.client.setApiKey('AIzaSyCj6iJYpEmBlZRRMgr_8Mwa-fKrjvXjSMU'); //get your ownn Browser API KEY
	gapi.client.load('urlshortener', 'v1',function(){});

}
window.onload = load;

            function resize()
            {
                var heights = window.innerHeight;
                document.getElementById("myRawNotes").style.height = heights -160 + "px";
            }
            resize();
            window.onresize = function() {
                resize();
            };
