import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);

  function handleFileChange(e) {
    setFiles(e.target.files);
  }

  async function handleUpload() {
    if (files.length < 2) {
      alert("Please select at least two PDFs");
      return;
    }

    const formdata = new FormData();

    for (let file of files) {
      formdata.append("pdfs", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/merge",
        formdata,
        {
          responseType: "blob",
        } 
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "merged.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error merging PDFs:", error);
    }
  }

  return (
    <>
      <h1>Pdf Merger</h1>
      <input
        type="file"
        multiple
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Merge PDFs</button>
    </>
  );
}

export default App;