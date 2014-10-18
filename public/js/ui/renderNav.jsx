/** @jsx React.DOM */

var NavBar = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function( index ){


    if( index === 0 && location.href !== 'http://localhost:3000' ){
        location.href = 'http://localhost:3000'
        this.setState( { focused: index } );
    }

    if( index === 1 && location.href !== 'http://localhost:3000/stream' ){
        location.href = 'http://localhost:3000/stream'
        this.setState( { focused: index } );
    }

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

            </div>
        );

    }
});

React.renderComponent(
    <NavBar navItems={ ['Home', 'Stream', 'About'] } />,
    document.getElementById("navBar")
);


