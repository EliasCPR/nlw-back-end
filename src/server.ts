import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

const port = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
