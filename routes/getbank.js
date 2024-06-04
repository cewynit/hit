import express from 'express'
import { getBank, getList } from '../controllers/getbank';
const routerGetBank = express.Router();
routerGetBank.get("/getbank", getBank);
routerGetBank.get("/getlist", getList);
export default routerGetBank