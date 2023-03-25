import { PerspectiveCamera } from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import { aspectRatio, farPlane, fieldOfView, nearPlane } from "../global.js";



const camera = new PerspectiveCamera( fieldOfView, aspectRatio, nearPlane, farPlane );

export default camera;
