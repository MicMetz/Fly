import {

   MathUtils, Mesh,
   MeshLambertMaterial, Object3D,
   Vector3, PlaneBufferGeometry
} from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import { Colors } from "./global.js";



export class Sea {
   constructor() {
      this.mesh       = new Object3D();
      this.mesh.name  = "sea";
      this.vertexData = [];
      this.plane      = new PlaneBufferGeometry( 1000, 1000, 50, 50 );

      this.init();
   }


   init() {
      var mat = new MeshLambertMaterial( { color: "aqua" } );
      this.plane.rotateX( -Math.PI / 2 );

      console.log( this.plane );
      var vec3 = new Vector3();

      for ( var i = 0; i < this.plane.attributes.position.count; i++ ) {

         vec3.fromBufferAttribute( this.plane.attributes.position, i );

         this.vertexData.push( {
            initialHeight: vec3.y,
            amplitude    : MathUtils.randFloatSpread( 2 ),
            phase        : MathUtils.randFloat( 0, Math.PI )
         } )
      }

      this.mesh = new Mesh( this.plane, mat );
   }


   animate( time ) {

      this.vertexData.forEach( ( vertex, index ) => {
         var ywave = vertex.initialHeight + Math.sin( time + vertex.phase ) * vertex.amplitude;
         this.plane.attributes.position.setXYZ( index, this.plane.attributes.position.getX( index ), ywave, this.plane.attributes.position.getZ( index ) );
         this.plane.attributes.position.needsUpdate = true;
      } );

   }

}


