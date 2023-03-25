import {
   Box3,
   BoxGeometry, BoxHelper, Mesh,
   MeshPhongMaterial, Object3D, Vector3
} from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import { Colors } from "./global.js";



export class AirPlane {
   constructor() {
      this.propeller = new Object3D();
      this.mesh      = new Object3D();
      this.head      = new Object3D();
      this.mesh.name = "airPlane";

      // this.direction    = new Vector3( 1, 0, 0 );
      this.direction = new Vector3( 0, 0, 0 );
      this.speed     = 0.5;
      this.acc       = 0.05;
      this.turn      = 0.05;
      this.target    = new Vector3( 0, 0, 0 );

      this.init();
   }


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
   }


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


   changePropellerSpeed( speed ) {
      this.propeller.rotation.x += speed;
   }


   update( camera ) {
      this.mesh.position.addScaledVector( this.direction, this.speed );
      this.box.setFromObject( this.mesh );
      this.mesh.position.y += this.direction.y;
      this.mesh.position.x += this.direction.x;
      this.propeller.rotation.x += 0.23;
      this.propeller.rotation.z += 0.23;

      // Set the camera position behind the airplane
      this.target.setFromMatrixPosition( this.propeller.matrixWorld );
      camera.position.set( this.mesh.position.x - 100, this.mesh.position.y + 20, this.mesh.position.z );
      camera.lookAt( this.target );
   }



}
