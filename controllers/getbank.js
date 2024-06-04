import axios from "axios";
import getbank from "../models/getbank";
const TelegramBot = require("node-telegram-bot-api");
export const getBank = async (req, res) => {
  var messageNew = "";
  try {
    const datatest = await getbank.find();
    const { token, idgr, tokentx } = req.query;
    const bot = new TelegramBot(token, { polling: true });
    let listBank = [];
    const { data: bank } = await axios.post(
      "https://pmbodergw.dsrcgoms.net/payment/bcp/hit?xtoken="+tokentx
    );
    console.log(bank);
    if (bank.code === 200) {
      let hd = 0;
      bank.rows.forEach(async (element) => {
        if (
          element &&
          element.accounts &&
          element.accounts[0] &&
          element.accounts[0].account_no
        ) {
          const bankItem = element.accounts[0];
          try {
            const dataCurrent = datatest.find(
              (item) =>
                item.account_no === bankItem.account_no &&
                item.code_bank === bankItem.code_bank
            );
            if (dataCurrent === undefined) {
              hd++;
              listBank = datatest;
              getbank({
                code_bank: bankItem.code_bank,
                account_name: bankItem.account_name,
                account_no: bankItem.account_no,
                branch_name: bankItem.branch_name,
              }).save();
              listBank.push(bankItem);
              const message = `Tài khoản ${hd}\nChủ TK: ${bankItem.account_name}\nNgân hàng: ${bankItem.code_bank}\nSố tài khoản: ${bankItem.account_no}\nChi nhánh: ${bankItem.branch_name}\n--------------------------------------\n`;
              messageNew += message;
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    bot
      .sendMessage(idgr, messageNew || "im mom")
      .then(() => {
        console.log("Message sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
    res.json({ code: 200, data: listBank });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "error",
    });
  }
};


export const getList = async (req, res) => {
  try {
    const data =  await getbank.find()
    res.json({ code: 200, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "error",
    });
  }
};