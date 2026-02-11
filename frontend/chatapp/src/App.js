import './App.css';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';
import GroupChat from './components/groupchatroom';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router';

function App() {
  return (
    <div className="ChatApp">
        <h1>101122624_comp3133_lab_test_1</h1>
    <BrowserRouter>
        <nav>
          <NavLink to="/sign-up">Sign-up</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/home">Home</NavLink>
        </nav>

        <Routes>
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/home" element={<Home/>} />
          <Route path="/groupChat" element={<GroupChat/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
