$( document ).ready( function() {
  sessionControl.initialize( sessionDispatch, sessionModel, sessionView )
})

window.onload = function() {
    console.log( "Node count onload : ", document.childNodes.length, "and the current time is:" + Date.now() );
    document.getElementById( "tempConnect" ).addEventListener( "click", fadeReady, false );
}

function fadeReady( e ){
  event.preventDefault();
  $( "#tempConnect" ).velocity( "fadeOut", {  duration : 300, display: "none" } );
  setTimeout( renderNav, 315 )
}

function renderNav(){
  $( "#navOptions" ).velocity( "fadeIn", {  duration : 600, visibility : "visible", display: "block" } );
}