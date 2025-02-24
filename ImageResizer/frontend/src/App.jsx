import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setfile] = useState(null);

  async function handleSubmit() {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/compress",
        formdata,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "compressed.jpg");
      document.body.appendChild(link);
      link.click();
      link.remove();
      
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  }

  return (
    <>
      <h1>image resizer</h1>
      <input
        type="file"
        name="photo"
        id="photo"
        accept="image/*"
        onChange={(e) => setfile(e.target.files[0])}
      />
      <button onClick={handleSubmit}>resize</button>
    </>
  );
}

export default App;
