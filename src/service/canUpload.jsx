import axios from "axios";

const canUpload = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/files/can-upload');
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 429) {
                return { success: false, message: `Kunlik limitni ishlatib bo'ldingiz, 1 kunda faqat 3 martta foydalanishingiz mumkin` };
            } else {
                return { success: false, message: `Iltimos qaytadan urinib ko'ring, saqlash bilan muammo chiqdi` };
            }
        } else {
            return { success: false, message: 'Iltimos qaytadan urinib ko\'ring, saqlash bilan muammo chiqdi.' };
        }
    }
};

export default canUpload;