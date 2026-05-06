import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Chit, Payment as PaymentModel } from '../data.service';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit {
  chits: Chit[] = [];
  payments: PaymentModel[] = [];
  selectedChit: Chit | null = null;
  showForm = false;

  form = { chitId: '', month: '', paidAmount: 0, date: '' };

  constructor(private data: DataService) {}

  ngOnInit() {
    this.chits = this.data.getChits();
    this.payments = this.data.getPayments();
    this.form.date = new Date().toISOString().split('T')[0];
  }

  onChitChange() {
    this.selectedChit = this.chits.find(c => c.id === this.form.chitId) || null;
    if (this.selectedChit) this.form.paidAmount = this.selectedChit.monthlyAmount;
  }

  totalPaid(chitId: string)  { return this.data.totalPaid(chitId); }
  remaining(c: Chit)         { return this.data.remaining(c); }
  paidMonths(chitId: string) { return this.data.getPaymentsForChit(chitId).length; }
  pendingMonths(c: Chit)     { return c.duration - this.paidMonths(c.id); }

  paymentsFor(chitId: string) {
    return this.payments.filter(p => p.chitId === chitId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  add() {
    if (!this.form.chitId || !this.form.month || !this.form.paidAmount) return;
    this.data.addPayment(this.form);
    this.payments = this.data.getPayments();
    this.form = { chitId: this.form.chitId, month: '', paidAmount: this.selectedChit?.monthlyAmount || 0, date: new Date().toISOString().split('T')[0] };
    this.showForm = false;
  }

  deletePayment(id: string) {
    this.data.deletePayment(id);
    this.payments = this.data.getPayments();
  }
}
