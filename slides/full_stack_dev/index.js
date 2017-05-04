Reveal.initialize({
    controls: false,
    progress: true,
    history: true,
    center: true,
    transition: 'convex',
    touch: true,
    hideAddressBar: true,
    dependencies: [ {
        src: '//cdnjs.cloudflare.com/ajax/libs/reveal.js/3.2.0/plugin/zoom-js/zoom.min.js',
        async: true
      }, {
        src: '//cdnjs.cloudflare.com/ajax/libs/reveal.js/3.2.0/plugin/notes/notes.min.js',
        async: true
      }, {
        src: '//cdnjs.cloudflare.com/ajax/libs/reveal.js/3.2.0/plugin/highlight/highlight.min.js',
        async: true,
        callback: function() {
          return hljs.initHighlightingOnLoad();
        }
      }
    ]
  });
  var config = {
    apiKey: "AIzaSyBdf7B8CGVoaos7-Q4W4lPMi0A4N0LRp7E",
    authDomain: "clarkhacks-db.firebaseapp.com",
    databaseURL: "https://clarkhacks-db.firebaseio.com",
  };
  firebase.initializeApp(config);
var ref = firebase.database().ref("/slides");
if(window.location.href.indexOf("") > -1) {
  Reveal.configure({ controls: true, touch: true });
Reveal.addEventListener( 'slidechanged', function( event ) {  
  ref.set({currentslideX : Reveal.getState().indexh,
         currentslideY : Reveal.getState().indexv
        });
});
};
ref.on("value", function(snapshot) {
  Reveal.slide(snapshot.val().currentslideX,snapshot.val().currentslideY);
});
