/** @jsx React.DOM */
var greetUser = React.createClass({
  render: function() {
    return (
      <p>A ready-when-you-are web application for connecting through video chat, messaging, file sharing and more.
        You can record and save the videos for later viewing.
        <br />
        <br />
        Set up a chat with a friend or a colleague, a study buddy or a loved one. You can make a reservation for a later time and send off an invite now.
        <br />
        <br />
        Please login or signup to get started or select learn more.</p>
    );
  }
});

React.renderComponent(
    < greetUser />,
    document.getElementById("meetJumboContent")
);