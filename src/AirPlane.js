import {
		Box3,
		BoxGeometry, BoxHelper, Mesh,
		MeshPhongMaterial, Object3D, Raycaster, Vector3, Quaternion
} from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import camera from "./engine/Camera.js";
import { Colors, mousePos as mouse } from "./global.js";



/**
	* Creates an instance of the Player's airplane.
	* @class
	* @extends	{Object3D}
	* @param	{Planet}	world		The world the airplane is in.
	*/
export class AirPlane {

		/** @constructor
			* @description	Initializes the airplane.
			* @param world
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{AirPlane}
			* @see		World
			*/
		constructor( world ) {

				/**	@member	{Object3D}	mesh		The mesh of the airplane.
					* @memberof	AirPlane
					*
					*/
				this.world = world;

				/**	@member	{Object3D}	mesh		The mesh of the airplane.
					* @memberof	AirPlane
					* @type {Object3D}
					*/
				this.propeller = new Object3D();

				/**	@member	{Object3D}	mesh		The mesh of the airplane.
					* @memberof	AirPlane
					* @type {Object3D}
					*/
				this.mesh = new Object3D()
				this.mesh.name = "airPlane";

				/**	@member	{Vector3}	direction		The direction of the airplane.
					* @memberof	AirPlane
					* @description	Direction is a unit vector. It is used to calculate the forward position of the
					*  airplane.
					* @type {Vector3}
					*/
				this.direction = new Vector3( 0.5, 0, 0 );


				this.target         = new Vector3( 0, 0, 0 );
				this.raycaster      = new Raycaster();
				this.intersectPoint = new Vector3();
				this.speed          = 0.5;
				this.acc            = 0.05;
				this.turn           = 0.05;

				this.init();
		}


		/** @function
			* @name	init
			* @description	Initializes the airplane.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		init() {
				this.createPropeller();
				this.createWings();
				this.createCockpit();
				this.createEngine();
				this.createTail();

				this.box = new Box3();
				this.box.setFromObject( this.mesh );
				this.helper = new BoxHelper( this.mesh );
				this.target.setFromMatrixPosition( this.propeller.matrixWorld );
				this.mesh.matrixAutoUpdate = true;
				// document.addEventListener( "mousemove", ( event ) => {
				// 		this.onmousemove( event );
				// } );
		}


		/** @function
			* @name	createPropeller
			* @description	Creates the front propeller of the airplane.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		createPropeller() {
				const geoPropeller           = new BoxGeometry( 20, 10, 10, 1, 1, 1 );
				const matPropeller           = new MeshPhongMaterial( {
						color: Colors.brown,
				} );
				this.propeller               = new Object3D( new Mesh( geoPropeller, matPropeller ) )
				this.propeller.castShadow    = true;
				this.propeller.receiveShadow = true;

				var geoBlade = new BoxGeometry( 1, 100, 20, 1, 1, 1 );
				var matBlade = new MeshPhongMaterial( {
						color: Colors.brownDark, // shading: FlatShading,
				} );
				var blade    = new Mesh( geoBlade, matBlade );
				blade.position.set( 8, 0, 0 );
				blade.castShadow    = true;
				blade.receiveShadow = true;
				this.propeller.add( blade );
				this.propeller.position.set( 50, 0, 0 );
				this.mesh.add( this.propeller );
				this.propeller.name = "propeller";
		}


		/** @function
			* @name	createWings
			* @description	Creates the wings of the airplane.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		createWings() {
				const geoSideWing = new BoxGeometry( 40, 8, 150, 1, 1, 1 );
				const matSideWing = new MeshPhongMaterial( {
						color: Colors.red, // shading: FlatShading,
				} );
				geoSideWing.vertices[ 1 ].y -= 5;
				geoSideWing.vertices[ 1 ].x -= 10;
				geoSideWing.vertices[ 3 ].x -= 10;
				geoSideWing.vertices[ 0 ].x -= 10;
				geoSideWing.vertices[ 0 ].y -= 5;
				geoSideWing.vertices[ 2 ].x -= 10;

				const sideWing = new Mesh( geoSideWing, matSideWing );
				sideWing.position.set( 0, 4, 0 );
				sideWing.castShadow    = true;
				sideWing.receiveShadow = true;
				this.mesh.add( sideWing );
		}


		/** @function
			* @name	createCockpit
			* @description	Creates the cockpit of the airplane.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		createCockpit() {
				const geoCockpit = new BoxGeometry( 60, 50, 50, 1, 1, 1 );
				const matCockpit = new MeshPhongMaterial( {
						color: Colors.red, shading: true,
				} );

				const cockpit         = new Mesh( geoCockpit, matCockpit );
				cockpit.castShadow    = true;
				cockpit.receiveShadow = true;
				this.mesh.add( cockpit );
		}


		/** @function
			* @name	createEngine
			* @description	Creates the engine of the airplane.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		createEngine() {
				const geoEngine = new BoxGeometry( 20, 50, 50, 1, 1, 1 );
				const matEngine = new MeshPhongMaterial( {
						color: Colors.white, shading: true,
				} );

				const engine         = new Mesh( geoEngine, matEngine );
				engine.position.x    = 40;
				engine.castShadow    = true;
				engine.receiveShadow = true;
				this.mesh.add( engine );
		}


		/** @function
			* @name	createTail
			* @description	Creates the tailfin of the airplane.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		createTail() {
				const geoTailPlane = new BoxGeometry( 15, 20, 5, 1, 1, 1 );
				const matTailPlane = new MeshPhongMaterial( {
						color: Colors.red,
				} );

				const tailPlane = new Mesh( geoTailPlane, matTailPlane );
				tailPlane.position.set( -35, 25, 0 );
				tailPlane.castShadow    = true;
				tailPlane.receiveShadow = true;
				this.mesh.add( tailPlane );
		}


		/** @function
			* @name	changePropellerSpeed
			* @param speed
			* @description	Changes the speed of the propellers rotation in accordance to the speed of the plane.
			* @memberof	AirPlane
			* @instance
			* @public
			*	@returns	{void}
			*/
		changePropellerSpeed( speed ) {
				this.propeller.rotation.x += speed;
		}


		/** @function
			* @name	adjustPropeller
			* @description Apart of the airplane's animation sequence. This function is called in the render
			* loop. It rotates the propeller of the airplane.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		adjustPropeller() {
				this.propeller.rotation.x += 0.23;
				this.propeller.rotation.z += 0.23;
		}



		/** @function
			* @name	adjustPitch
			* @param direction
			* @description Apart of the airplane's update sequence. This function is called in the render. it
			* adjusts the nose angle of the airplane in accordance to the direction of the plane and the pitch.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		adjustPitch( direction ) {
				this.mesh.lookAt( direction );
				this.target.setFromMatrixPosition( this.propeller.matrixWorld );

				// Set the camera position behind the airplane
				camera.lookAt( this.target );
				camera.position.set( this.mesh.position.x - 100, this.mesh.position.y + 20, this.mesh.position.z );

		}


		/** @function
			* @name	update
			* @param position
			* @description	Updates the status of the airplane. This function is called in the render loop.
			* @memberof	AirPlane
			* @instance
			* @public
			* @returns	{void}
			*/
		update( position ) {

				var velocity = new Vector3();
				velocity.addVectors( this.direction, position );
				// this.mesh.position.addVectors(this.mesh.position, this.direction.multiplyScalar(this.speed));
				this.mesh.translateOnAxis( velocity, this.speed );

				this.adjustPropeller();
				this.adjustPitch( velocity );
		}


}
