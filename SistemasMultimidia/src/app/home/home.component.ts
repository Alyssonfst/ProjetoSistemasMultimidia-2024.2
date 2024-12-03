import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Chart } from 'chart.js/auto';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'SistemasMultimidia';

  weight: number = 70; 
  height: number = 1.75; 
  gender: 'male' | 'female' = 'male';

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Object3D;

  private chart: any;

  ngOnInit() {
    this.initialize3DModel();
    this.createCharts();
  }

  initialize3DModel() {
    const container = document.getElementById('modelo-3d');
    if (!container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 300;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(10, 10, 10);
    this.scene.add(pointLight);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    this.loadModelBasedOnBMI();
  }

  calculateBMI(): number {
    return this.weight / (this.height * this.height);
  }

  loadModelBasedOnBMI() {
    const loader = new FBXLoader();
    const bmi = this.calculateBMI();
    let modelPath = '';
  
    if (this.gender === 'male') {
      if (bmi < 18.5) modelPath = 'assets/Skinny_Man_Lores.fbx';
      else if (bmi < 25) modelPath = 'assets/Slender_Man_Lores.fbx';
      else if (bmi < 30) modelPath = 'assets/Heavy_Man_Lores.fbx';
      else modelPath = 'assets/Obese_Man_Lores.fbx';
    } else {
      if (bmi < 18.5) modelPath = 'assets/Skinny_Female_Lores.fbx';
      else if (bmi < 25) modelPath = 'assets/Slender_Female_Lores.fbx';
      else if (bmi < 30) modelPath = 'assets/Heavy_Female_Lores.fbx';
      else modelPath = 'assets/Obese_Female_Lores.fbx';
    }
  
    loader.load(
      modelPath,
      (fbx: THREE.Object3D) => {
        if (this.model) {
          this.scene.remove(this.model);
        }
  
        this.model = fbx;
  
        this.model.traverse((child: any) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat) => {
                  if ((mat as THREE.MeshStandardMaterial).color) {
                    (mat as THREE.MeshStandardMaterial).color.set(0xD2B48C);
                  }
                });
              } else if ((mesh.material as THREE.MeshStandardMaterial).color) {
                (mesh.material as THREE.MeshStandardMaterial).color.set(0xD2B48C); 
              }
            }
          }
        });
        
  
        this.scene.add(this.model);
        this.animate();
      },
      undefined,
      (error: any) => console.error('Erro ao carregar o modelo:', error)
    );
  }
  

  createCharts() {
    const visceralCtx = document.getElementById('grafico-visceral') as HTMLCanvasElement;
    const cinturaEstatura = document.getElementById('grafico-cintura-estatura') as HTMLCanvasElement;
    const gorduraPercent = document.getElementById('grafico-gordura-percent') as HTMLCanvasElement;
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
  
    new Chart(gorduraPercent, {
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

  updateParameters(weight: number, height: number, gender: 'male' | 'female') {
    this.weight = weight;
    this.height = height;
    this.gender = gender;

    this.loadModelBasedOnBMI();

    if (this.chart) {
      const bmi = this.calculateBMI();
      this.chart.data.datasets[0].data = [this.weight, this.height, bmi];
      this.chart.update();
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
