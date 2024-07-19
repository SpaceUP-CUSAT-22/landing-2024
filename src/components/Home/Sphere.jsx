import React from 'react'
import * as THREE from 'three'

const Sphere = () => {
    React.useEffect(() => {
        var renderer, scene, camera, composer, planet, skelet;

        window.onload = function() {
            init();
            animate();
        }

        function init() {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.autoClear = false;
            renderer.setClearColor(0x000000, 0.0);
            document.getElementById('sphere').appendChild(renderer.domElement);

            scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0xDE5C64, 1, 1000);

            camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 400;
            camera.position.x = 0;
            camera.position.y = 100;
            scene.add(camera);

            planet = new THREE.Object3D();
            skelet = new THREE.Object3D();
            scene.add(planet);
            scene.add(skelet);

            planet.position.y = -180;
            skelet.position.y = -180;

            var geom = new THREE.IcosahedronGeometry(13, 2);
            var mat = new THREE.MeshPhongMaterial({
                color: 0xDE5C64,
                shading: THREE.FlatShading
            });
            var bones = new THREE.MeshPhongMaterial({
                color: 0xA6232B,
                wireframe: true,
                side: THREE.DoubleSide
            });

            var mesh = new THREE.Mesh(geom, mat);
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 18;
            planet.add(mesh);

            var mesh = new THREE.Mesh(geom, bones);
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 20;
            skelet.add(mesh);

            var ambientLight = new THREE.AmbientLight(0xDE5C64);
            scene.add(ambientLight);

            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            window.addEventListener('resize', onWindowResize, false);

        };

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);

            planet.rotation.z += .001;
            planet.rotation.y = 0;
            planet.rotation.x = 0;
            skelet.rotation.z -= .001;
            skelet.rotation.y = 0;
            skelet.rotation.x = 0;
            renderer.clear();

            renderer.render( scene, camera );
        };
    }, [])
  return (
    <div className='md:block block absolute md:top-0 top-20 m-0 p-0 w-full' id="sphere"></div>
  )
}

export default Sphere