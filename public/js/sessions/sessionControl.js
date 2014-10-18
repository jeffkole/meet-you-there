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
  injecting the session into the dispatcher,  model and view,
  initializing the session dispatcher with the session object and binding to rendered DOM elements
*/
  this.SessionModel = SessionModel;
  this.SessionView = SessionView;
  this.SessionDispatch = SessionDispatch;

    this.SessionModel.initSession( this.session );
    this.SessionView.initSession( this.session );
    this.SessionDispatch.initSession( this.session, this.SessionDispatch.dispatchSessionEvents.bind( this ) );

      this.bindListeners();
}

SessionControl.prototype.bindListeners = function() {
  document.getElementById( "newPubStream" ).addEventListener( "click", this.newUserPub.bind( this ), false );
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
   on user-click-stream, we inoke the dispatcher with session.connect and initialize a new client connection
*/
SessionControl.prototype.sessionStart = function() {
  this.session.connect( apiKey, token );
  console.log( "Step 1 of 3 Complete : New session created." );
}

/*
  sessionConnected callback verifying the client's connection state
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

/*
  declares a new publisher object, passes in DOM element, no options, and the
  callback to pass the new publisher object with the controller's context
*/
  this.publisher = OT.initPublisher('pubStreamContainer',  null, this.SessionModel.collectNewPubData.bind( this, this.publisher ), false );

/*
  injects the publisher object into the model, view and dispatch
 */
    this.SessionModel.initPublisher( this.publisher );
    this.SessionView.initPublisher( this.publisher );
    this.SessionDispatch.initPublisher( this.publisher );

/* collects and styles the publisher camera container ( for the view of themselves ) */
  this.pubElement = document.getElementById( this.publisher.id );

    this.pubElement.style.width = "360px"
    this.pubElement.style.height = "270px"
    this.pubElement.style.backgroundColor = "#000"
    this.pubElement.style.border = "1px solid #41C7C2"

/* injects the publisher into the session, which will trigger the callback to fire on the event publisherConnected
   we can have the dispatcher be responsible for invoking this event by ommiting the callback
*/
  this.session.publish( this.publisher );

/* logs tests */
    streamCompletedAt = Date.now();
    timeToComplete = ( clickedOnStreamAt - streamCompletedAt ) + " ms";
    console.log( "Step 3 of 3 Is Complete. Time taken from click to complete : "  +  timeToComplete );

/*
  renders hidden DOM elements : connection status and disconnect option
  passes the callback bindReaveleadListeners
*/
  this.SessionView.renderSessionStatus( this.bindRevealedListeners );
  this.SessionView.renderDisconnectOption();
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
SessionControl.prototype.streamCreated = function( event ) {}

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
  when a user clicks on create new stream, we initialize the connection
  sessionStart will invoke session.connect and alert the dispatcher to begin the client connection process
*/
SessionControl.prototype.newUserPub = function( e ) {
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