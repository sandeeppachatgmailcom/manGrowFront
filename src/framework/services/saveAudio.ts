import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firebaseDB from "./config";
import { v4 } from "uuid";
 
const uploadAudio = async (audio:any) => {
    const imgRef = ref(firebaseDB, `/User/voice/${v4() + audio.name}`);

    if (audio) {
        try {
            await uploadBytes(imgRef, audio);
            const downloadUrl = await getDownloadURL(imgRef);

            return downloadUrl;
        } catch (error) {
            throw error;
        }
    }

    throw new Error("No image provided");
};

export default uploadAudio;
