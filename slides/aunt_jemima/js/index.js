Reveal.initialize({
    controls: false,
    progress: true,
    history: true,
    center: true,
    fragments: true,
    transition: 'convex',
    touch: flase,
    hideAddressBar: true,
    dependencies: [ {
        src: 'https://cdn.clarkhacks.com/reveal/3.4.1/plugin/zoom-js/zoom.js',
        async: true
      }, {
        src: 'https://cdn.clarkhacks.com/reveal/3.4.1/plugin/notes/notes.js',
        async: true
      }, {
        src: 'https://cdn.clarkhacks.com/reveal/3.4.1/plugin/highlight/highlight.js',
        async: true,
        callback: function() {
          return hljs.initHighlightingOnLoad();
        }
      }
    ]
  });

  var config = {
    authDomain: "clarkhacks-db.firebaseapp.com",
    databaseURL: "https://clarkhacks-db.firebaseio.com",
  };
  firebase.initializeApp(config);
  var ref = firebase.database().ref("/slides");
  if(window.location.href.indexOf("remote") > -1) {
       Reveal.configure({ controls: true, touch: true });
       Reveal.addEventListener( 'slidechanged', function( event ) {
         ref.set({currentslideX : Reveal.getState().indexh,
                currentslideY : Reveal.getState().indexv
               });
       });
}
ref.on("value", function(snapshot) {
  Reveal.slide(snapshot.val().currentslideX,snapshot.val().currentslideY);
});
