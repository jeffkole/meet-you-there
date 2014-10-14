// components can persist state data
// this data can be accessed by : this.state
// when this data changes, it can be re-rendered by : render()
// this.props can take input data
var SessionTimer = React.createClass({displayName: 'timerClass',
  getInitialState : function() {
    return { secondsElapsed: 0 };
  },
  tickTock : function() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  componentDidMount : function() {
    this.interval = setInterval( this.tickTock, 1000 );
  },
  componentWillUnmount : function() {
    clearInterval( this.interval );
  },
  render : function() {
    console.log( this.state )
    return (
      React.DOM.div(null, "Class has been in session for ", this.state.secondsElapsed, " seconds")
    );
  }
});

React.renderComponent( SessionTimer( null ), document.getElementById('timer') );