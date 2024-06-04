import mongoose from "mongoose";

const getbankSchema = new mongoose.Schema(
  {
    code_bank: {
      type: String,
    },
    account_name: {
      type: String,
    },
    account_no: {
      type: String,
    },
    branch_name: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("getBank", getbankSchema);
