import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = (app) => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected successfully to DB");
      app.listen(process.env.PORT || 5000, () =>
        console.log(`server listening`)
      );
    })
    .catch((err) => console.log(err));
};

export { dbConnection };
