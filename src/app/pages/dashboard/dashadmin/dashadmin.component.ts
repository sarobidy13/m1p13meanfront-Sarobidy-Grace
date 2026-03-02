import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbLayoutModule, NbCardModule, NbListModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { DashboardService } from '../dashboard.service';

declare const echarts: any;

@Component({
  selector: 'ngx-dashboard-admin',
  standalone: true,
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.scss'],
  imports: [CommonModule, NbLayoutModule, NbCardModule, NbListModule, NbIconModule, NbSelectModule]
})
export class DashboardComponent implements OnInit {

  kpiCards = [
    { title: 'Revenus Mensuels Totaux', value: '...', icon: 'trending-up-outline' },
    { title: 'Boutiques', value: '...', icon: 'home-outline' },
    { title: 'Contrats Actifs', value: '...', icon: 'file-text-outline' },
    { title: 'Loyers Payés', value: '...', icon: 'checkmark-circle-2-outline' },
  ];

  derniersLoyers: any[] = [];
  topBoutiques: any[] = [];

  constructor(private dashService: DashboardService) {}

  ngOnInit(): void {
    this.loadKpis();
    this.loadDerniersLoyers();
    this.loadTopBoutiques();
  }

  loadKpis(): void {
    // Revenus mensuels
    this.dashService.getRevenuMensuel().subscribe({
      next: (res) => {
        console.log('revenu mensuel:', res);
        this.kpiCards[0].value = `${res.data.revenuTotal?.toLocaleString()} Ar`;
      },
      error: (err) => {
        console.error('erreur revenu:', err);
        this.kpiCards[0].value = 'N/A';
      },
    });

    // Total boutiques ← corrigé
    this.dashService.getTotalBoutiques().subscribe({
      next: (res) => {
        console.log('total boutiques:', res);
        this.kpiCards[1].value = res.data.total;
      },
      error: (err) => {
        console.error('erreur boutiques:', err);
        this.kpiCards[1].value = 'N/A';
      },
    });

    // Contrats actifs
    this.dashService.getTotalContratsActifs().subscribe({
      next: (res) => {
        console.log('contrats actifs:', res);
        this.kpiCards[2].value = res.data.total;
      },
      error: (err) => {
        console.error('erreur contrats:', err);
        this.kpiCards[2].value = 'N/A';
      },
    });

    // Loyers payés
    this.dashService.getDerniersLoyers().subscribe({
      next: (res) => {
        console.log('loyers payés:', res);
        this.kpiCards[3].value = res.data.nombreLoyers ?? res.data.length;
      },
      error: (err) => {
        console.error('erreur loyers payés:', err);
        this.kpiCards[3].value = 'N/A';
      },
    });
  }

  loadDerniersLoyers(): void {
    this.dashService.getDerniersLoyers().subscribe({
      next: (res) => {
        console.log('loyers liste:', res);
        this.derniersLoyers = res.data;
      },
      error: (err) => console.error('Erreur chargement loyers:', err),
    });
  }

  loadTopBoutiques(): void {
    this.dashService.getTopBoutiques().subscribe({
      next: (res) => {
        console.log('top boutiques:', res);
        this.topBoutiques = res.data;
        this.initChart();
      },
      error: (err) => console.error('Erreur chargement top boutiques:', err),
    });
  }

  initChart(): void {
    const chartDom = document.getElementById('revenuChart')!;
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    const noms = this.topBoutiques.map(b => b.nom);
    const valeurs = this.topBoutiques.map(b => b.chiffreAffaires);

    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const val = params[0].value;
          return `${params[0].name} : ${val.toLocaleString()} Ar`;
        }
      },
      xAxis: { type: 'category', data: noms },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: (val: number) => `${(val / 1000000).toFixed(1)}M` }
      },
      series: [{
        name: 'Chiffre d\'affaires',
        type: 'bar',
        data: valeurs,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#36a2eb' },
            { offset: 1, color: '#1a6fb5' }
          ])
        }
      }]
    });

    window.addEventListener('resize', () => myChart.resize());
  }
}