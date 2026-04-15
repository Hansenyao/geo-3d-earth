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
addPoint("city", "Vancouver", 49.2827, -123.1207);
addPoint("city", "Edmonton", 53.5461, -113.4938);
addPoint("city", "Calgary", 51.0447, -114.0719);
addPoint("city", "Saskatoon", 52.1332, -106.6700);
addPoint("city", "Toronto", 43.6532, -79.3832); 
addPoint("city", "Ottawa", 45.4215, -75.6972); 
addPoint("city", "Beijing", 39.9042, 116.4074); 
addPoint("city", "Hangzhou", 30.2741, 120.1551); 

// 11. pick object
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData && obj.userData.type == "city") {
            console.log("City:", obj.userData.name);
            console.log("Lat:", obj.userData.lat);
            console.log("Lon:", obj.userData.lon);
        }
    }
})


// Render loop
function render() {
    requestAnimationFrame(render);

    earth.rotation.y += 0.002;

    controls.update();

    renderer.render(scene, camera);
}

render();