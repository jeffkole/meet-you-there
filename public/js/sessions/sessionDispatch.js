function SessionDispatch() {}


SessionDispatch.prototype.initialize = function( session, callback ) {
  this.session = session;

  console.log( "In SessionDispatch.initialize 'this' points to SessionDispatch : ", ( this instanceof SessionDispatch ) );

    callback();
}

/*
  For dispatchSessionEvents, dispatchPubEvents and dispatchSubscriberEvents, the callback that each is invoked
  by was bound in the context where it was passed so it retains the same body as the function body it is called on.
  so - this - in the functions below  points to an instance of the controller's constructor and
  the above functions reatin their function body's as prototypes of the SessionDispatch object.
 */

SessionDispatch.prototype.sessionEvents = function() {
/* we initialize the session dispatcher so its ready before any events occur */
  console.log( "In SessionDispatch.sessionEvents 'this' points to SessionControl : ", ( this instanceof SessionControl ) );
/* the app will first fire on sessionConnected, when session.connect is invoked in the controller */

  this.session.on( "sessionConnected", this.sessionConnected, this );
/* then it will fire on connectionCreated, where we inject either a publisher or subscriber into the session */
  this.session.on( "connectionCreated", this.connectionCreated, this );
  this.session.on( "sessionDisconnected", this.sessionDisconnected, this );

  this.session.on( "streamCreated", this.streamCreated, this );
  this.session.on( "streamDestroyed", this.streamDestroyed, this );
}

SessionDispatch.prototype.pubEvents = function( publisher ) {
// this.publisher = publisher;
console.log( publisher )
/* we initialize the publisher dispatcher so its ready before any connected-publisher events occur */
  console.log( "In SessionDispatch.pubEvents 'this' points to SessionDispatch : ", ( this instanceof SessionDispatch ) );

publisher.on( "publisherConnected", SessionControl.publisherConnected, this );
publisher.on( "connectionCreated", SessionControl.connectionCreated, this ); // the docs give this the same handler as the session. I changed it.
publisher.on( "publisherDisconnected", SessionControl.publisherDisconnected, this );
}

var sessionDispatch = new SessionDispatch();