function directUrl(){
  var lnk = document.getElemntById("lnk"); // Anchor Link
  var lnkText = document.getElemntById("lnkText"); // Raw Link Text
  var roomId = document.getElemntById("userInput"); //Text Input
  lnk.a.href = "../doc#" + roomId;

};
