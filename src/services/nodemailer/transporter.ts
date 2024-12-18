"use server";

import Transporter from "@/models/NodemailerTransporter";

export const transporter = new Transporter.Builder()
  .build()
  .createTransporter();
