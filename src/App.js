import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import SiginIn from "./pages/SiginIn";
import SiginUp from "./pages/SiginUp";

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home /> }/>
    
        <Route path="/offer" element={<Offer /> }/>
        <Route path="/profile" element={<Profile /> }/>
        
        <Route path="/sigin-up" element={<SiginUp /> }/>
        <Route path="/sign-in" element={<SiginIn /> }/>
        <Route path="/forget-password" element={<ForgetPassword
         /> }/>

      
      </Routes>
    </Router>
   
     


    </>
  );
}

export default App;
