import { useEffect, useContext, useState } from "react";
import { AuthContext, loadUser } from "../ContextApi/AuthContext";
import { RouterProvider } from "react-router-dom";
import route from "../Protected/Route";

function App() {
  const { dispatch } = useContext(AuthContext);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function checkUser() {
      await loadUser(dispatch);
      setLoadingUser(false);
    }
    checkUser();
  }, [dispatch]);

  if (loadingUser) {
    return <div>Loading user info...</div>;
  }

  return <RouterProvider router={route()} />;
}

export default App;
