import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, CardSpend } from '../data.service';

@Component({
  selector: 'app-credit-cards',
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-cards.html',
  styleUrl: './credit-cards.css',
})
export class CreditCards implements OnInit {
  items: CardSpend[] = [];
  showForm = false;
  form = { card: 'Axis' as 'Axis' | 'Canara', amount: 0, date: '', description: '' };

  constructor(private data: DataService) {}
  ngOnInit() {
    this.items = this.data.getCardSpends();
    this.form.date = new Date().toISOString().split('T')[0];
  }

  add() {
    if (!this.form.amount || !this.form.description) return;
    this.data.addCardSpend({ ...this.form, paid: false });
    this.items = this.data.getCardSpends();
    this.form = { card: this.form.card, amount: 0, date: new Date().toISOString().split('T')[0], description: '' };
    this.showForm = false;
  }

  togglePaid(item: CardSpend) {
    this.data.updateCardSpend({ ...item, paid: !item.paid });
    this.items = this.data.getCardSpends();
  }

  delete(id: string) {
    this.data.deleteCardSpend(id);
    this.items = this.data.getCardSpends();
  }

  spendsFor(card: 'Axis' | 'Canara') {
    return this.items.filter(x => x.card === card).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  outstanding(card: 'Axis' | 'Canara') { return this.data.cardOutstanding(card); }
  totalFor(card: 'Axis' | 'Canara')    { return this.spendsFor(card).reduce((s, x) => s + x.amount, 0); }
}
