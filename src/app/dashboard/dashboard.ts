import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, Chit } from '../data.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  chits: Chit[] = [];

  constructor(private data: DataService) {}
  ngOnInit() { this.chits = this.data.getChits(); }

  totalPaid(c: Chit) { return this.data.totalPaid(c.id); }
  remaining(c: Chit) { return this.data.remaining(c); }
  progress(c: Chit) { return Math.round((this.totalPaid(c) / c.totalAmount) * 100); }
  paidMonths(c: Chit) { return this.data.getPaymentsForChit(c.id).length; }

  get grandTotal()     { return this.chits.reduce((s, c) => s + c.totalAmount, 0); }
  get grandPaid()      { return this.chits.reduce((s, c) => s + this.totalPaid(c), 0); }
  get grandRemaining() { return this.chits.reduce((s, c) => s + this.remaining(c), 0); }
  get monthlyDue()     { return this.chits.reduce((s, c) => s + c.monthlyAmount, 0); }

  get othersOweMe()  { return this.data.getLendings().filter(x => x.type === 'gave' && !x.settled).reduce((s, x) => s + x.amount, 0); }
  get iOweOthers()   { return this.data.getLendings().filter(x => x.type === 'took' && !x.settled).reduce((s, x) => s + x.amount, 0); }
  get axisOutstanding()   { return this.data.cardOutstanding('Axis'); }
  get canaraOutstanding() { return this.data.cardOutstanding('Canara'); }
}
