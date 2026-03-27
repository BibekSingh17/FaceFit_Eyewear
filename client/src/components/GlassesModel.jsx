import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";

export function GlassesModel({ frameSrc, landmarks, power, userScale = 1 }) {
    // Load the frame texture
    const texture = useLoader(TextureLoader, frameSrc);
    // clone texture for shadow to allow independent settings if needed, 
    // though reusing the texture object is fine for efficient mapping.

    const groupRef = useRef();

    const { viewport } = useThree();

    useFrame(() => {
        if (!landmarks || !groupRef.current) return;

        // --- 1. Position Calculation ---
        const mapX = (x) => (x - 0.5) * viewport.width;
        const mapY = (y) => -(y - 0.5) * viewport.height;

        // Key Landmarks
        // Eye Centers (Pupils)
        const leftIris = landmarks[468];
        const rightIris = landmarks[473];

        // Nose Tip (for orientation)
        const noseTip = landmarks[1];

        // Face edges (for yaw)
        // 234 = Left Ear/Cheek, 454 = Right Ear/Cheek

        // Center calculation
        // Align with the midpoint of the pupils
        const centerX = (leftIris.x + rightIris.x) / 2;
        const centerY = (leftIris.y + rightIris.y) / 2;

        // Apply position to the group
        groupRef.current.position.x = mapX(centerX);
        groupRef.current.position.y = mapY(centerY);
        groupRef.current.position.z = 0;

        // --- 2. Scale Calculation ---
        // Distance between pupils
        const eyeDistX = (leftIris.x - rightIris.x) * viewport.width;
        const eyeDistY = (leftIris.y - rightIris.y) * viewport.height;
        const eyeDist = Math.hypot(eyeDistX, eyeDistY);

        // Standard Glasses Scale Factor relative to IPD
        // 2.25 is a good baseline for "oversized" natural look (covers width of face mostly)
        // Multiplied by userScale
        const baseScale = 2.25 * userScale;
        const glassesWidth = eyeDist * baseScale;

        // Maintain Aspect Ratio
        const aspect = texture.image.width / texture.image.height;
        const glassesHeight = glassesWidth / aspect;

        groupRef.current.scale.set(glassesWidth, glassesHeight, 1);

        // --- 3. Rotation (3D Head Pose) ---
        // Roll (Z) - Tilt head left/right
        const angleZ = Math.atan2(
            -(rightIris.y - leftIris.y) * viewport.height,
            (rightIris.x - leftIris.x) * viewport.width
        );

        // Yaw (Y) - Turn head left/right
        const faceWidth = Math.abs(landmarks[454].x - landmarks[234].x);
        const yaw = (noseTip.x - centerX) / (faceWidth * 0.5);
        // Sensitivity factor for 2D plane rotation
        const yawRad = yaw * 1.5;

        // Pitch (X) - Tilt head up/down
        // Comparing nose tip Y to eye Y is a decent estimator
        // Distance from eye-line to chin or nose-tip varies with pitch
        // We use a simplified localized delta
        const pitchVal = (noseTip.y - centerY) / (Math.abs(landmarks[10].y - landmarks[152].y) * 0.5);
        const pitchRad = pitchVal * 1.5;

        // Apply Rotations
        groupRef.current.rotation.z = angleZ;
        groupRef.current.rotation.y = -yawRad;
        groupRef.current.rotation.x = -pitchRad;
    });

    return (
        <group ref={groupRef}>
            {/* 1. The Glasses (Foreground) */}
            <mesh>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    map={texture}
                    transparent={true}
                    opacity={1}
                    side={THREE.DoubleSide}
                    depthTest={false} // Ensure it draws on top
                />
            </mesh>

            {/* 2. Drop Shadow (Background) for "Natural" depth */}
            <mesh position={[0.02, -0.02, -0.05]} scale={[1.05, 1.05, 1]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    map={texture}
                    transparent={true}
                    opacity={0.3}
                    color="black"
                    side={THREE.DoubleSide}
                    depthTest={false}
                />
            </mesh>
        </group>
    );
}
