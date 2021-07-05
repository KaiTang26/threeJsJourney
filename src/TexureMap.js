import * as THREE from 'three';
import vertShader from './shaders/texture.vert';
import fragShader from './shaders/texture.frag';
import Map from './map.js';

class TextureMap extends Map {

    constructor() {
      super();
      this.setup();
      super.setup();
    }
  
    setup() {
      this.mats = [];
  
      for (let i = 0; i < 6; i++) {
        this.mats[i] = new THREE.ShaderMaterial({
          uniforms: {
            index: {type: "i", value: i}
          },
          vertexShader: vertShader,
          fragmentShader: fragShader,
          transparent: true,
          depthWrite: false
        });
      }
    }
  
    render(props) {
      // props.resolution
      // props.heightMaps[]
      // props.moistureMaps[]
      // props.biomeMap
  
      let resolution = props.resolution;
  
      for (let i = 0; i < 6; i++) {
  
        this.mats[i].uniforms.heightMap.value = props.heightMaps[i];
        this.mats[i].uniforms.moistureMap.value = props.moistureMaps[i];
        this.mats[i].uniforms.biomeMap.value = props.biomeMap;
        this.mats[i].needsUpdate = true;
      }
  
      super.render(props);
    }
  
  }
  
  export default TextureMap;