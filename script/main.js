import * as THREE from 'https://unpkg.com/three/build/three.module.js';

// Basic Scene Creation
function init() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 10;

    getPointLight = getPointLight(1);
    getPointLight.position.z = 20;
    getPointLight.position.x = 20;
    getPointLight.position.y += 30;
    
    var mesh;
    mesh = getBox(4, 4, 4);
    mesh.name = "box-1";
    mesh.position.y = mesh.geometry.parameters.height / 2;
    mesh.position.x = mesh.geometry.parameters.height / 12;
    mesh.position.z = mesh.geometry.parameters.height / 2;
    mesh.rotation.x = 4000;
    mesh.rotation.y += 20;
    mesh.rotation.z += 30;

    let circle = getCircle(6,30,0,12);
    circle.name = "circle-1";
    circle.position.x = mesh.geometry.parameters.height/2;
    circle.position.y = mesh.geometry.parameters.height/2;
    circle.position.z = mesh.geometry.parameters.height/2;
    circle.rotation.x += 180;
    circle.rotation.y += 90 ;
    circle.rotation.z += 100;
    
    scene.add(mesh);
    scene.add(getPointLight);
    scene.add(circle);

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#ffcede");
    document.getElementById("webgl").appendChild(renderer.domElement);
    update(renderer, scene, camera);

    var particleGeo = new THREE.Geometry();
    var particleMat = new THREE.PointsMaterial({
        color:'rgb(255,255,255)',
        size:1,
        map:new THREE.TextureLoader().load(particle.jpg),
        transparent:true,
        blending:THREE.AdditiveBlending,
        depthWrite:false
    })
    
    var particleCount  = 1000;
    var particleDistance = 100;

    for(var i=0;i<particleCount;i++){
        var posX = (Math.random() - 0.5) * particleDistance;
        var posY = (Math.random() - 0.5) * particleDistance;
        var posZ = (Math.random() - 0.5) * particleDistance;
        var particle = new THREE.Vector3(posX,posY,posZ);
        particleGeo.vertices.push(particle)
    }

    var particleSystem = new THREE.points(
        particleGeo,
        particleMat
    )
    scene.add(particleSystem)

    const dir = new THREE.Vector3(1,2,0);

    dir.normalize();
    const origin = new THREE.Vector3(0,0,0);
    const length = 1;
    const hex = 0Xffff00;

    const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    scene.add(arrowHelper);
}

function update(renderer, scene, camera) {
    renderer.render(scene, camera);

    var plane = scene.getObjectByName("plane-1");
    console.log(plane);

    var box = scene.getObjectByName("box-1");
    console.log(box);

    var circle = scene.getObjectByName("circle-1");
    console.log(circle);
    
    rotationX(box);
    
    requestAnimationFrame(function(){
        update(renderer,scene,camera);
    });
}

function getPointLight(intensity){
    var light = new THREE.PointLight("0x00ffff", intensity);
    return light;
}

function getBox(x, y, z) {
    var geometry = new THREE.BoxGeometry(x, y, z);
    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);
    const materials = [
        new THREE.MeshPhongMaterial({ flatShading: true, shininess: 150, map: loader.load('../resources/images/image1.jpg') }),
        new THREE.MeshPhongMaterial({ flatShading: true, shininess: 150, map: loader.load('../resources/images/image2.jpg') }),
        new THREE.MeshBasicMaterial({ flatShading: true, shininess: 150, map: loader.load('../resources/images/image3.jpg') }),
        new THREE.MeshBasicMaterial({ flatShading: true, shininess: 150, map: loader.load('../resources/images/image4.jpeg') }),
        new THREE.MeshBasicMaterial({ flatShading: true, shininess: 150, map: loader.load('../resources/images/image1.jpg') }),
        new THREE.MeshStandardMaterial({ flatShading: true, shininess: 150, map: loader.load('../resources/images/image3.jpg') }),
    ];
    var mesh = new THREE.Mesh(geometry, materials);
    return mesh;
}

function getCircle(radius, segments, thetaStart, thetaEnd){
    const geometry = new THREE.CircleGeometry(radius, segments, thetaStart, thetaEnd);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00});
    const circle = new THREE.Mesh(geometry, material);
    return circle;
}

function rotationX(objName){
    console.log(objName);
    objName.rotation.x += 0.01;
}

function rotationY(objName){
    objName.rotation.y += 0.01;
}

function rotationZ(objName){
    objName.rotation.z += 0.04;
}

init();