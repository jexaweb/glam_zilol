// server.js
import express from "express";
import cors from "cors";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/send-sms", async (req, res) => {
  const { name, phone } = req.body;

  try {
    await client.messages.create({
      body: `Salom ${name}, biz sizning arizangizni qabul qildik!`,
      from: process.env.TWILIO_PHONE, // Twilio raqamingiz
      to: phone, // foydalanuvchi telefon raqami
    });

    res.status(200).json({ message: "SMS yuborildi!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xatolik yuz berdi!" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishga tushdi`));
