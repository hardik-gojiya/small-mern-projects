import express from "express";
import multer from "multer";
import path from "path";
import libre from "libreoffice-convert";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post('/convert', upload.single('file'), async (req, res) => {

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const ext = req.body.ext;
    const outputFile = `${req.file.path}${ext}`;

    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'File read error', err });
        }

        libre.convert(data, ext, undefined, (convertErr, done) => {
            if (convertErr) {
                return res.status(500).json({ message: 'Conversion error', convertErr });
            }

            fs.writeFile(outputFile, done, (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ message: 'File write error', writeErr });
                }

                res.download(outputFile, () => {
                    fs.unlinkSync(req.file.path); 
                    fs.unlinkSync(outputFile);  
                });
            });
        });
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
