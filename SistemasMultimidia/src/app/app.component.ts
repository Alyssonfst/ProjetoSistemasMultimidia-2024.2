import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Chart } from 'chart.js/auto';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'SistemasMultimidia';
}
