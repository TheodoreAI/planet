import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

// Textures
import marsTexture from "../img/2k_mars.jpg";
import earthTexture from "../img/2k_earth_daymap.jpg";
import sunTexture from "../img/2k_sun.jpg";
import starsTexture from "../img/stars.jpg";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const textureLoader = new THREE.TextureLoader();
const marsGeometry = new THREE.SphereGeometry(4, 30, 30);
const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const earthGeometry = new THREE.SphereGeometry(4, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const marsMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(marsTexture),
});

const earthMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(earthTexture),
});
const starsCubeTexture = new THREE.CubeTextureLoader();
const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(sunMesh);
scene.add(marsMesh);
scene.add(earthMesh);
scene.background = starsCubeTexture.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);
camera.position.set(-4, 100, 20);
scene.add(camera);

/**Light */
const pointLight = new THREE.PointLight(0xff9000, 0.5, 100);
scene.add(pointLight);
pointLight.position.set(0, 0, 0);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

/**
 * Animation
 */
const clock = new THREE.Clock();
const tick = () => {
  // Update objects
  const elapsedTime = clock.getElapsedTime();
  //   Rotation along the y axis of each mesh
  sunMesh.rotateY(0.005);
  marsMesh.rotateY(0.005);
  // Orbit around the sun for each mesh
  marsMesh.position.y = 50 * Math.sin(elapsedTime);
  marsMesh.position.x = 50 * Math.cos(elapsedTime);
  earthMesh.position.y = -30 * Math.sin(elapsedTime);
  earthMesh.position.x = -30 * Math.cos(elapsedTime);
  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();
