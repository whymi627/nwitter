import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedIn(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
      });
      }
      else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
  }
  return(
    <>
    {init ? (<AppRouter 
              refreshUser={refreshUser}
              isLoggedIn={isLoggedIn} 
              userObj={userObj}
             /> 
          ) : (
            "initializing..."
          ) }

    </>
  ) ;
};

export default App;
