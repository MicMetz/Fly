export const Colors = {
   red: 0xf25346, white: 0xd8d0d1, brown: 0x59332e, pink: 0xf5986e, brownDark: 0x23190f, blue: 0x68c3c0,
};


export const container = document.getElementById( "world" );


export function normalize( v, vmin, vmax, tmin, tmax ) {
   var nv = Math.max( Math.min( v, vmax ), vmin );
   var dv = vmax - vmin;
   var pc = ( nv - vmin ) / dv;
   var dt = tmax - tmin;
   var tv = tmin + pc * dt;
   return tv;
}


export let fieldOfView = 90;
export let nearPlane   = 1;
export let farPlane    = 20000;
export let HEIGHT      = window.innerHeight;
export let WIDTH       = window.innerWidth;
export let aspectRatio = WIDTH / HEIGHT;

export let mousePos = { x: 0, y: 0,	z: 0 };
