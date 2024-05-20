import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firebaseDB from "./config";
import { v4 } from "uuid";
 
const uploadVideo = async (audio:any) => {
    const fileType = audio.type || 'video/webm'; // Default to WebM if type not provided

    const imgRef = ref(firebaseDB, `/User/video/${v4()}.${fileType}`);
    console.log(audio,'audio,' ,imgRef,'imgRef')
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

export default uploadVideo;
