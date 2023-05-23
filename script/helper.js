import * as THREE from 'https://unpkg.com/three/build/three.module.js';

function init(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 10;

    //plane actions
    var plane = getPlane(120);
    plane.name = "plane-1"
    plane.rotation.x = Math.PI/2;

    var pointlight = getPointLight(1);
    pointlight.position.z = 20;
    pointlight.position.x = 20;
    pointlight.position.y += 30;

    scene.add(plane);
    scene.add(pointlight);

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#bebebe");
    document.getElementById("webgl").appendChild(renderer.domElement);
    update(renderer,scene,camera);
}

//Update function - 3params
function update(renderer,scene,camera){
    renderer.render(scene, camera);

    var plane = scene.getObjectByName("plane-1");
    console.log(plane);

    requestAnimationFrame(function(){
        update(renderer,scene,camera);
    });
}

function getPlane(size) {
    //Create the object like, cube, square, rectangle
    var geometry = new THREE.PlaneGeometry(size,size);
    /**Set the color and styles */
    var material = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function getPointLight(intensity){
    var light = new THREE.PointLight("0x00ffff", intensity);
    return light;
}

init();