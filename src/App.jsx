import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(300);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  // Update QR code whenever word, size, or bgColor changes
  useEffect(() => {
    if (word) {
      setQrCode(
        `http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`
      );
    }
  }, [word, size, bgColor]);

  function handleClick() {
    setWord(temp);
  }

  function handleDownload() {
    if (qrCode) {
      const link = document.createElement("a");
      link.href = qrCode;
      link.download = "qrcode.png";
      link.click();
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">QR Code Generator</h1>

        {/* Input and Button */}
        <div className="input-group">
          <input
            type="text"
            onChange={(e) => setTemp(e.target.value)}
            placeholder="Enter text to encode"
          />
          <button onClick={handleClick}>Generate</button>
        </div>

        {/* Extra Options */}
        <div className="controls">
          <div className="control">
            <label>Background Color:</label>
            <input
              type="color"
              onChange={(e) => setBgColor(e.target.value.substring(1))}
            />
          </div>

          <div className="control">
            <label>Dimension: {size}px</label>
            <input
              type="range"
              min="200"
              max="600"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
        </div>

        {/* QR Code Display */}
        {qrCode && (
          <div className="qr-preview">
            <img src={qrCode} alt="Generated QR Code" />
          </div>
        )}

        {/* Download Button */}
        {qrCode && (
          <button className="download-btn" onClick={handleDownload}>
            Download QR Code
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
