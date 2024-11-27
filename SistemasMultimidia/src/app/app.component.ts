import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Chart } from 'chart.js/auto';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SistemasMultimidia';
  ngOnInit() {
    this.initialize3DModel();
    this.createCharts();
  }

  initialize3DModel() {
    const container = document.getElementById('modelo-3d');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load(
      'assets/model.glb',
      (gltf: any) => {
        const model = gltf.scene;
        
        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, -1, 0);
        model.rotation.y = Math.PI;
  

        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {

            if (child.name.includes('visceral') || child.name.includes('abdomen')) {

              child.material = new THREE.MeshPhongMaterial({
                color: 0xffcc00,
                transparent: true,
                opacity: 0.7,
                emissive: 0xffcc00,
                emissiveIntensity: 0.2
              });
            }
          }
        });
  
        scene.add(model);
  
        const animate = () => {
          requestAnimationFrame(animate);
          
          model.rotation.y += 0.001;
          
          renderer.render(scene, camera);
        };
        animate();
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error: any) => {
        console.error('Error loading model:', error);
      }
    );
  
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
  }

  createCharts() {
    const visceralCtx = document.getElementById('grafico-visceral') as HTMLCanvasElement;
    const cinturaEstatura = document.getElementById('grafico-cintura-estatura') as HTMLCanvasElement;
    new Chart(visceralCtx, {
      type: 'doughnut',
      data: {
        labels: ['Gordura Visceral', 'Resto do Corpo'],
        datasets: [
          {
            data: [68.46, 100 - 68.46],
            backgroundColor: ['#ffcc00', '#444'],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        rotation: -90,
        circumference: 180,
        cutout: '80%',
        plugins: {
          legend: { 
            display: true, 
            position: 'bottom',
            labels: { 
              color: 'white' 
            } 
          },
        },
      },
    });
  
    new Chart(cinturaEstatura, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [50, 100 - 50],
            backgroundColor: ['#ffcc00', '#444'],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        rotation: -90, 
        circumference: 180, 
        cutout: '80%',  
        plugins: {
          legend: { 
            display: true, 
            position: 'bottom',
            labels: { 
              color: 'white' 
            } 
          },
        },
      },
    });
  }
  
}
