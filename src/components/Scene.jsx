// src/components/Scene.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useLoader, useFrame } from '@react-three/fiber'; // useLoader を追加
import { EXRLoader } from 'three-stdlib';                            // EXRLoader を追加
import { PMREMGenerator, LinearToneMapping, sRGBEncoding } from 'three';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = `${import.meta.env.BASE_URL}model.glb`;       // public/model.glb が存在すること

export default function Scene({ activeCamera }) {
  const { camera, scene, gl, size } = useThree();
  const mixer = useRef();
  const camerasMap = useRef({});

  // (2) カメラターゲット用
  const targetPos  = useRef(new THREE.Vector3());
  const targetQuat = useRef(new THREE.Quaternion());

  // (3) glTF モデルを読み込む
  const gltf = useGLTF(MODEL_PATH);

  // --- 初回マウント時処理 ---
  useEffect(() => {
    gl.toneMapping    = LinearToneMapping;
    gl.outputEncoding = sRGBEncoding;
    gl.toneMappingExposure = 1.5;
  }, [gl, scene]);

  useEffect(() => {
    // -- カメラ焦点距離（50mm 相当）設定 --
    camera.setFocalLength(50);
    camera.updateProjectionMatrix();

    // -- モデルをシーンに追加 --
    scene.add(gltf.scene);

    // -- アニメーション準備 --
    mixer.current = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
      mixer.current
        .clipAction(clip)
        .play()
        .setLoop(THREE.LoopRepeat);
    });

    // -- glb 内カメラを取得してマップに保存 --
    gltf.cameras.forEach((cam) => {
      camerasMap.current[cam.name] = cam;
    });

    // -- 初回のカメラ配置 --
    const initCam = camerasMap.current[activeCamera];
    if (initCam) {
      camera.position.copy(initCam.position);
      camera.quaternion.copy(initCam.quaternion);
      targetPos.current.copy(initCam.position);
      targetQuat.current.copy(initCam.quaternion);
    }

    // -- モデルのマテリアルをセルルック用に置き換え --
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        const origMat = child.material;
        const baseColorMap = origMat.map || null;
        const toon = new THREE.MeshToonMaterial({
        color: origMat.color || new THREE.Color(0xffffff),
        map: baseColorMap,
       // gradientMap: 必要ならここで指定
     });
     // 環境マップの影響度を上げる（1 → 2〜5 などお好みで）
     toon.envMapIntensity = 10;
     child.material = toon;
      }
    });

    // クリーンアップ：アンマウント時にアニメーション停止
    return () => {
      mixer.current?.stopAllAction();
      mixer.current = null;
    };
  }, [gltf, camera, scene]);

  // activeCamera が変わるたびにターゲット位置／回転を更新
  useEffect(() => {
    const cam = camerasMap.current[activeCamera];
    if (cam) {
      // ここでは camera.position.copy はせず、ターゲットだけ更新
      targetPos.current.copy(cam.position);
      targetQuat.current.copy(cam.quaternion);
    }
  }, [activeCamera]);

  // 毎フレーム：アニメーション更新・カメラ補間・レンダー
  useFrame((_, delta) => {
    mixer.current?.update(delta);

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    camera.position.lerp(targetPos.current, 0.05);
    camera.quaternion.slerp(targetQuat.current, 0.05);

    gl.render(scene, camera);
  });

  return null;
}
