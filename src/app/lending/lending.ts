import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Lending as LendingModel } from '../data.service';

@Component({
  selector: 'app-lending',
  imports: [CommonModule, FormsModule],
  templateUrl: './lending.html',
  styleUrl: './lending.css',
})
export class Lending implements OnInit {
  items: LendingModel[] = [];
  showForm = false;
  form = { person: '', amount: 0, type: 'gave' as 'gave' | 'took', date: '', note: '' };

  constructor(private data: DataService) {}
  ngOnInit() {
    this.items = this.data.getLendings();
    this.form.date = new Date().toISOString().split('T')[0];
  }

  add() {
    if (!this.form.person || !this.form.amount) return;
    this.data.addLending({ ...this.form, settled: false });
    this.items = this.data.getLendings();
    this.form = { person: '', amount: 0, type: 'gave', date: new Date().toISOString().split('T')[0], note: '' };
    this.showForm = false;
  }

  toggleSettle(item: LendingModel) {
    this.data.updateLending({ ...item, settled: !item.settled });
    this.items = this.data.getLendings();
  }

  delete(id: string) {
    this.data.deleteLending(id);
    this.items = this.data.getLendings();
  }

  get gave()       { return this.items.filter(x => x.type === 'gave' && !x.settled); }
  get took()       { return this.items.filter(x => x.type === 'took' && !x.settled); }
  get settled()    { return this.items.filter(x => x.settled); }
  get totalGave()  { return this.gave.reduce((s, x) => s + x.amount, 0); }
  get totalTook()  { return this.took.reduce((s, x) => s + x.amount, 0); }
}
