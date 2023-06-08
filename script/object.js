import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// cube or geometric object
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({color: 'purple'});
const cube = new THREE.Mesh(geometry, material);

// orbit controls --> zoom in/out with scroll, pan with right-click, and drag to orbit
const controls = new OrbitControls(camera, renderer.domElement);

// Main function
function main() {
    // remove the default canvas on web page (output)
    document.querySelector('canvas').remove();

    // add scene background color, set rendering size,
    // and add to DOM on web page (output)
    scene.background = new THREE.Color('#161718');
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // reposition or transform camera
    camera.position.set(0, 0, 5);
    
    // create world light and add to scene
    const light = new THREE.HemisphereLight('#FFFFFF', '#757575', 1.7);
    scene.add(light);
    
    // set initial cube position, rotation, and add to scene
    cube.position.set(0, 0, 0);
    cube.rotation.set(0.5, 0 , 0);
    scene.add(cube);
    
    // call the update() function
    update();
}

// Update or animation function
function update() {
    // call the update() function every frame - creates a loop
    requestAnimationFrame(update);

//    cube.rotation.x += 0.01;
//    cube.rotation.y += 0.01;
//    cube.rotation.z += 0;
    
    // render the updated scene and camera
    renderer.render(scene, camera);
};

// call the main() function to initiate the scene
main();