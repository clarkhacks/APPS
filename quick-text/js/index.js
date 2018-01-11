if(window.location.hash){
  var myDataRef = new Firebase('https://clarkhacks-db.firebaseio.com/quick-text/' + window.location.hash);
   }
else {
  var myDataRef = new Firebase('https://clarkhacks-db.firebaseio.com/quick-text');
   }
var textboxRef = myDataRef.child('textbox');
var $textbox = $('#textbox');
textboxRef.on('value', function(snapshot) {
  console.log("From Firebase:", snapshot.val());
  $textbox.val(snapshot.val().text);
});
$textbox.keyup(function() {
  textboxRef.set({
    text: $textbox.val()
  });
});
