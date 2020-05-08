
$( document ).ready(function(){

  $(".purchase-btn").click(function(){
    console.log("Try to purchase now!");
    $.post("/purchase",function(){
      location.replace("/");
    })
  });

});
