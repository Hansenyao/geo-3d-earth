import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// output three.js version number
console.log(THREE.REVISION);

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera（projection + view）
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// 3. Renderer（framebuffer）
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Create geometry
const geometry = new THREE.SphereGeometry(1, 64, 64);

// 5. Texture
const texture = new THREE.TextureLoader().load('./img/earth_atmos_2048.jpg');

// 6. meterial (shader)
const material = new THREE.MeshBasicMaterial({map: texture});

// 7. mesh (geometry + material)
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// 8. control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Render loop
function render() {
    requestAnimationFrame(render);

    earth.rotation.y += 0.001;

    controls.update();
    renderer.render(scene, camera);
}

render();