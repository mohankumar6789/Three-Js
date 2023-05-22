import * as THREE from 'https://unpkg.com/three/build/three.module.js';

function init() {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    
    camera.position.z = 0;
    camera.position.x = 0;
    camera.position.y = 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    var particleGeo = new THREE.Geometry();
    var particleMat = new THREE.PointsMaterial({
        color:'rgb(255,255,255)',
        size:1,
        map:new THREE.TextureLoader().load('../resources/images/particle.jpg'),
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

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('rgb(20,20,20');

    document.getElementById("webgl").appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement );
    update(renderer, scene, camera, controls);
    return scene;
    
}

function update(renderer, scene, camera, controls) {
    controls.update();
    renderer.render(scene, camera);
    
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    });
}

var scene = init();