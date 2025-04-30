import axios from 'axios';

const uploadFile = async (file,data) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('formData', data);

    try {
        const response = await axios.post('http://localhost:8081/api/v1/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Success response
        return { success: true, data: response.data };
    } catch (error) {
        // Error response
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
