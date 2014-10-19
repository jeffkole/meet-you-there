function SessionControl() {
/*
  instantiating the session onto the controller's constructor object
*/
    this.session = TB.initSession( sessionId );
      console.log( this.session )
      if (!( this instanceof SessionControl ))
        return new SessionControl();
}

SessionControl.prototype.initialize = function( SessionDispatch, SessionModel, SessionView ) {
/*
  injecting the dispatcher, model and view into the controller
  injecting the session into the dispatcher, model and view,
  initializing SessionDispatch with the session object and binding the callback to the current execution context.
*/
  this.SessionModel = SessionModel;
  this.SessionView = SessionView;
  this.SessionDispatch = SessionDispatch;

  this.SessionModel.initialize( this.session );
  this.SessionView.initialize( this.session );

  this.SessionDispatch.initialize( this.session, this.SessionDispatch.sessionEvents.bind( this ) );

  this.bindListeners();
}

SessionControl.prototype.bindListeners = function() {
  document.getElementById( "streamLink" ).addEventListener( "click", this.initPubStream.bind( this ), false );
  // document.getElementById( "invite" ).addEventListener( "click", this.SessionModel.userSessionData, false );
  // document.getElementById( "reserve" ).addEventListener( "click", this.SessionModel.userHardwareSettings, false );
  // document.getElementById( "invite" ).addEventListener( "click", this.SessionModel.userSendInvite, false );
}

/*
  binds listeners to DOM elemenets that are hidden to begin with, and rendered on a successful connection
*/
SessionControl.prototype.bindRevealedListeners = function() {
  document.getElementById( "status" ).addEventListener( "click", this.SessionModel.userConnectStatus, false );
  document.getElementById( "disconnect" ).addEventListener( "click", this.userDisconnect, false );
}

/*--------------------------------------------------------------------------------
  HANDLERS FOR INITIALIZING NEW SESSIONS, CONNECTIONS, PUBLISHERS AND SUBSCRIBERS
----------------------------------------------------------------------------------*/

/*
   on user click new stream, we inoke the dispatcher with session.connect and initialize a new client connection.
   This also creates a new publisher object which will trigger the dispatcher and fire the events
   we need to  create and render a new publisher object to the session
*/
SessionControl.prototype.sessionStart = function() {
  this.session.connect( apiKey, token );
  this.publisher = OT.initPublisher( "pubContainer",  null, this.SessionModel.collectNewPubData.bind( this, this.publisher ), false );
  this.SessionDispatch.pubEvents( this.publisher );

  console.log( "Step 1 of 3 Complete : New session created." );
}

/*
  sessionConnected callback verifying the client's connection state
*/
SessionControl.prototype.sessionConnected = function( event ) {
  if ( event.target.currentState === "connected" ) {

    console.log( "Step 2 of 3 Complete : Client connection verified." );
  } else {
    alert( "We cannot establish a connection due to the following error : " + event.reason );
  }
}

/*
  the session object has been instantiated, the client has connected and now we are instantiating
  the publisher object and publishing it to the session within the callback of the connection created event
*/
SessionControl.prototype.connectionCreated = function( event ) {

/* collects and styles the publisher camera container ( for the view of themselves ) */
  this.pubElement = document.getElementById( this.publisher.id );

    this.pubElement.style.width = "360px";
    this.pubElement.style.height = "270px";
    this.pubElement.style.backgroundColor = "#000";
    this.pubElement.style.border = "1px solid #41C7C2";

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
  this.SessionView.renderStatusButton( this.bindRevealedListeners );
  this.SessionView.renderDisconnectButton();
}

/*-----------------------------------------------------------
  HANDLERS FOR LIVE SESSION EVENTS ( POST-INIT )
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

/*-----------------------------------------------------------
  HANDLERS FOR LIVE PUBLISHER EVENTS
------------------------------------------------------------*/

SessionControl.prototype.publisherConnected = function( event ) {
  console.log( "publisher is now connected.")
}
SessionControl.prototype.publisherDisconnected = function( event ) {
  console.log( "publisher has disconnected.")
}


/*-------------------------------------------------------------------
   HANDLERS FOR USER EVENTS THAT ARE REGISTERED WITH THE DISPATCHER
      CUSTOM USER EVENTS ( LIKE LOGIN ) ARE HANDLED IN THE MODEL
--------------------------------------------------------------------*/

/*
  when a user clicks on create new stream, we initialize the connection
  sessionStart will invoke session.connect and alert the dispatcher to begin the client connection process
*/
SessionControl.prototype.initPubStream = function( e ) {
  event.preventDefault();
    clickedOnStreamAt = Date.now();

      this.sessionStart();
}

/*
  when a user clicks on disconnect, we first need to know if they're a
  publisher or a subscriber so as not to inoke unintended events on
  other clients who either subscribed to or have published the session
*/
SessionControl.prototype.userDisconnect = function( e ) {
    event.preventDefault();
}

/*
  when a publisher clicks on disconnect
*/
SessionControl.prototype.disconnectPublisher = function( e ) {
    event.preventDefault();
}

var sessionControl = new SessionControl();