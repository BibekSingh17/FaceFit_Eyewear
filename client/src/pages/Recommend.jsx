import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/recommend.scss";
import Header from "../components/Header";

function Recommend() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    navigate("/buy", { state: item });
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/frame/recommend/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });

        const data = await response.json();
        setResult(data);
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <>
      <Header />
      <div className="upload-container">
        <h2>Upload Face Photo</h2>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Processing..." : "Recommend Glasses"}
        </button>

        {result && (
          <div className="result-box">
            <h3>Face Shape: {result.face_shape}</h3>

            <div className="recommendations">
              {result.recommendations.map((item, i) => (
                <div className="card" key={i}>
                  <img src={item.image} alt={item.name} />
                  <p className="name">{item.name}</p>
                  <p className="price">Rs{item.price}</p>

                  {/* BUY NOW BUTTON */}
                  <button
                    className="buy-btn"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Recommend;