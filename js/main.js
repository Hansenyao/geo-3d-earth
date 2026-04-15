import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

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
const texture = new THREE.TextureLoader().load(
    'https://threejs.org/examples/textures/earth_atmos_2048.jpg'
);

// 6. meterial (shader)
const material = new THREE.MeshBasciMaterial({map: texture});

// 7. mesh (geometry + material)
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Render loop
function render() {
    requestAnimationFrame(render);

    earth.rotation.y += 0.001;

    renderer.render(scene, camera);
}

render();