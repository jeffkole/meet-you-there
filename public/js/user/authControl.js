var UserAuth = UserAuth || {};
    UserAuth.Control = UserAuth.Control  || {};

$( document ).ready(function() {

  UserAuth.Control.bindListeners();

});


UserAuth.Control.bindListeners = function () {
  // document.getElementById( "loginButton" ).addEventListener( "click", this.renderLogin, false );
}

UserAuth.Control.renderLogin = function () {
$( "#indexContainer" ).velocity( "fadeOut", 400 );
}

// UserAuth.Control.renderSignup = function () {
// $( "#indexContainer" ).velocity( "fadeOut", 400 );
// }




  //   $( "#resetText" ).velocity("transition.perspectiveRightIn", {
  //     visibility : "visible",
  //     delay : 3500,
  //     duration : 600
  //   })
  // },