
import connect from "./data/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { app } from "./app.js";

dotenv.config();
// const app = express();
const port = 8080;
connect();
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
