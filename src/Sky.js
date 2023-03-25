import { Object3D, Vector3 } from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";



"https://cdn.jsdelivr.net/npm/0.114/build/module.js";
import { Cloud } from "./Cloud.js";



export class Sky {
   constructor() {
      this.mesh    = new Object3D();
      this.nClouds = 200;
      this.clouds  = [];

      this.init();
   }


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
