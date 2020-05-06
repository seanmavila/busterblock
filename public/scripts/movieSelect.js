
$( document ).ready(function(){

  console.log("Doc is ready for exe");
  console.log(movies);

  var selectedMovies = new Map();

  $(".movieTableRow").click(function(object){
    console.log("a row was clicked");

    //check if movie is already slected then add or remove
    if(!selectedMovies.has($(object.currentTarget).attr('id')))
    {
      console.log("the table was added to list");
      selectedMovies.set($(object.currentTarget).attr('id'), movies[$(object.currentTarget).attr('id')-1]);

    }
    else
    {
      console.log("the table was removed from list");
      selectedMovies.delete($(object.currentTarget).attr('id'));
    }
    $(object.currentTarget).toggleClass("movieTableRowSelected");


    console.log(selectedMovies);
  });

});
