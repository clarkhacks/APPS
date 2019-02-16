function sendRequest() {
  var requestTypes = ["POST", "GET", "PUT", "PATCH"];
  var keyOne = $("#keyOne").val();
  var keyTwo = $("#keyTwo").val();
  var keyThree = $("#keyThree").val();
  var keyValueOne = $("#keyValueOne").val();
  var keyValueTwo = $("#keyValueTwo").val();
  var keyValueThree = $("#keyValueThree").val();
  var requestType = $("#requestType option:selected").val();
  var serverURL = $("#serverURL").val();

  if (
    keyOne.length > 1 &&
    keyValueOne.length > 1 &&
    keyTwo.length > 1 &&
    keyValueTwo.length > 1 &&
    keyThree.length > 1 &&
    keyValueThree.length > 1
  ) {
    var keyData = {
      keyOne: keyValueOne,
      keyTwo: keyValueTwo,
      keyThree: keyValueThree
    };
  }
  if (
    keyOne.length > 1 &&
    keyValueOne.length > 1 &&
    keyTwo.length > 1 &&
    keyValueTwo.length > 1 &&
    keyThree.length < 1 &&
    keyValueThree.length < 1
  ) {
    var keyData = {
      keyOne: keyValueOne,
      keyTwo: keyValueTwo
    };
  }
  if (
    keyOne.length > 1 &&
    keyValueOne.length > 1 &&
    keyTwo.length < 1 &&
    keyValueTwo.length < 1 &&
    keyThree.length < 1 &&
    keyValueThree.length < 1
  ) {
    var keyData = {
      keyOne: keyValueOne
    };
  }
  else{
      $.ajax({
    url: serverURL,
    cache: false,
    type: requestType,
    success: function(response) {
      $("#response").val(JSON.stringify(response));
    },
    error: function(xhr) {
      alert("Dude, Idk something went wroonnggg.");
    }
  });
  }
  $.ajax({
    url: serverURL,
    data: keyData,
    cache: false,
    type: requestType,
    success: function(response) {
      $("#response").val(JSON.stringify(response));
    },
    error: function(xhr) {
      alert("Dude, Idk something went wroonnggg.");
    }
  });
}