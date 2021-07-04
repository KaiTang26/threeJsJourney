import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// debug
const gui = new dat.GUI();


const cursor = {
    x:0,
    y:0,
}
// window.addEventListener('mousemove', (e)=>{
//     cursor.x = e.clientX/sizes.width-0.5;
//     cursor.y = e.clientY/sizes.height-0.5;

//     console.log(cursor)

// })

// Scene
const scene = new THREE.Scene()
const canvas= document.querySelector('canvas.webgl')

// Object
let geometry = new THREE.BoxBufferGeometry(1, 1, 1, 64, 64, 64);

const position = geometry.attributes.position;

geometry.morphAttributes.position = [];
const spherePositions = [];
let v3 = new THREE.Vector3();

console.log( position );

console.log(position.count);

for (var i = 0; i < position.count; i++) {
    //v3.fromBufferAttribute(position, i).setLength((3.5 * Math.sqrt(3) + 3.5) * 0.5);
    v3.fromBufferAttribute(position, i).normalize().multiplyScalar(1);
    spherePositions.push(v3.x, v3.y, v3.z);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(spherePositions, 3))





const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)



//mesh.position.set(0.7, -0.6, 1);

scene.add(mesh)
//debug
gui.add(mesh.position, 'y', -3, 3, 0.01);
gui.add(mesh.position, 'x', -3, 3, 0.01);
gui.add(mesh.position, 'z', -3, 3, 0.01);

gui.add(mesh.material, 'wireframe');

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    camera.aspect=sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})

window.addEventListener('dblclick',()=>{
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    }else{
        document.exitFullscreen();

    }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4;
// camera.position.x=1;
// camera.position.y=0.1;
scene.add(camera)

//controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

let time = Date.now();


const tick = ()=>{
    const currentTime = Date.now();
    const timeDiff = currentTime-time;
    time=currentTime;

    //mesh.rotation.y +=0.001*timeDiff;
    //mesh.rotation.x +=0.001*timeDiff;

    // camera.position.x = Math.sin(-cursor.x*Math.PI*2)*3;
    // camera.position.z=Math.cos(cursor.x*Math.PI*2)*3;
    // camera.position.y=cursor.y*5;
    // camera.lookAt(new THREE.Vector3);

    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}

tick();