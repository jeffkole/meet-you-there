function SessionPanel() {};

SessionPanel.prototype = {
  renderPanel : function( session, publisher, callback ){
    // var parentDiv = document.getElementById('publisherContainer');
    // var div = document.createElement('div');
    // div.setAttribute('id', 'opentok_publisher');
    // parentDiv.appendChild( div );
    // publisher.addEventListener('settingsButtonClick', callback );
  },
 settingsButtonClickHandler : function( event ) {
    event.preventDefault();
    var newDiv = document.createElement('div');
    newDiv.id = 'devicePanel';
    document.getElementById('devicePanelContainer').appendChild( newDiv );
    deviceManager = TB.initDeviceManager( apiKey );
    devicePanel = deviceManager.displayPanel( 'devicePanel', publisher );
 }
}

var sessionPanel = new SessionPanel();

