import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import {
   OrbitControls
} from "https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/OrbitControls.js";

import { container } from "../global.js";
import camera from "./Camera.js";



const controller = new OrbitControls( camera, container );


export default controller;
