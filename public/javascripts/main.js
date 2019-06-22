//copied from https://www.w3schools.com/jquery/jquery_filters.asp
$(document).ready(function() {
  $("#search").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#users tbody tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});
