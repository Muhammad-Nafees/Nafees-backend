import { Schema, model } from "mongoose";

const image_upload_Schema = Schema({
  image: {
    type: String,
  },
});

const UserModal = model("image_upload_Schema", image_upload_Schema);

export { UserModal };
