$( document ).ready( function() {
  sessionControl.initialize( sessionDispatch, sessionModel, sessionView )
})

window.onload = function() {
  console.log( "Node count onload : ", document.childNodes.length, "and the current time is:" + Date.now() );
}