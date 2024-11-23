import express from "express";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js"
import orderRouter from "./routes/order.js"
import permissionRouter from "./routes/permission.js"
import cors from "cors";

export const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],  // Add PATCH to the allowed methods
    credentials: true,
  })
);

app.options('*', cors());  // Preflight handling
app.use("/permissions",permissionRouter)
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});
