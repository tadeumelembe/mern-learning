import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./Views/Dashboard";
import Login from "./Views/Login";
import Register from "./Views/Register";
import { ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
     <div className='container'>
    <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer/>

      </div>
    </>
  );
}

export default App;
