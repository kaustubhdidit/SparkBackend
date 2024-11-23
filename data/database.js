import mongoose from "mongoose";

const connect = () => {
    console.log("URI: "+process.env.MONGO_URI)
    mongoose
      .connect(process.env.MONGO_URI, { dbName: "practiceDB" })
      .then(() => console.log("DB connected"))
      .catch((e) => console.error("Error", e));
  };

export default connect;