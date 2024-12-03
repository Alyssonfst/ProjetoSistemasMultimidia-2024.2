import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-atividades',
  standalone: true,
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AtividadesComponent {
  activities = [
    { name: 'Caminhada de 30 minutos', points: 10 },
    { name: 'Corrida de 20 minutos', points: 20 },
    { name: 'Yoga por 15 minutos', points: 15 },
    { name: 'Pular corda por 10 minutos', points: 25 },
    { name: 'Andar de bicicleta por 40 minutos', points: 30 },
  ];

  totalScore = 0;

  newActivityName = ''; 
  newActivityPoints: number | null = null; 

  completeActivity(index: number): void {
    const completedActivity = this.activities.splice(index, 1)[0];
    this.updateScore(completedActivity.points);
  }

  updateScore(points: number): void {
    this.totalScore += points;
  }

  // Adiciona uma nova atividade à lista
  addActivity(): void {
    if (this.newActivityName && this.newActivityPoints !== null) {
      this.activities.push({
        name: this.newActivityName,
        points: this.newActivityPoints,
      });
      this.newActivityName = '';
      this.newActivityPoints = null;
    }
  }
}
