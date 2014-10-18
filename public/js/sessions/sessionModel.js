function SessionModel() {
      if (!( this instanceof SessionModel ))
        return new SessionModel()
}

SessionModel.prototype.initialize = function( session ) {
  this.session = session;
}

SessionModel.prototype.collectNewPubData = function() {
  // var linkRoot = "http://localhost:3000/stream/?room_id="
  // var newSessionId = this.session.sessionId;
  // var newPubStreamId = publisher.id;
  // var _pubHasAccess = publisher.accessAllowed;
  // var pubSession = this.publisher.session;
  // var pubSessionState = this.publisher.session.currentState;
  // var pubStreams = this.publisher.session.streams;
  // var pubToken = this.publisher.session.token;
  // var methodToDisconnectPubSession = this.publisher.session.disconnect;
  // var methodToUnpublishPub = this.publisher.session.unpublish;
  // var pubLinkToShare = linkRoot + newPubStreamId;

  // console.log( linkRoot )
  // console.log( newSessionId )
  // console.log( newPubStreamId )
  // console.log( _pubHasAccess )
  // console.log( pubSession )
  // console.log( pubSessionState )
  // console.log( pubToken )
  // console.log( methodToDisconnectPubSession )
  // console.log( methodToUnpublishPub )
  // console.log( pubLinkToShare )

}

SessionModel.prototype.userSessionData = function( e ) {
  event.preventDefault();
}

SessionModel.prototype.userSendInvite = function( e ) {
  event.preventDefault();
}

SessionModel.prototype.userHardwareSettings = function( e ) {
  event.preventDefault();
}

var sessionModel = new SessionModel();