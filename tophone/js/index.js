    function sendEmail() {
      var subject = "Note";
      var message = document.getElementById("message").value;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("button").value = "SENT";

        }
      };
      xhttp.open(
        "GET",
        "https://apis.clarkhacks.com/send" +
        "?&sendWhat=" +
        message +
        "&subject=" +
        subject,
        true
      );
      xhttp.send();
    }
