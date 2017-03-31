Reveal.initialize({
    controls: true,
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
var ref = new Firebase("https://clarkhacks-db.firebaseio.com/slides");
Reveal.addEventListener( 'slidechanged', function( event ) {  
  ref.set({currentslideX : Reveal.getState().indexh,
         currentslideY : Reveal.getState().indexv
        });
});
ref.on("value", function(snapshot) {
  Reveal.slide(snapshot.val().currentslideX,snapshot.val().currentslideY);
});
