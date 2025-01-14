// components/ModelLoader.jsx
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function createBlurredTexture(sourceTexture, blurPx = 14) {
  const image = sourceTexture?.image;
  if (!image || !image.width || !image.height) return null;

  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = `blur(${blurPx}px)`;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.filter = "none";

  const blurred = sourceTexture.clone();
  blurred.image = canvas;
  blurred.needsUpdate = true;
  return blurred;
}

function boxIntersectsZone(box, zoneMin, zoneMax) {
  return (
    box.max.x >= zoneMin.x &&
    box.min.x <= zoneMax.x &&
    box.max.y >= zoneMin.y &&
    box.min.y <= zoneMax.y &&
    box.max.z >= zoneMin.z &&
    box.min.z <= zoneMax.z
  );
}

export default function ModelLoader({ onMeshReady, onFansReady, setLoaded }) {
  const groupRef = useRef();
  const { scene: gltfScene } = useGLTF("models/3dPortfolio.glb");
  const scene = useMemo(() => gltfScene.clone(true), [gltfScene]);
  const blurredTextureCache = useRef(new Map());

  const manager = new THREE.LoadingManager();

  manager.onLoad = () => {
    setLoaded(true);
  };

  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader(manager);
    const textureMap = {
      First: "textures/First.webp",
      Second: "textures/Second.webp",
      Third: "textures/Third.webp",
    };

    const loaded = {};
    for (const [key, path] of Object.entries(textureMap)) {
      const tex = loader.load(path);
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      loaded[key] = tex;
    }
    return loaded;
  }, []);

  useEffect(() => {
    const interactive = [];
    const fans = [];
    const toRemove = [];

    scene.traverse((child) => {
      if (!child.isMesh) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      const hasBrightWhite = materials.some((m) => {
        if (!m?.color) return false;
        return m.color.r > 0.8 && m.color.g > 0.8 && m.color.b > 0.8;
      });
      const hasGlow = materials.some((m) => {
        if (!m?.emissive) return false;
        return m.emissive.r > 0.2 || m.emissive.g > 0.2 || m.emissive.b > 0.2;
      });

      const box = new THREE.Box3().setFromObject(child);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const nearStairsCarlosZone =
        center.x > -8.5 &&
        center.x < 1.5 &&
        center.y > -0.2 &&
        center.y < 2.2 &&
        center.z > -0.8 &&
        center.z < 4.8;
      const looksLikeTextPiece =
        size.x < 4.5 && size.y < 1.6 && size.z < 0.8 && (hasBrightWhite || hasGlow);

      // Collect author sign meshes for removal
      if (child.name === "Red" || child.name === "White") {
        toRemove.push(child);
        return;
      }

      // Apply the same "blur-by-removal" idea to CARLOS text near stairs.
      // Never remove Target meshes — they're needed for raycasting and HTML attachment.
      if (nearStairsCarlosZone && looksLikeTextPiece && !child.name.includes("Target")) {
        toRemove.push(child);
        return;
      }

      // Apply texture if matches
      for (const key in textures) {
        if (child.name.includes(key)) {
          child.material = new THREE.MeshBasicMaterial({
            map: textures[key],
          });
          child.material.map.minFilter = THREE.LinearFilter;
        }
      }

      // Apply special materials
      if (child.name.includes("Glass")) {
        child.material = new THREE.MeshPhysicalMaterial({
          transparent: true,
          transmission: 1,
          roughness: 0,
          metalness: 0,
          opacity: 1,
          ior: 1.5,
          thickness: 0.1,
          specularIntensity: 1,
          clearcoat: 1,
          clearcoatRoughness: 0,
        });
      } else if (child.name.includes("Red")) {
        child.material = new THREE.MeshBasicMaterial({ color: 0xff2222 });
      } else if (child.name.includes("White")) {
        child.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      }

      // Apply localized texture blur in the stairs/booth side zone.
      // This intentionally creates the softened neon/text look you preferred.
      if (child.material?.map) {
        const zoneMin = new THREE.Vector3(-5.2, -0.2, 0.4);
        const zoneMax = new THREE.Vector3(-0.6, 2.2, 3.6);
        const meshBox = new THREE.Box3().setFromObject(child);
        if (boxIntersectsZone(meshBox, zoneMin, zoneMax)) {
          const key = child.material.map.uuid;
          if (!blurredTextureCache.current.has(key)) {
            const blurred = createBlurredTexture(child.material.map, 16);
            if (blurred) blurredTextureCache.current.set(key, blurred);
          }
          const cached = blurredTextureCache.current.get(key);
          if (cached) {
            child.material.map = cached;
            child.material.needsUpdate = true;
          }
        }
      }

      // Collect fans and interactive objects
      if (child.name.includes("Fan")) fans.push(child);

      if (child.name.includes("Target") || child.name.includes("First")) {
        if (!child.userData.initialScale) {
          child.userData.initialScale = child.scale.clone();
        }
        interactive.push(child);
      }
    });

    toRemove.forEach((child) => child.removeFromParent());

    onMeshReady?.(interactive);
    onFansReady?.(fans);
  }, [scene, textures, onMeshReady, onFansReady]);

  return <primitive object={scene} ref={groupRef} />;
}
