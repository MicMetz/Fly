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
		WIDTH, normalize, mousePos as mouse
} from "./src/global.js";
import { Sea } from "./src/Sea.js";
import { Sky } from "./src/Sky.js";
import { Planet } from "./src/Planet.js";



function init( event ) {
		createScene();
		createLights();
		createPlanet();
		createPlane();
		// createSea();
		createSky();
		document.addEventListener( "mousemove", onmousemove, false );
		window.addEventListener( 'resize', onWindowResize );
		document.body.addEventListener( 'keydown', onKeyDown, false );
		document.body.addEventListener( 'keyup', onKeyUp, false );
		animate()
}


var documentation = require('documentation');
var fs = require('fs');

documentation.build(['main.js'])
.then(documentation.formats.md)
.then(output => {
		// output is a string of Markdown data
		fs.writeFileSync('./output.md', output);
});


//------------------------------------------------------------<BUILDERS>------------------------------------------------------------
var sea;
var planet;
var airplane;
var sky;
var raycaster	= new THREE.Raycaster();
var intersection	= new THREE.Vector3();
var positionAdjustment	= new THREE.Vector3();
var ambientLight, hemisphereLight, shadowLight;

var moveLeft  = false;
var moveRight = false;
var moveUp    = false;
var moveDown  = false;
const clock   = new THREE.Clock();


function createPlane() {
		airplane = new AirPlane( planet.planet );
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
		// var position = new THREE.Vector3( normalize( mousePos.x, -1, 1, -100, 100 ), normalize( mousePos.y, -1, 1, 25, 175 ), 100 );
		airplane.update( positionAdjustment );
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


function onmousemove( event ) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );
		raycaster.ray.intersectPlane( new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0 ), intersection );

}



function onKeyDown( e ) {
		const keyCode = e.which;
		if ( keyCode === 87 ) { // w
				// moveDown = true;
				positionAdjustment.y = -1;
		}
   if ( keyCode === 83 ) { // s
					// moveUp = true;
					positionAdjustment.y = 1;
   }
   if ( keyCode === 65 ) { // a
					// moveLeft = true;
					positionAdjustment.z = -1;
   }
   if ( keyCode === 68 ) { // d
					// moveRight = true;
					positionAdjustment.z = 1;
   }
}


function onKeyUp( e ) {
   const keyCode = e.which;
   if ( keyCode === 87 ) { // w
					// moveDown = false;
					positionAdjustment.y = 0;
   }
   if ( keyCode === 83 ) { // s
					// moveUp = false;
					positionAdjustment.y = 0;
   }
   if ( keyCode === 65 ) { // a
					// moveLeft = false;
					positionAdjustment.z = 0;
   }
   if ( keyCode === 68 ) { // d
					// moveRight = false;
					positionAdjustment.z = 0;
   }
   if ( keyCode === 86 ) { // v

   }
   if ( keyCode === 32 ) { // space

   }
}


window.addEventListener( "load", init, false );

//-----------------------------------------------------------</EVENTS>-----------------------------------------------------------
