import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import PDFMerger from "pdf-merger-js";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/merge", upload.array("pdfs", 10), async (req, res) => {
  if (!req.files || req.files.length < 2) {
    return res.status(400).json({ message: "Please upload at least two PDFs" });
  }

  const merger = new PDFMerger();
 
  try {
    for (const file of req.files) {
      await merger.add(file.path);
    }

    const outputFilePath = `uploads/merged_${Date.now()}.pdf`;
    await merger.save(outputFilePath);

    res.download(outputFilePath, (err) => {
      if (err) console.log(err);
      fs.unlinkSync(outputFilePath);
      req.files.forEach((file) => fs.unlinkSync(file.path));
    });
  } catch (error) {
    res.status(500).json({ message: "Error merging PDFs", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
