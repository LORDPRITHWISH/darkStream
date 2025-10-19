import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


const uploadFile = async (localFilePath: string) => {


  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      return null;
    }

    console.log("Cloudinary config:", cloudinary.config());
// console.log("Uploading signed?", !options?.upload_preset);


    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      // upload_preset: "darkupload",
    });

    console.log(`file uploaded to cloudinary: ${uploadResult.secure_url}`);
    
    return uploadResult;

  } catch (error) {
    console.log("Dark:error uploading to cloudinary", error);
    // console.error("Dark:error uploading to cloudinary", error.message, error.http_code, error.name);

    return null;
  }
  // finally {
  //   fs.unlinkSync(localFilePath);
  // }
};

const deleteFile = async (publicId: string) => {
  try {
    console.log("deleating from cloudinary", publicId);
    const deleteResult = await cloudinary.uploader.destroy(publicId);
    console.log("cloudinary deleated", deleteResult);
    return deleteResult;
  } catch (error) {
    console.log("Dark:error deleating from cloudinary", error);
    return null;
  }
};

export { uploadFile, deleteFile };
