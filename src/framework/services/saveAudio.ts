import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firebaseDB from "./config";
import { v4 } from "uuid";
 
const uploadAudio = async (audio:any) => {
    const fileType = audio.type || 'audio/webm'; // Default to WebM if type not provided
    const imgRef = ref(firebaseDB, `/User/voice/${v4()}.${fileType}`);

    if (audio) {
        try {
            await uploadBytes(imgRef, audio);
            const downloadUrl = await getDownloadURL(imgRef);
            console.log(downloadUrl,'audio url')
            return downloadUrl;
        } catch (error) {
            throw error;
        }
    }
    throw new Error("No image provided");
};
 
export default uploadAudio;
