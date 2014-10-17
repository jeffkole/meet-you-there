function SessionControl() {
/*
  instantiating the session onto the controller's constructor object
*/
      this.session = TB.initSession( sessionId );

      if (!( this instanceof SessionControl ))
        return new SessionControl();
}

SessionControl.prototype.initialize = function( SessionDispatch, SessionModel, SessionView ) {
/*
  injecting the dispatcher, model and view into the controller
  injecting the session into the model & view, initializing the dispatcher and binding to rendered DOM elements
*/
  this.SessionModel = SessionModel;
  this.SessionView = SessionView;
  this.SessionDispatch = SessionDispatch;

    this.SessionModel.initialize( this.session );
    this.SessionView.initialize( this.session );
    this.SessionDispatch.initialize( this.session, this.SessionDispatch.dispatcher.bind( this ) );

      this.bindListeners();
}

SessionControl.prototype.bindListeners = function() {
  document.getElementById( "pubStreamButton" ).addEventListener( "click", this.userPubStream.bind( this ), false );
  document.getElementById( "checkDevice" ).addEventListener( "click", this.SessionModel.userCheckDevice, false );
  document.getElementById( "sendInvite" ).addEventListener( "click", this.SessionModel.userSendInvite, false );
  document.getElementById( "startRecording" ).addEventListener( "click", this.SessionModel.userStartRecord, false );
  document.getElementById( "stopRecording" ).addEventListener( "click", this.SessionModel.userStopRecord, false );
}

/*
  binds listeners to DOM elemenets that are hidden to begin with, and rendered on a successful connection
*/
SessionControl.prototype.bindRevealedListeners = function() {
  document.getElementById( "statusButton" ).addEventListener( "click", this.SessionModel.userConnectStatus, false );
  document.getElementById( "disconnectButton" ).addEventListener( "click", this.userDisconnect, false );
      console.log( "Node count after render : ", document.childNodes.length, "and the current time is:" + Date.now() );
}

/*--------------------------------------------------------------------------------
  HANDLERS FOR INITIALIZING NEW SESSIONS, CONNECTIONS, PUBLISHERS AND SUBSCRIBERS
----------------------------------------------------------------------------------*/

/*
  init new session object
*/
SessionControl.prototype.sessionStart = function() {
  this.session.connect( apiKey, token );
  console.log( "Step 1 of 3 Complete : New session created." );
}

/*
  session.connect callback verifying the client's connection state
*/
SessionControl.prototype.sessionConnected = function( event ) {
  if ( event.target.currentState === "connected" ) {
      console.log( "Step 2 of 2 Complete : Client connection verified." );
  }
  else {
    alert( "We cannot establish a connection due to the following error : " + event.reason );
  }
}

/*
  the session object has been instantiated, the client has connected and now we are instantiating
  the publisher object and publishing it to the session within the callback of the connection created event
*/
SessionControl.prototype.connectionCreated = function( event ) {

    streamCompletedAt = Date.now();
    timeToComplete = ( clickedOnStreamAt - streamCompletedAt ) + " ms";
    console.log( "Step 3 of 3 Is Complete. Time taken from click to complete : "  +  timeToComplete );

      this.publisher = TB.initPublisher( apiKey, "publisher", { width:800, height:400 } );
      this.session.publish( this.publisher );

/*
  renders hidden DOM elements : connection status and disconnect option
  passes the callback bindReaveleadListeners and invokes collect publisher data
*/
    this.SessionView.renderSessionStatus( this.bindRevealedListeners );
    this.SessionView.renderDisconnectOption();
    // this.Model.collectPubData();

}
/*-----------------------------------------------------------
  HANDLERS FOR LIVE CONNECTIONS
------------------------------------------------------------*/

/*
  when a session disconnects
*/
SessionControl.prototype.sessionDisconnected = function( event ) {
  this.SessionView.renderDisconnection( event.reason );
}

/*
  when a new stream is created
*/
SessionControl.prototype.streamCreated = function( event ) {
  this.subscriber = session.subscribe( event.stream, "#subStream" );
    console.log( "A new stream has been created : " + event.stream );
}

/*
  when a stream is destroyed
*/
SessionControl.prototype.streamDestroyed = function( event ) {
  this.SessionView.renderDestroyed( event.reason );
    console.log( "The stream has been destroyed because : " + event.reason );
}

/*------------------------------------------
   HANDLERS FOR USER EVENTS
------------------------------------------*/

/*
  when a user clicks on create new stream
*/
SessionControl.prototype.userPubStream = function( e ) {
  event.preventDefault();
  clickedOnStreamAt = Date.now();

    this.sessionStart();
}

/*
  when a user clicks on settings
*/
SessionControl.prototype.userSettings = function( e ) {
    event.preventDefault();
}

/*
  when a user clicks on invite
*/
SessionControl.prototype.userSendInvite = function( e ) {
    event.preventDefault();
}

/*
  when a user clicks on record
*/
SessionControl.prototype.userStartRecord = function( e ) {
    event.preventDefault();
}

/*
  when a user clicks on stop
*/
SessionControl.prototype.userStopRecord = function( e ) {
    event.preventDefault();
}

/*
  when a user clicks on disconnect
*/
SessionControl.prototype.userDisconnect = function( e ) {
    event.preventDefault();
}

var sessionControl = new SessionControl();