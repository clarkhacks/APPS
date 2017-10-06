    function sendEmail() {
      var toUser = "6183650808@vtext.com";
      var subject = "Note";
      var message = document.getElementById("message").value;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("button").innerHTML = "SENT";
        
        }
      };
      xhttp.open(
        "GET",
        "https://apis.clarkhacks.com/send?sendTo=" +
        toUser +
        "&sendWhat=" +
        message +
        "&subject=" +
        subject,
        true
      );
      xhttp.send();
    }