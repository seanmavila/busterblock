//a home for some js
$( document ).ready(function(){
  //doc ready
  console.log("Document is ready for execution");
  $('#getData').click(function(){
    console.log("Getting movie Data Now...");
    $.post("/getAllMovies",function(data){
      console.log(data);
    });
  });

});
