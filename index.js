import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import HoldingsModel from "./model/HoldingsModel.js";
import PositionsModel from "./model/PositionsModel.js"
import OrdersModel from "./model/OrdersModel.js"
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const URL = process.env.MONGO_URL;

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get("/",async(req,res)=>{
  res.json("welcome to zerodha backend");
})

server.get("/allHoldings",async(req,res)=>{
  await mongoose.connect(URL);
  const allHoldings = await HoldingsModel.find({});
  console.log(allHoldings)
  res.json(allHoldings);
});

server.get("/allPositions",async(req,res)=>{
  await mongoose.connect(URL);
  const allPositions = await PositionsModel.find({});
  console.log(allPositions)
  res.json(allPositions);
});

server.post("/newOrder",async(req,res)=>{
  await mongoose.connect(URL);
  let newOrder = await new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
});

  newOrder.save();

  res.json("Order save!");
})

// server.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPositions = new PositionsModel({
//         product: item.product,
//         name: item.name,
//         qty: item.qty,
//         avg: item.avg,
//         price: item.price,
//         net: item.net,
//         day: item.day,
//         isLoss: item.isLoss,
//     });

//     newPositions.save();
//   });
//   res.send("Done!");
// });

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  await mongoose.connect(URL);
  console.log("Database connected");
  console.log(`server is listening on port ${PORT}`);
});
