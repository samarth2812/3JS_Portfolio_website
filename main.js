import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from 'three';
//Screen, Camera, Renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:0xADD8E6});
const torous= new THREE.Mesh(geometry,material);
//0xFF6347
scene.add(torous)
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight)


// const geo = new THREE.TetrahedronGeometry(10,5,5,200);
// const mat = new THREE.MeshBasicMaterial({colour:0x0B3CA});

// const tetra = new THREE.Mesh(geo,mat);
// scene.add(tetra);
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry,material);

  const[x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const picTexture = new THREE.TextureLoader().load('sam.jpg');

const pic = new THREE.Mesh(
  new THREE.BoxGeometry(4,4,4),
  new THREE.MeshBasicMaterial({map: picTexture})
);

// pic.position.z = 30
scene.add(pic);
function animate(){
  requestAnimationFrame(animate);
  torous.rotation.x+=0.01;
  torous.rotation.y+=0.005;
  torous.rotation.z+=0.01;


  controls.update();
  renderer.render(scene,camera);
}
animate()



const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 40, 40),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-20);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  pic.rotation.y+=0.1;
  pic.rotation.z+=0.1;

  camera.position.z = t*-0.001;
  camera.position.x = t*-0.02;
  camera.position.y = t*-0.02;
}
document.body.onscroll = moveCamera