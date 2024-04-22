import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
function App() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/" />}
        ></Route>
        <Route path="/about" element={<About />} />
        <Route
          path="/sign-in"
          element={!currentUser ? <SignIn /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/sign-up"
          element={!currentUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
