import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Chit } from '../data.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit, AfterViewInit {
  @ViewChildren('chartCanvas') canvases!: QueryList<ElementRef<HTMLCanvasElement>>;
  chits: Chit[] = [];

  constructor(private data: DataService) {}
  ngOnInit() { this.chits = this.data.getChits(); }

  ngAfterViewInit() {
    setTimeout(() => {
      this.buildPieChart();
      this.buildBarChart();
      this.buildMonthlyChart();
    }, 100);
  }

  totalPaid(c: Chit)  { return this.data.totalPaid(c.id); }
  remaining(c: Chit)  { return this.data.remaining(c); }
  progress(c: Chit)   { return Math.round((this.totalPaid(c) / c.totalAmount) * 100); }

  get grandPaid()      { return this.chits.reduce((s, c) => s + this.totalPaid(c), 0); }
  get grandRemaining() { return this.chits.reduce((s, c) => s + this.remaining(c), 0); }

  private buildPieChart() {
    const el = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!el) return;
    new Chart(el, {
      type: 'doughnut',
      data: {
        labels: ['Paid', 'Remaining'],
        datasets: [{ data: [this.grandPaid, this.grandRemaining], backgroundColor: ['#6366f1', '#f1f5f9'], borderWidth: 0, hoverOffset: 6 }]
      },
      options: { cutout: '72%', plugins: { legend: { position: 'bottom' } } }
    });
  }

  private buildBarChart() {
    const el = document.getElementById('barChart') as HTMLCanvasElement;
    if (!el) return;
    new Chart(el, {
      type: 'bar',
      data: {
        labels: this.chits.map(c => c.name),
        datasets: [
          { label: 'Paid', data: this.chits.map(c => this.totalPaid(c)), backgroundColor: '#6366f1', borderRadius: 6 },
          { label: 'Remaining', data: this.chits.map(c => this.remaining(c)), backgroundColor: '#e0e7ff', borderRadius: 6 },
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { x: { stacked: false }, y: { beginAtZero: true } } }
    });
  }

  private buildMonthlyChart() {
    const el = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!el) return;

    const allPayments = this.data.getPayments();
    const monthMap = new Map<string, number>();
    allPayments.forEach(p => { monthMap.set(p.month, (monthMap.get(p.month) || 0) + p.paidAmount); });

    const sorted = Array.from(monthMap.entries()).sort((a, b) => {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const [am, ay] = [months.indexOf(a[0].split(' ')[0]), +a[0].split(' ')[1]];
      const [bm, by] = [months.indexOf(b[0].split(' ')[0]), +b[0].split(' ')[1]];
      return ay !== by ? ay - by : am - bm;
    });

    new Chart(el, {
      type: 'line',
      data: {
        labels: sorted.map(e => e[0]),
        datasets: [{
          label: 'Monthly Payment',
          data: sorted.map(e => e[1]),
          borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)',
          fill: true, tension: 0.4, pointBackgroundColor: '#6366f1', pointRadius: 4
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
  }
}
