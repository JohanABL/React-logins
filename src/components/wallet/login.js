import React,{useEffect,useState} from "react";
import jwt_decode from "jwt-decode";

const google = window.google;

function Login() {
  const[user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* Global Google*/
    google.accounts.id.initialize({
      client_id: "1097760965347-0pugf5v0ceup345ia7j530c4ensm7c7r.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: "outline",size: "large",color: "Cyan"}
  );

  google.accounts.id.prompt();
}, []);
  // If we have no user: Sign in button
  // If we have a user: show the logout button
  return (
    
    <div className="Login">
   
      <div id="signInDiv">  </div>
      {Object.keys(user).length !== 0 && 
        
            <button className="signout" onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      {user &&
        <div>
          <br />
          <img src={user.picture}></img>
          <br />
          <h3>{user.name}</h3>
          </div>
      }
    </div>
    
  );
    }

export default Login;