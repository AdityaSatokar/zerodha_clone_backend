import { model } from "mongoose";

import HoldingsSchema from "../schemas/HoldingsSchema.js";

const HoldingsModel = new model("holding",HoldingsSchema);

export default HoldingsModel;
