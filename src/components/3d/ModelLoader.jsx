// components/ModelLoader.jsx
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Engraved "CARLOS ITO / ITO210" plaques in First.webp (4096 source).
const NAME_PLAQUES = [
  { x: 404, y: 2198, w: 200, h: 210 },
  { x: 2600, y: 3868, w: 188, h: 210 },
];

function blurNamePlaques(texture) {
  const image = texture?.image;
  if (!image?.width || !image?.height) return;

  const scaleX = image.width / 4096;
  const scaleY = image.height / 4096;
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(image, 0, 0);

  for (const plaque of NAME_PLAQUES) {
    const x = Math.round(plaque.x * scaleX);
    const y = Math.round(plaque.y * scaleY);
    const w = Math.round(plaque.w * scaleX);
    const h = Math.round(plaque.h * scaleY);
    const blur = Math.max(28, Math.round(40 * scaleX));
    const pad = blur * 2;
    const tmp = document.createElement("canvas");
    tmp.width = w + pad * 2;
    tmp.height = h + pad * 2;
    const tctx = tmp.getContext("2d");
    if (!tctx) continue;

    tctx.filter = `blur(${blur}px)`;
    tctx.drawImage(
      canvas,
      x - pad,
      y - pad,
      w + pad * 2,
      h + pad * 2,
      0,
      0,
      tmp.width,
      tmp.height,
    );
    tctx.filter = `blur(${Math.round(blur * 0.7)}px)`;
    tctx.drawImage(tmp, 0, 0);

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.drawImage(tmp, pad, pad, w, h, x, y, w, h);
    ctx.restore();
  }

  texture.image = canvas;
  texture.needsUpdate = true;
}

export default function ModelLoader({ onMeshReady, onFansReady, setLoaded }) {
  const groupRef = useRef();
  const { scene: gltfScene } = useGLTF("models/3dPortfolio.glb");
  const scene = useMemo(() => gltfScene.clone(true), [gltfScene]);

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
      const tex = loader.load(path, (loadedTex) => {
        if (key === "First") blurNamePlaques(loadedTex);
      });
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
