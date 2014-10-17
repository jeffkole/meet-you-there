function SessionDispatch() {
      if (!( this instanceof SessionDispatch ))
        return new SessionDispatch()
};


SessionDispatch.prototype.initialize = function( session, callback )  {
    //  -this- in SessionDispatch references an instance of SessionControl
    this.session = session;
    callback();
  }
  SessionDispatch.prototype.dispatcher = function() {

    // first fire on session init, then
    this.session.on( "sessionConnected", this.sessionConnected, this );
    // then on client connect
    this.session.on( "connectionCreated", this.connectionCreated, this );


    this.session.on( "sessionDisconnected", this.sessionDisconnected, this );

    this.session.on( "streamCreated", this.streamCreated, this );
    this.session.on( "streamDestroyed", this.streamDestroyed, this );

      this.sessionStart();
  }

var sessionDispatch = new SessionDispatch();