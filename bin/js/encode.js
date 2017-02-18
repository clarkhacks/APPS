

function base64_encode() {

  Base64 = {
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
    decode: function(e) {
      var t = "";
      var n, r, i;
      var s, o, u, a;
      var f = 0;
      e = e.replace(/[^A-Za-z0-9+/=]/g, "");
      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
          t = t + String.fromCharCode(r)
        }
        if (a != 64) {
          t = t + String.fromCharCode(i)
        }
      }
      t = Base64._utf8_decode(t);
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
  // Check for hash already
  if (window.location.hash){
    var encodedHash = window.location.hash.substr(1);
    var decodedHash = Base64.decode(encodedHash);
    document.getElementById("myRawNotes").value = decodedHash;
    console.log(decodedHash);
      };
getBaseData();
};
function getBaseData() {
  var textNoteData = document.getElementById("myRawNotes").value;
  // Define the string
  var rawNoteData = textNoteData;
  var rawNoteTitle = document.getElementById("rawNoteTitle").value;

  // Encode the String
  baseNotes = Base64.encode(rawNoteData);
  titleHash = encodeURI(rawNoteTitle);
  console.log(baseNotes + "?" + titleHash);

return baseNotes;
}
// BEGIN SHORT


function makeShort()
{
   var longUrl= "https://apps.clarkhacks.com/bin/" + "view#" + baseNotes + "?" + titleHash;
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
                document.getElementById("myRawNotes").style.height = heights -220 + "px";
            }
            resize();
            window.onresize = function() {
                resize();
            };
