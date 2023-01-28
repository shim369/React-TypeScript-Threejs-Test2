import './App.css'
import * as THREE from "three";
import { useEffect } from 'react';
function App() {
	let canvas: HTMLCanvasElement;
	let camera: THREE.PerspectiveCamera;
	let scene: THREE.Scene;

	useEffect(() => {
		canvas = document.getElementById("canvas") as HTMLCanvasElement;
		const sizes = {
			width: innerWidth,
			height: innerHeight,
		};
		
		//camera
		camera = new THREE.PerspectiveCamera(
			//視野角
			40,
			//アスペクト比
			sizes.width / sizes.height,
			//開始距離
			1,
			//終了距離
			15000,
		);
		camera.position.z = 250;

		
		//renderer
		const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true,
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(window.devicePixelRatio);

		//scene
		scene = new THREE.Scene();
		
		//geometry
		const size = 250;
		const geometry = new THREE.BoxGeometry(size, size, size);
		const material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 50,
		});
		for(let i = 0; i < 2500; i++) {
			const mesh = new THREE.Mesh(geometry, material);
	
			mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
			mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
			mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);
	
			mesh.rotation.x = Math.random() * Math.PI;
			mesh.rotation.y = Math.random() * Math.PI;
			mesh.rotation.z = Math.random() * Math.PI;
			scene.add(mesh);
		}
		//平行光源
		const dirLight = new THREE.DirectionalLight(0xffffff, 0.1);
		scene.add(dirLight);

		addLight(0.08, 0.3, 0.9, 0, 0, -1000);
	
		function addLight(h: any, s: any, l: any, x: any, y: any, z: any) {
			const light = new THREE.PointLight(0xffffff, 1.5, 2000);
			light.color.setHSL(h, s, l);
			light.position.set(x, y, z);
			scene.add(light);
		}
		//renderer
		renderer.setSize(sizes.width, sizes.height);
		document.body.appendChild(renderer.domElement);
	
	
		const tick = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(tick);
		};
		tick();
	},[]);
  return (
	<>
		<canvas id="canvas"></canvas>
		<div className="mainContent">
			<h1>WEB DEVELOPER</h1>
			<p>Three.js</p>
		</div>
	</>
  )
}

export default App
