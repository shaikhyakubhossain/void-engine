import dns from "node:dns";

const dnsServer = process.env.MONGODB_DNS_SERVER;

if (dnsServer) {
  dns.setServers([dnsServer]);
}

import "./config/env.js";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void startServer();