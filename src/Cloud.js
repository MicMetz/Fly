import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import { Colors } from "./global.js";



export class Cloud {
   constructor() {
      this.mesh      = new THREE.Object3D();
      this.mesh.name = "cloud";

      var geom = new THREE.CubeGeometry( 20, 20, 20 );
      var mat  = new THREE.MeshPhongMaterial( {
         color: Colors.white,
      } );

      var nBlocs = 3 + Math.floor( Math.random() * 3 );
      for ( var i = 0; i < nBlocs; i++ ) {
         var m        = new THREE.Mesh( geom.clone(), mat );
         m.position.x = i * 15;
         m.position.y = Math.random() * 10;
         m.position.z = Math.random() * 10;
         m.rotation.z = Math.random() * Math.PI * 2;
         m.rotation.y = Math.random() * Math.PI * 2;
         var s        = 0.1 + Math.random() * 0.9;
         m.scale.set( s, s, s );
         m.castShadow    = true;
         m.receiveShadow = true;
         this.mesh.add( m );
      }


   }


   moveCloud( time ) {
      this.mesh.position.x += time * 0.01;
      if ( this.mesh.position.x > 100 ) {
         this.mesh.position.x = -100;

      }
   }


   rotateCloud( time ) {
      for ( var i = 0; i < this.mesh.children.length; i++ ) {
         var m = this.mesh.children[ i ];
         m.rotation.z += time * 0.01;
         m.rotation.y += time * 0.01;
      }
   }


   scaleCloud( time ) {
      for ( var i = 0; i < this.mesh.children.length; i++ ) {
         var m     = this.mesh.children[ i ];
         m.scale.x = 1 + Math.sin( time + i );
         m.scale.y = 1 + Math.sin( time + i );
         m.scale.z = 1 + Math.sin( time + i );
      }
   }


   animate( time ) {
      this.moveCloud( time );
      this.rotateCloud( time );
      this.scaleCloud( time );
   }

}

