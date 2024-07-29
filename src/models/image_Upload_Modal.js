import { Schema, model } from "mongoose";

const image_upload_Schema = Schema({
  image: {
    type: String,
  },
});

const Image_Upload_Modal = model("image_upload_Schema", image_upload_Schema);

export { Image_Upload_Modal };