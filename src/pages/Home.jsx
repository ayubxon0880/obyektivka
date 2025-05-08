import CopyButton from "../component/Button";
import PersonalInfoForm from "./PersonalInfoForm";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-teal-600 text-white p-6">
                    <h1 className="text-2xl font-bold">Resume360.uz</h1>
                    <p className="mt-2">Ushbu sayt orqali yangi va oson resume yaratishingiz mumkin</p>
                    <div>Loihani qo'llab quvatlash uchun <CopyButton/></div>
                </div>
                <PersonalInfoForm/>
            </div>
        </div>
    )
}

export default Home