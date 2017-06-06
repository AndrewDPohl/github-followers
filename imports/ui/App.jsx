import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
// App component - represents the whole app
export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {  
                        follower: [],
                        count: 1,
                        noMore: false,
                        notFound: false,
                        noFollowers: false
                     };
  }

    tryAgain(event) { 
        this.setState({
                        follower: [],
                        count: 1,
                        user: '',
                        noMore: false,
                        notFound: false,
                        noFollowers: false
                    });
        this.refs.textInput.value = '';
    }

    loadMore(event) {
        this.setState({count: ++this.state.count});
        const input = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        return $.getJSON('https://api.github.com/users/' + input + '/followers?page=' + this.state.count)
            .then((data) => {
                if(data.length === 0) {
                    this.setState({ noMore: true });
                    console.log(this.state.noMore);
                } else {
                    console.log(data);
                    console.log(this.state.count);
                    this.setState({follower: this.state.follower.concat(data)});
                }
            });
    }
  
    findFollowers(event) {
        event.preventDefault();
        this.setState({count: ++this.state.count});
 
        // Find the text field via the React ref
        const input = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    
        return $.getJSON('https://api.github.com/users/' + input + '/followers')
            .success((data) => {
                if (data.length === 0) {
                    this.setState({ 
                                    noFollowers: true,
                                    noMore: true 
                                });
                } else if (data.length < 30) {
                    this.setState({ noMore: true });
                }
                console.log(data);
                this.setState({ 
                                follower: data, 
                                user: input 
                            });
            }).fail((error) => {
                this.setState({ 
                                noMore: true, 
                                notFound: true 
                            });
            });
    }

    render() {

        const userName = this.state.user;

        const followers = this.state.follower.map((item, i) => {
            return <div key={i} className="each-follower col-xs-6 col-sm-4 col-lg-2">
                <a href={item.html_url} target="_blank" className="follower-link">
                    <h1 className="follower-login">{item.login}</h1>  
                    <img src={item.avatar_url} className="follower-image" />
                </a>   
            </div>
        });

        return (
            <div className="body-container">
                <div className="main-header-container col-xs-12">
                    <header className="main-header">
                        <h1 className="main-title">Let's See Those Github Followers, Shall We?</h1>
                        <form className="new-search form-group" onSubmit={this.findFollowers.bind(this)} >
                            <input
                                className="form-control"
                                type="text"
                                ref="textInput"
                                placeholder="Enter A Github User Name and Press Enter"
                            />
                        </form>
                        <button className="try-again btn btn-default" onClick={this.tryAgain.bind(this)}>Try Again</button>
                        { this.state.count >= 2 ?
                            <button className={"load-more btn btn-default " + (this.state.noMore ? 'hide' : 'show')} onClick={this.loadMore.bind(this)}>Load More</button> : ''
                        }
                        { userName ? 
                            <h2 className="userName">The user you're looking up is <a href={"https://github.com/" + userName + ""} target="_blank"><span className="name">{ userName }</span></a></h2> : ''
                        }
                        { this.state.notFound ?
                            <h2 className="not-found">That User Was Not Found, Try Again</h2> : ''
                        }
                        { this.state.noFollowers ?
                            <h2 className="no-followers">There are no followers for this user, Try Again</h2> : ''
                        }
                    </header>
                </div>
                <div className="main-follower-container">
                    <div className="followers col-xs-12">
                        { followers }
                    </div>
                </div>
            </div>
        );
    }
}