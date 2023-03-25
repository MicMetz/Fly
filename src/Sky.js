import { Object3D, Vector3 } from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import { Cloud } from "./Cloud.js";


/**
	* Creates an instance of the Sky.
	* @class
	* @extends	{Object3D}
	* @param	{number}	nClouds	Number of clouds to create.
	*
	*/
export class Sky {

		/** @constructor
			* @description	Initializes the Sky.
			* @memberof	Sky
			* @instance
			* @public
			* @returns	{Sky}
			* @see		Cloud
			*/
		constructor() {
				/**	@member	{Object3D}	mesh		The mesh of the sky.
					* @memberof	Sky
					* @instance
					* @public
					* @type {Object3D}
					* @default	new Object3D()
					*/
				this.mesh = new Object3D();

				/**	@member	{number}	nClouds		Number of clouds to create.
					* @memberof	Sky
					* @instance
					* @public
					* @type {number}
					* @default	200
					* @see		Cloud
					*/
				this.nClouds = 200;

				/**	@member	{Array}	clouds		An array of clouds.
					* @memberof	Sky
					* @instance
					* @public
					* @type {Array}
					* @default	[]
					* @see		Cloud
					*/
				this.clouds = [];


				this.init();
		}


		/** @function
			* @name	init
			* @description	Initializes the sky.
			* @memberof	Sky
			* @instance
			* @public
			* @returns	{void}
			*/
		init() {
				var stepAngle = ( Math.PI * 2 ) / this.nClouds;
				for ( var i = 0; i < this.nClouds; i++ ) {
						var cloud = new Cloud();
						this.clouds.push( cloud );
						var a = stepAngle * i;
						var h = 750 + Math.random() * 200;

						cloud.mesh.position.set( Math.cos( a ) * h, Math.sin( a ) * h, 0 );
						cloud.mesh.rotation.z = a + Math.PI / 2;
						cloud.mesh.position.y = -400 - Math.random() * 400;
						var s                 = 1 + Math.random() * 2;
						cloud.mesh.scale.set( s, s, s );
						this.mesh.add( cloud.mesh );
				}
		}


   update( time ) {
      this.clouds.forEach( ( cloud ) => {
         cloud.update( time );
      } );
   }


}
