import axios from 'axios';
import {API} from "../env.jsx";

const uploadFile = async (file,data) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('formData', data);

    try {
        const response = await axios.post(`${API}/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 429) {
                return { success: false, message: 'You have exceeded your daily limit of file uploads.' };
            } else {
                return { success: false, message: 'An error occurred while uploading the file.' };
            }
        } else {
            return { success: false, message: 'An error occurred while uploading the file.' };
        }
    }
};

export default uploadFile;
