import {useEffect, useState} from "react";
import canUpload from "./service/canUpload.jsx";
import Navbar from "./component/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ResumeForm from "./pages/ResumeForm.jsx";
import Footer from "./pages/Footer.jsx";
import Portfolio from "./pages/Portfolio.jsx";

function App() {
    const [error, setError] = useState(null);

    useEffect(() => {
        canUpload().then((res) => {
            if (!res.success) {
                setError(res.message);
            }
        }).catch((err) => {
            setError(err);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <Navbar/> */}
    
            <div className="py-8 px-4">
              <Routes>
                    {/*<Route path="/" element={<Portfolio />} />*/}
                  <Route path="/" element={<ResumeForm />} />
                  <Route path="/profile/*" element={<Portfolio />} />
              </Routes>
            </div>

            <Footer/>
        </div>
    );
}

export default App;