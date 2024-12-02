import { Component } from '@angular/core';

@Component({
  selector: 'app-atividades',
  standalone: true,
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css'],
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


  updateScore(points: number): void {
    this.totalScore += points;
  }
}
