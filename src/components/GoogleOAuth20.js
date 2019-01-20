import React, {Component} from 'react';
import clientId from '../config/key';

class GoogleOAuth20 extends Component {

  // isSignedIn is to show login status

  state = { isSignedIn: null, currentUser : null}

  componentDidMount() {
    window.gapi.load('client:auth2', async ()=>{
        await window.gapi.client.init({
          // substitute your own clientId here.
          clientId: clientId,
          // scope can be profile, email, etc..
          scope: 'profile'});
        this.auth = window.gapi.auth2.getAuthInstance();
        // disconnect() prevents auto sign-in. auto sign-in is still useful if only one google account is used.
        this.auth.disconnect();
        // this.auth.isSignedIn.get() is the method to check if a user is signed in/out.
        // console.log(this.auth.isSignedIn.get());
        this.authChange();
        // listen event to monitor login/out status.
        this.auth.isSignedIn.listen(this.authChange);
      }
    )
  }

  authChange = () => {
    const isSignedIn = this.auth.isSignedIn.get()
    this.setState({isSignedIn } )

    isSignedIn ? this.setState({currentUser : this.auth.currentUser.get().getId()})
               : this.setState({currentUser:""});
  }

  // sign in/out method
  // window.gapi.auth2.getAuthInstance().signIn();
  // window.gapi.auth2.getAuthInstance().signOut();


  signIn =  () => {
    this.auth.signIn();
  }

  signOut = () => {
    this.auth.signOut();
  }


  signInStatus = () => {
    if (this.state.isSignedIn === null )
      return null;
    else if (this.state.isSignedIn === true )
      return <button onClick={this.signOut}>Sign Out</button>
    else
      return <button onClick={this.signIn}>Sign In</button>
  }


  render() {
    return (
      <div>
        <p>SignIn status </p>
        <p></p>
        Current User: {this.state.currentUser}
        <br/>
        Sign In : {this.state.isSignedIn ? "true": "false"}
        <br/>
        {this.signInStatus()}
      </div>
    );
  }
}

export default GoogleOAuth20;