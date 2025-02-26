import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [refreURL, setrefreURL] = useState("");

  async function handleAsk() {
    if (!question) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/ask?q=${question}`
      );

      setAnswer(response.data.answer);
      setrefreURL(response.data.refreURL);
    } catch (error) {
      setAnswer("Failed to get an answer. Please try again.");
    }
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleAsk}>Ask</button>

        {answer && (
          <div style={{ marginTop: "20px" }}>
            <strong>Answer:</strong>
            <p>{answer}</p>
            <a href={refreURL}>{refreURL}</a>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
