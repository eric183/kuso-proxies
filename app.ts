export {};
import * as dotenv from 'dotenv'
dotenv.config();

import express from "express";
import axios from "axios";
import cors from 'cors';

const requestFromApi = async (url: string) => await axios.get(url);


const app = express();


// var corsOptions = {
//   origin: [
//     process.env.corsOrigin!
//   ],
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions))
app.use(cors())


app.get('/http*', async (req, res) => {
    
  const url = /\/(http.+)/gim.exec(req.url);
  const proxyUrl = url ? url[1] : req.url;

  const { data } =  await requestFromApi(proxyUrl);

  console.log('url: ', req.url);

  res.send(data);

}).listen(process.env.LISTEN_PORT || 80);