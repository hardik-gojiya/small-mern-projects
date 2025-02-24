import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/compress", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const outputFile = `uploads/compressed_${Date.now()}.jpg`;

  try {
    await sharp(req.file.path)
      .resize({ width: 800 })
      .jpeg({ quality: 70 })
      .toFile(outputFile);

    res.download(outputFile, () => {
      fs.unlinkSync(req.file.path);
      fs.unlinkSync(outputFile);
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing image", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));