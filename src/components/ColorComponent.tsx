import React, { useState, CSSProperties } from "react";

const ColorConverter: React.FC = () => {
  const [colorInput, setColorInput] = useState<string>("");
  const [detectedFormat, setDetectedFormat] = useState<string>("");
  const [convertedColor, setConvertedColor] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorInput(value);

    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
      setDetectedFormat("HEX");
      const rgb =
        value.length === 4
          ? [1, 2, 3].map((i) => parseInt(value[i] + value[i], 16))
          : [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
      setConvertedColor(`rgb(${rgb.join(", ")})`);
    } else if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(value)) {
      setDetectedFormat("RGB");
      const rgb = value.match(/(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})/)?.slice(1);
      const hex =
        "#" +
        rgb
          ?.map((x) => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("");
      setConvertedColor(hex || "");
    } else {
      setDetectedFormat("");
      setConvertedColor("");
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{ ...styles.colorDisplay, backgroundColor: colorInput }}
      ></div>
      <div style={styles.details}>
        <label style={styles.label}>Enter a color:</label>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Any rgb or hex value"
          style={styles.input}
        />
        <div>
          <p>Detected Format: {detectedFormat}</p>
          <p>Converting to: {detectedFormat === "RGB" ? "HEX" : "RGB"}</p>
          <p>Converted value: {convertedColor}</p>
          {convertedColor && (
            <button
              onClick={() => navigator.clipboard.writeText(convertedColor)}
              style={styles.copyButton}
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  colorDisplay: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "70%",
    maxWidth: "400px",
  },
  label: {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  copyButton: {
    marginTop: "10px",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default ColorConverter;
