/** @jsx React.DOM */

// components can persist state data
// this data can be accessed by : this.state
// when this data changes, it can be re-rendered by : render()
// this.props can take input data
var TimerComponent = React.createClass({displayName: 'timerClass',
  getInitialState: function() {
    return { secondsElapsed: 0 };
  },
  tickTock: function() {
    console.log( this )
    console.log( this.state )
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  componentDidMount: function() {
    console.log( this.interval )
    this.interval = setInterval( this.tickTock, 1000 );
  },
  componentWillUnmount: function() {
    clearInterval( this.interval );
  },
  render: function() {
    console.log( this.state )
    return (
      React.DOM.div(null, "Class has been in session for ", this.state.secondsElapsed, " seconds")
    );
  }
});

React.renderComponent( TimerComponent( null ), document.getElementById('timer') );