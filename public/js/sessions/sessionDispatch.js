function SessionDispatch() {
      if (!( this instanceof SessionDispatch ))
        return new SessionDispatch()
};


SessionDispatch.prototype.initialize = function( session, callback )  {
    this.session = session;
    callback();
  }

  SessionDispatch.prototype.dispatcher = function() {
    this.session.on( "sessionConnected", this.sessionConnected, this );
    this.session.on( "sessionDisconnected", this.sessionDisconnected, this );

      this.sessionStart();
  }

var sessionDispatch = new SessionDispatch();