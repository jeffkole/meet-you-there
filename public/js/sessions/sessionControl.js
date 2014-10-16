function SessionControl() {
      if (!( this instanceof SessionControl ))
        return new SessionControl()
};

SessionControl.prototype.initialize = function( SessionDispatch, SessionModel, SessionView ) {
  this.SessionModel = SessionModel;
  this.SessionView = SessionView;
  this.SessionDispatch = SessionDispatch;
  this.session = TB.initSession( sessionId );
    // we initialize the event listeners and the dispatcher so it's ready to fire on user
    // and hardware events before they happen. We retain the session via call() and inject the controller.
    // The controller gives us the callback to invoke sessionStart which will connect the user.
    // It also gives us all the methods that the dispatcher invokes, which will be registered
    // as callbacks when fired upon. The will be fired upon when an event listener in the controller
    // invokes the corresponding behavior in the model.

    // listen --> trigger --> dispatch --> respond
    // Dispatcher = High-Level Bevavior, Controller = Mid-Level Behavior, Models & Views = Low-Level Behavior
    this.SessionDispatch.initialize.call( this, SessionControl.prototype ) ;

      this.bindListeners();
  }

SessionControl.prototype.bindListeners = function() {
  document.getElementById( "checkDevice" ).addEventListener( "click", this.SessionModel.checkDevice, false );
  document.getElementById( "sendInvite" ).addEventListener( "click", this.SessionModel.sendInvite, false );
  document.getElementById( "startRecording" ).addEventListener( "click", this.SessionModel.startRecording, false );
  document.getElementById( "stopRecording" ).addEventListener( "click", this.SessionModel.stopRecording, false );
  document.getElementById( "endSession" ).addEventListener( "click", this.SessionModel.endSession, false );
  }

SessionControl.prototype.sessionStart = function( session ) {
  this.publisher = TB.initPublisher( apiKey, "publisher", { width:800, height:400 } )
    session.connect( apiKey, token );
  }

// the below function are handlers that respond when the dispatcher fires
SessionControl.prototype.sessionConnected = function( event ) {
  if ( event.target.currentState === "connected" ) {
      this.SessionView.renderGreeting( this.session );
    }
  }

SessionControl.prototype.sessionDisconnected = function( event ) {
  this.SessionView.renderDisconnection( event.reason );
  }

var sessionControl = new SessionControl();