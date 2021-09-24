import Router from './router';
import Footer from './components/layout/Footer';
import { useSetRecoilState } from 'recoil';
import { authState, isLoggedInState } from './recoil/authRecoil';
import { useEffect, useState } from 'react';
import { authService } from './fb';

function App() {
  const setAuth = useSetRecoilState(authState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuth(authUser);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      {isLoading ? <p>Loading..</p> : <Router />}
      <Footer />
    </div>
  );
}

export default App;
