import dns from 'dns'
dns.setServers(['1.1.1.1', '8.8.8.8']);
import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './config/db.js';
import "./cron/orderScheduler.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
});