import { useEffect, useRef, useState, Suspense } from "react";
import '../styles/tryoncanvas.scss';

import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { Canvas } from "@react-three/fiber";
import { Environment, OrthographicCamera } from "@react-three/drei";
import { GlassesModel } from "./GlassesModel";

function TryOnCanvas({ power, frameSrc, userScale }) {
  const videoRef = useRef(null);
  const [landmarks, setLandmarks] = useState(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks?.length > 0) {
        setLandmarks(results.multiFaceLandmarks[0]);
      } else {
        setLandmarks(null);
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => camera.stop();
  }, []);

  return (
    <div className="tryon-container">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="video-feed"
        playsInline
        muted
      />

      {/* 3D Canvas Overlay */}
      <Canvas className="canvas-overlay" gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={1} />

          <ambientLight intensity={1} />
          <Environment preset="city" />

          {landmarks && (
            <group>
              <group scale={[-1, 1, 1]}>
                <GlassesModel
                  frameSrc={frameSrc}
                  landmarks={landmarks}
                  power={power}
                  userScale={userScale}
                />
              </group>
            </group>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default TryOnCanvas;