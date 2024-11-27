import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartType, ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SistemasMultimidia';
}

