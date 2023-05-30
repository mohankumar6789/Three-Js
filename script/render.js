import { Data3DTexture } from '../textures/Data3DTexture.js';
import { DataArrayTexture } from '../textures/DataArrayTexture.js';

class WebGL3DRenderTarget extends WebGLRenderTarget {

	constructor( width = 1, height = 1, depth = 1 ) {

		super( width, height );

		this.isWebGL3DRenderTarget = true;

		this.depth = depth;

		this.texture = new Data3DTexture( null, width, height, depth );

		this.texture.isRenderTargetTexture = true;

	}

}

// class WebGLArrayRenderTarget extends WebGLRenderTarget {

// 	constructor( width = 1, height = 1, depth = 1 ) {

// 		super( width, height );

// 		this.isWebGLArrayRenderTarget = true;

// 		this.depth = depth;

// 		this.texture = new DataArrayTexture( null, width, height, depth );

// 		this.texture.isRenderTargetTexture = true;

// 	}

// }

export { WebGLArrayRenderTarget };

export { WebGL3DRenderTarget };