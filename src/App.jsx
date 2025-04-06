import {useEffect, useState} from "react";
import canUpload from "./service/canUpload.jsx";
import PersonalInfoForm from "./pages/PersonalInfoForm.jsx";

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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-teal-600 text-white p-6">
                    <h1 className="text-2xl font-bold">Saytnomi.uz</h1>
                    <p className="mt-2">Ushbu sayt orqali yangi va oson resume yaratishingiz mumkin</p>
                    <p className="mt-2">Malumotlar saqlanadi</p>
                </div>
                {
                    error &&
                    <div className="bg-red-600 text-white flex justify-center items-center p-6">
                        <p className="mt-2">{error}</p>
                    </div>
                }
                <PersonalInfoForm/>
            </div>
        </div>
    )
}

export default App