import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sneharoydev_db_user:lTBRihToklysltU6@cluster0.xcgafna.mongodb.net/"
  );
  console.log("DB Connected");
};
