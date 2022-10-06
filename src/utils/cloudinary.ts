import {v2 as cloudinary } from "cloudinary"
import { claudinar_Name,
        claudinarySecret,
        cludinaryKey 
       
} from "../config/Config"


cloudinary.config({ 
  cloud_name: claudinar_Name,
  api_key: cludinaryKey, 
  api_secret: claudinarySecret,
  secure: true
});
export async function uploadImage(filePath:any) {
return  await cloudinary.uploader.upload(filePath,{
  folder: "votos"
})
  
}

export async function deleteImage(publicId:any){

 return  await cloudinary.uploader.destroy(publicId)
  
}