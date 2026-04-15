import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { latLongToVector3 } from './math';
import { color } from 'three/src/nodes/tsl/TSLCore.js';
import { pingpong } from 'three/src/math/MathUtils.js';

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
const material = new THREE.MeshStandardMaterial({map: texture});

// 7. mesh (geometry + material)
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// 8. control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 9. light
const light = new THREE.DirectionalLight(0xffffff, 5);
//const light = new THREE.AmbientLight(0xffffff, 5);
light.position.set(5, 3, 5);
scene.add(light);

// 10. Add geographical point
function addPoint(lat, lon) {
    const pos = latLongToVector3(lat, lon, 1);

    const geometry = new THREE.SphereGeometry(0.02, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x88ff00 });

    const point = new THREE.Mesh(geometry, material);
    point.position.copy(pos);

    //scene.add(point);
    earth.add(point);  // Add points as children of earth so that they can inherit earth coordinates
}
addPoint(49.2827, -123.1207); // Vancouver
addPoint(53.5461, -113.4938); // Edmonton
addPoint(51.0447, -114.0719); // Calgary
addPoint(52.1332, -106.6700); // Saskatoon
addPoint(43.6532, -79.3832);  // Toronto
addPoint(45.4215, -75.6972);  // Ottawa
addPoint(39.9042, 116.4074);  // Beijing
addPoint(30.2741, 120.1551);  // Hangzhou

// Render loop
function render() {
    requestAnimationFrame(render);

    earth.rotation.y += 0.002;

    controls.update();

    renderer.render(scene, camera);
}

render();