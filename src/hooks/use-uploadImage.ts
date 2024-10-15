import { uploadImage } from "@/utils/serverActions/uploadImage";

const upload = async (image: File) => {
  if (!image) {
    throw new Error("No file provided");
  }
  try {
    const formData = new FormData();
    formData.set("file", image);
    return await uploadImage(formData);
  } catch (error) {
    console.error(error);
  }
};

export default upload