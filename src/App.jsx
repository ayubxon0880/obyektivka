import { Route, Routes } from "react-router-dom";
import ResumeForm from "./pages/ResumeForm.jsx";
import Footer from "./pages/Footer.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import { Analytics } from "@vercel/analytics/react"

function App() {


    return (
        <div className="min-h-screen bg-gray-50">
            {/* <Navbar/> */}
            <Analytics/>
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