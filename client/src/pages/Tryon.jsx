import { useState } from "react";
import '../styles/tryon.scss';
import TryOnCanvas from "../components/TryOnCanvas";

function Tryon() {
  const [power, setPower] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [scaleAdjustment, setScaleAdjustment] = useState(1.1);

  const frames = [
    { id: 0, src: "/glasses/frame1.png", name: "Classic Black" },
    { id: 1, src: "/glasses/frame2.png", name: "Modern Blue" },
  ];

  return (
    <div className="app">
      <h1 className="title">
        Virtual <span>EyeTry</span>
      </h1>

      {/* AR Canvas */}
      <div className="canvas-container">
        <TryOnCanvas
          power={power}
          frameSrc={frames[frameIndex].src}
          userScale={scaleAdjustment}
        />
      </div>

      {/* Controls */}
      <div className="controls">
        {/* Size Control */}
        <div className="slider-section">
          <label>Frame Width Adjustment</label>
          <div className="slider-row">
            <span>Narrow</span>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={scaleAdjustment}
              onChange={(e) =>
                setScaleAdjustment(parseFloat(e.target.value))
              }
            />
            <span>Wide</span>
          </div>
        </div>

        {/* Frame Selector */}
        <div className="frame-selector">
          <label>Select Frame</label>
          <div className="frame-list">
            {frames.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setFrameIndex(frame.id)}
                className={`frame-btn ${
                  frameIndex === frame.id ? "active" : ""
                }`}
              >
                <img src={frame.src} alt={frame.name} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tryon;