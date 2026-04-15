import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { latLongToVector3 } from './math';
import { cities } from './cities';

// output three.js version number
console.log(THREE.REVISION);

// Get 3D render area size
const glContainer = document.getElementById('gl-container');
const sceneWith = glContainer.clientWidth;
const sceneHeight = glContainer.clientHeight;

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera（projection + view）
const camera = new THREE.PerspectiveCamera(45, sceneWith / sceneHeight, 1, 1000);
camera.position.z = 3;

// 3. Renderer（framebuffer）
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneWith, sceneHeight);
glContainer.appendChild(renderer.domElement);

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
function addPoint(type, name, lat, lon) {
    const pos = latLongToVector3(lat, lon, 1);

    const geometry = new THREE.SphereGeometry(0.02, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x88ff00 });

    const point = new THREE.Mesh(geometry, material);
    point.position.copy(pos);

    // add object's metadata
    point.userData = {
        type: type,
        name: name,
        lat: lat,
        lon: lon
    }

    //scene.add(point);
    earth.add(point);  // Add points as children of earth so that they can inherit earth coordinates
}
// Add cities on earth
cities.forEach((c) => {
    addPoint("city", c.name, c.coords[0], c.coords[1]);
})

// 11. pick object
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData && obj.userData.type == "city") {
            const city = cities.find(c => c.name == obj.userData.name);
            if (city) {
                updateSelectedCityUI(city);
            }
        }
    }
})

// Refresh 3D render area size
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Update camera information
function updateCameraUI() {
    document.getElementById("cam-pos").innerText =
    `${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}`;

    document.getElementById("cam-rot").innerText =
    `${camera.rotation.x.toFixed(2)}, ${camera.rotation.y.toFixed(2)}, ${camera.rotation.z.toFixed(2)}`;
}

// Update the selected city's information
function updateSelectedCityUI(city) {
    document.getElementById("city-name").innerText = city.name;
    document.getElementById("city-coord").innerText =`${city.coords[0]}, ${city.coords[1]}`;

    document.getElementById("city-weather").innerText = city.weather;
    document.getElementById("city-temp").innerText = city.temp;
}

// Render loop
function render() {
    requestAnimationFrame(render);

    earth.rotation.y += 0.001;

    controls.update();

    updateCameraUI();

    renderer.render(scene, camera);
}

render();