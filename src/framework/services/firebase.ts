import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firebaseDB from "./config";
import { v4 } from "uuid";
 
const UploadImage = async (image:any) => {
    const imgRef = ref(firebaseDB, `/User/profilepick/${v4() + image.name}`);

    if (image) {
        try {
            await uploadBytes(imgRef, image);
            const downloadUrl = await getDownloadURL(imgRef);

            return downloadUrl;
        } catch (error) {
            throw error;
        }
    }

    throw new Error("No image provided");
};

export default UploadImage;
