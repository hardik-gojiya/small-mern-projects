import express from "express"
import cors from "cors"
import axios from "axios"

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/api/ask', async (req, res) => {
    const query = req.query.q;
    const URL = `https://api.duckduckgo.com/?q=${query}&format=json`;

    try {
        const response = await axios.get(URL)
        const answer = response.data.Abstract || 'No direct answer found. Try a different question.';
        const refrenceURL = response.data.AbstractURL
        res.json({answer, refrenceURL})
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch an answer' });
    }

})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));