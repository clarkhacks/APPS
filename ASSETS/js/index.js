var $products = $("#searchable .row");
$("#searchInput").keyup(function() {
  var re = new RegExp($(this).val(), "i");
  $products
    .removeClass("hidden")
    .filter(function() {
      return !re.test($(this).text());
    })
    .addClass("hidden");
});
$( ".button:even" ).addClass("button-primary");
