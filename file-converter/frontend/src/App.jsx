import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [ext, setext] = useState();

  const handleUpload = async (req, res) => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("ext", ext);

    try {
      const response = await axios.post(
        "http://localhost:5000/convert",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `converted${ext}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Error converting file:", error);
    }
  };

  return (
    <>
      <div>
        <h1>file converter</h1>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <select
          value={ext}
          name="exe"
          id="exe"
          onChange={(e) => setext(e.target.value)}
        >
          <option value=".pdf">PDF</option>
          <option value=".docx">DOCX</option>
          <option value=".jpg">JPG</option>
          <option value=".png">PNG</option>
        </select>
        <button onClick={handleUpload}>convert</button>
      </div>
    </>
  );
}

export default App;
