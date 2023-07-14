import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const port: string = config.port as string;

//database connection
async function Database() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database connection successful`);

    app.listen(port, () => {
      console.log(`Server is  listening on port ${port}`);
    });
  } catch (err) {
    console.log(`Failed to connect database`, err);
  }
}

Database();
