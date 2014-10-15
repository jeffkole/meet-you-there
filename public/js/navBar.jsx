/** @jsx React.DOM */

var NavBar = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function( index ){
        this.setState( { focused: index } );

        // console.log( this );
        // console.log( this.props.navItems );

        if( index == 0 && location.href != 'http://localhost:3000/'){
            location.href = 'http://localhost:3000/'
        }
         if( index == 1 && location.href != 'http://localhost:3000/stream'){
            location.href = 'http://localhost:3000/stream'
        }
         if( index == 2 && location.href != 'http://localhost:3000/about'){
            location.href = 'http://localhost:3000/about'
        }
  },
  handleSubmit: function(e) {
    // e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },

    render: function() {
    // context is lost to window on second return <li> and we need two different references in the call to render
    var self = this;

    // map over the navItems in <ul> and return in <li>
        return (
            <div>
                <ul>{ this.props.navItems.map(function( navItem, index ){

                    var style = '';

                    if(self.state.focused == index){
                        style = 'focused';
                    }
                    return <li className={style} onClick={ self.clicked.bind( self, index ) }>{ navItem }</li>;
                }) }

                </ul>

                <p>Selected: { this.props.navItems[this.state.focused] }</p>
            </div>
        );

    }
});

React.renderComponent(
    <NavBar navItems={ ['Home', 'Stream', 'About'] } />,
    document.getElementById("navBar")
);


