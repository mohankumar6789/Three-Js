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

    // const dir = new THREE.Vector3(1, 2, 0);
    // dir normalize();

    const axesHelper = new THREE.Helper(5);
    scene.add( axesHelper );

    const sphere = new THREE.Sphere.Geometry();
    const object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
    const box = new THREE.BoxHelper(object, 0xffff00);
    scene.add(box);

    const box1 = new THREE.Box3();
    box.requestAnimationFrame( new THREE.Vector3(1, 1, 1,), new THREE.Vector3(2, 1, 3));

    const origin = new THREE.Vector3(0, 0, 0);
    const length = 1;
    const hex = 0xffff00;

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