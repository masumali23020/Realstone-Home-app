import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import PrivateRouter from "./components/PrivateRouter";
import CreatingListing from "./pages/CreatingListing";
import EditeListing from "./pages/EditeListing";
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
        <Route path="/profile" element={<PrivateRouter />} >
          <Route path="/profile" element={<Profile /> }/>
        </Route>
    
        
     
        <Route path="/sign-up" element={<SiginUp /> }/>
        <Route path="/sign-in" element={<SiginIn /> }/>
        <Route path="/forget-password" element={<ForgetPassword /> }/>
         <Route path="/offer" element={<Offer /> }/>
        <Route path="/creating-listing" element={<PrivateRouter />}>
          <Route path="/creating-listing" element={<CreatingListing />} />
        </Route>
        <Route path="/edit-listing" element={<PrivateRouter />}>
          <Route path="/edit-listing/:listingId" element={<EditeListing />} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
/>
   
     


    </>
  );
}

export default App;
