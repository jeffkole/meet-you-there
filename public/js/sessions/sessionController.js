window.onload = function(){
  sessionController.initialize( sessionTracker, sessionPanel )
};

function SessionController() {};

SessionController.prototype = {
  initialize : function( sessionTracker, sessionPanel ){
    this.publishStream( sessionTracker.initialize, sessionPanel );
  },
  publishStream : function( trackerCallback, panelCallback ) {
    var session = TB.initSession( sessionId );
  // init publisher with id="publisher"
    var publisher = TB.initPublisher( apiKey, "publisher", { width:800, height:400 } )
  session.on({

  // sessionConnected() runs when session.connect() asynchronously completes
  sessionConnected: function( event ) {
    // publish the publisher  ( this will trigger 'streamCreated' on other clients )
    session.publish( publisher );
    trackerCallback( session )
    panelCallback.renderPanel( session, publisher, panelCallback.settingsButtonClickHandler )

  },
  //  runs when another client publishes a stream ( session.publish() )
  streamCreated: function( event ) {
    // creates subscribers container
    var subContainer = document.createElement('div');
    subContainer.id = 'stream-' + event.stream.streamId;
    document.getElementById('subscribers').appendChild( subContainer );

    // subscibes to the to the stream that caused this event, adds to container
     session.subscribe( event.stream, subContainer );
  }
});
   // connect to session
    session.connect( apiKey, token );
  }
}

var sessionController = new SessionController();

