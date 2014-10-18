**Scott Jason, TokBox Doc Snippets & Notes**
-build in progress-

-------------------------------------------------------------------------------

to run in your local environment :

    $ **git clone https://github.com/scottjason/meet-you-there.git**

then in the root directory type :

    $ **npm install && bower install**

then again in the root directory type :

    $ **touch .env**

then copy and paste your creditentials into the .env file from TokBox

    $ **node server** and connect to http://localhost:3000/
    
-------------------------------------------------------------------------------

**SESSIONS**

A session represents an entire video chat environment. It is a collection of connections publishing and subscribing to streams. A Session also dispatches events representing changes in the Session. 

**A session is a room, each room has a unique session id**

-------------------------------------------------------------------------------

**CONNECTIONS**

A connection is a logical abstraction of a single browser tab's interaction with a Session. The connection is the mechanism through which a browser publishes and subscribes to streams within a Session.

**So a connection is the method in which the client enters a room; the way they walk through the door.**

-------------------------------------------------------------------------------

**STREAMS**

A stream is a single audio-video signal, which includes a user's published webcam and microphone feed.

-------------------------------------------------------------------------------

**AUTHENTICATION TOKENS**

When a browser or other endpoint connects to a session, it must authenticate itself by providing a server-generated token.

**Tokens are the keys used by the client to open a door and enter a room.**

-------------------------------------------------------------------------------

**PUBLISHERS & SUBSCRIBERS**

https://tokbox.com/opentok/concepts/architecture.html

A Publisher publishes audio-video streams to the chat session. 

When you instantiate a **Publisher**, your browser notifies the Session that it is now streaming a new audio-video stream. When you destroy your publisher, its stream is terminated and the Session is notified appropriately.

A **Subscriber** consumes an audio-video stream in a Session, displaying it on the web page based on calls to the OpenTok client-side library.

-------------------------------------------------------------------------------

**ORDER OF OPS**

Before  connecting to a session, instantiate a Session object.

1. init session
2. connect to session
3. Publish the publisher to the session

-------------------------------------------------------------------------------

**SESSION OBJECT INIT**

var session = TB.initSession(apiKey, sessionId);
    session.connect( token, callback ) if (err) err.code, err.message

---------------------------------

**EVENTS**
  
Event : sessionDisconnected
Methods : event.reason,  session.disconnect();

---------------------------------
Event : connectionCreated
Methods : if (event.connection.connectionId != session.connection.connectionId)

**detect when a client has connected**

---------------------------------

Event : connectionDestroyed
Methods :  connectioCount--
( detect when a client has disconnected )

---------------------------------
  
Event : "streamCreated"
Methods : subscriber = session.subscribe(event.stream, targetElement);

**The return value of the subscribe() method is the Subscriber object**

---------------------------------
Event : "streamCreated"

subscriber = session.subscribe(event.stream, targetElement);

**The return value of the subscribe() method is the Subscriber object**

---------------------------------

Pubs & Subs

**SINCE WE KNOW THAT THE CLIENT HAS SUCCESSFULLY CONNECTED TO THE SESSION WHEN THE sessionConnected EVENT OCCURS, THIS EVENT HANDLER WILL BE WHERE WE PUBLISH TO THE SESSION.**


publisher = initPub( DOM elem, pubOptions, callback )
Initialize a Publisher object : session.publish(publisher);


There is a difference between initializing a publisher object and publishing a stream to the Session . When you initialize a publisher, a local display of the published stream is created on the web. However, other users in the Session cannot see the stream yet, because the call to session.publish() has not been made.

-------------------------------------------------------------------------------

**The streamCreated Event and StreamEvent Object**

When someone in a Session publishes a stream, all connections in the Session recieve a streamCreated event. 

Event : "streamCreated"
Methods :   subscriber = session.subscribe(event.stream, targetElement); 

The return value of the subscribe() method is the Subscriber object. 

-------------------------------------------------------------------------------

**StreamEvent**

Event : streamCreated
Methid : subscriber = session.subscribe(event.stream, targetElement);
Event : streamDestroyed 

StreamEvent is an event that can have the type "streamCreated" or "streamDestroyed". These events are dispatched by the Session object when another client starts or stops publishing a stream to a Session. 

**For a local client's stream, the Publisher object dispatches the event.**

-------------------------------------------------------------------------------

**The streamCreated event is dispatched by a Publisher object**

Publishes a stream :
var publisher = session.publish(targetElement)

Add an event listener for when the streaming starts :
.on("streamCreated", function(event) {
    console.log("Publisher started streaming.");
);