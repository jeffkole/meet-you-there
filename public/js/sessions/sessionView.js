function SessionView() {
      if (!( this instanceof SessionView ))
        return new SessionView()
};

SessionView.prototype.initialize = function() {};

SessionView.prototype.renderGreeting = function( session ) {
  console.log("greet user")
  console.log( session )
};

SessionView.prototype.collectLogin = function() {};

SessionView.prototype.renderLoginSuccess = function() {};

SessionView.prototype.collectSignup = function() {};

SessionView.prototype.renderSignupSuccess = function() {};

SessionModel.prototype.renderDisconnection = function( reason ) {
  console.log( reason )
};

SessionView.prototype.renderError = function() {};

SessionView.prototype.renderException = function() {};

var sessionView = new SessionView();