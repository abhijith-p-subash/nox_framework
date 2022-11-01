import { connect } from "mongoose";

const mongoConnection = async () => {
  try {
    const mongoURI: string = "mongodb://localhost:27017/nox";
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error);
    // Exit process with failure
    process.exit(1);
  }
};

export default mongoConnection ;
