import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, Chit } from '../data.service';

@Component({
  selector: 'app-chit-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './chit-list.html',
  styleUrl: './chit-list.css',
})
export class ChitList implements OnInit {
  chits: Chit[] = [];

  constructor(private data: DataService) {}
  ngOnInit() { this.chits = this.data.getChits(); }

  totalPaid(c: Chit)  { return this.data.totalPaid(c.id); }
  remaining(c: Chit)  { return this.data.remaining(c); }
  progress(c: Chit)   { return Math.round((this.totalPaid(c) / c.totalAmount) * 100); }
  paidMonths(c: Chit) { return this.data.getPaymentsForChit(c.id).length; }

  delete(id: string) {
    if (!confirm('Delete this chit and all its payments?')) return;
    this.data.deleteChit(id);
    this.chits = this.data.getChits();
  }
}
