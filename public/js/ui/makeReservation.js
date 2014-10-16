window.onload = function(){
    bindListeners();
}

function bindListeners(){
    $('#t1').clockface();
$("#myCalendar-1").ionCalendar({
    lang: "en",
    sundayFirst: false,
    years: "20",
    format: "DD.MM.YYYY",
    onClick: function( date ){
        clientVerify( date )
    }
 });
}

function clientVerify( data ){
  var formattedDate = moment( data );
  console.log( formattedDate._d )
}
