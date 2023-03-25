import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import {
   OrbitControls
} from "https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/OrbitControls.js";
import { AirPlane } from "./src/AirPlane.js";
import camera from "./src/engine/Camera.js";
import controller from "./src/engine/Controls.js";
import renderer from "./src/engine/Renderer.js";
import scene from "./src/engine/Scene.js";
import {
   mousePos,
   aspectRatio,
   container,
   farPlane,
   fieldOfView,
   HEIGHT,
   nearPlane,
   WIDTH, normalize
} from "./src/global.js";
import { Sea } from "./src/Sea.js";
import { Sky } from "./src/Sky.js";
import { Planet } from "./src/Planet.js";



function init( event ) {
   createScene();
   createLights();
   createPlane();
   // createSea();
   createSky();
   createPlanet();
   document.addEventListener( "mousemove", onMouseMove, false );
   window.addEventListener( 'resize', onWindowResize );
   document.body.addEventListener( 'keydown', onKeyDown, false );
   document.body.addEventListener( 'keyup', onKeyUp, false );
   animate()
}



//------------------------------------------------------------<BUILDERS>------------------------------------------------------------
var sea;
var planet;
var airplane;
// var controller;
var sky;
var ambientLight, hemisphereLight, shadowLight;
const clock = new THREE.Clock();


function createPlane() {
   airplane = new AirPlane();
   airplane.mesh.scale.set( 0.25, 0.25, 0.25 );
   airplane.mesh.position.y = 100;

   scene.add( airplane.mesh );


   // controller = new OrbitControls( airplane.mesh, renderer.domElement );

   controller.target.set( airplane.mesh.position.x, airplane.mesh.position.y, airplane.mesh.position.z );
   // controller.update();

}


function createSea() {
   sea                 = new Sea();
   sea.mesh.position.y = -600;
   scene.add( sea.mesh );
}


function createSky() {
   sky                 = new Sky();
   sky.mesh.position.y = -600;
   scene.add( sky.mesh );
}


function createPlanet() {
   planet                   = new Planet();
   planet.planet.position.y = -600;
   scene.add( planet.planet );

}


function createLights() {
   hemisphereLight = new THREE.HemisphereLight( 0xaaaaaa, 0x000000, 0.9 );
   shadowLight     = new THREE.DirectionalLight( 0xffffff, 0.9 );
   shadowLight.position.set( 150, 350, 350 );
   shadowLight.castShadow            = true;
   shadowLight.shadow.camera.left    = -400;
   shadowLight.shadow.camera.right   = 400;
   shadowLight.shadow.camera.top     = 400;
   shadowLight.shadow.camera.bottom  = -400;
   shadowLight.shadow.camera.near    = 1;
   shadowLight.shadow.camera.far     = 1000;
   shadowLight.shadow.mapSize.width  = 2048;
   shadowLight.shadow.mapSize.height = 2048;

   scene.add( hemisphereLight );
   scene.add( shadowLight );
}


function createScene() {
   scene.fog         = new THREE.Fog( 0xf7d9aa, 100, 950 );
   camera.position.x = 0;
   camera.position.z = 200;
   camera.position.y = 100;

   renderer.setSize( WIDTH, HEIGHT );
   renderer.shadowMap.enabled = true;
   container.appendChild( renderer.domElement );


}


//------------------------------------------------------------</BUILDERS>------------------------------------------------------------



// -----------------------------------------------------------<ANIMATION>-----------------------------------------------------------
function animate() {
   let time = clock.getElapsedTime();

   updatePlane();
   sky.update( time );
   planet.update( time );
   renderer.render( scene, camera );
   requestAnimationFrame( animate );
}


function updatePlane() {
   var targetY              = normalize( mousePos.y, -0.75, 0.75, 25, 175 );
   var targetX              = normalize( mousePos.x, -0.75, 0.75, -100, 100 );

   airplane.update( camera );
}


// -----------------------------------------------------------</ANIMATION>-----------------------------------------------------------



// -----------------------------------------------------------<EVENTS>-----------------------------------------------------------

function onWindowResize() {
   HEIGHT = window.innerHeight;
   WIDTH  = window.innerWidth;
   renderer.setSize( WIDTH, HEIGHT );
   camera.aspect = WIDTH / HEIGHT;
   camera.updateProjectionMatrix();
}


function onMouseMove( event ) {
   var tx     = -1 + ( event.clientX / WIDTH ) * 2;
   var ty     = 1 - ( event.clientY / HEIGHT ) * 2;
   mousePos.x = tx;
   mousePos.y = ty;
}



function onKeyDown( e ) {
   const keyCode = e.which;
   if ( keyCode === 87 ) { // w

   }
   if ( keyCode === 83 ) { // s

   }
   if ( keyCode === 65 ) { // a

   }
   if ( keyCode === 68 ) { // d

   }
}


function onKeyUp( e ) {
   const keyCode = e.which;
   if ( keyCode === 87 ) { // w

   }
   if ( keyCode === 83 ) { // s

   }
   if ( keyCode === 65 ) { // a

   }
   if ( keyCode === 68 ) { // d

   }
   if ( keyCode === 86 ) { // v

   }
   if ( keyCode === 32 ) { // space

   }
}


window.addEventListener( "load", init, false );

//-----------------------------------------------------------</EVENTS>-----------------------------------------------------------
