import { Injectable } from '@angular/core';

export interface Chit {
  id: string;
  name: string;
  totalAmount: number;
  monthlyAmount: number;
  duration: number;
  startDate: string;
}

export interface Payment {
  id: string;
  chitId: string;
  month: string;
  paidAmount: number;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private CHIT_KEY = 'chits';
  private PAY_KEY = 'payments';
  private VERSION_KEY = 'data_version';
  private CURRENT_VERSION = '2';

  constructor() {
    const savedVersion = localStorage.getItem(this.VERSION_KEY);
    if (savedVersion !== this.CURRENT_VERSION) {
      localStorage.clear();
      localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION);
    }
  }

  getChits(): Chit[] {
    const s = localStorage.getItem(this.CHIT_KEY);
    if (s) return JSON.parse(s);
    const defaults: Chit[] = [
      { id: '1', name: '3L Chit', totalAmount: 300000, monthlyAmount: 15000, duration: 20, startDate: '2024-04-01' },
      { id: '2', name: '1L Chit', totalAmount: 100000, monthlyAmount: 5000,  duration: 20, startDate: '2024-05-01' },
      { id: '3', name: '1L Chit (S&U)', totalAmount: 100000, monthlyAmount: 5000, duration: 20, startDate: '2025-04-01' },
    ];
    this.saveChits(defaults);
    return defaults;
  }

  saveChits(chits: Chit[]) { localStorage.setItem(this.CHIT_KEY, JSON.stringify(chits)); }

  addChit(chit: Omit<Chit, 'id'>): Chit {
    const chits = this.getChits();
    const newChit = { ...chit, id: Date.now().toString() };
    chits.push(newChit);
    this.saveChits(chits);
    return newChit;
  }

  updateChit(chit: Chit) {
    const chits = this.getChits().map(c => c.id === chit.id ? chit : c);
    this.saveChits(chits);
  }

  deleteChit(id: string) {
    this.saveChits(this.getChits().filter(c => c.id !== id));
    this.savePayments(this.getPayments().filter(p => p.chitId !== id));
  }

  getPayments(): Payment[] {
    const s = localStorage.getItem(this.PAY_KEY);
    if (s) return JSON.parse(s);
    const defaults: Payment[] = [
      { id: 'p1',  chitId: '1', month: 'Apr 2024', paidAmount: 12450, date: '2024-04-05' },
      { id: 'p2',  chitId: '1', month: 'May 2024', paidAmount: 12495, date: '2024-05-05' },
      { id: 'p3',  chitId: '1', month: 'Jun 2024', paidAmount: 12535, date: '2024-06-05' },
      { id: 'p4',  chitId: '1', month: 'Jul 2024', paidAmount: 12520, date: '2024-07-05' },
      { id: 'p5',  chitId: '1', month: 'Aug 2024', paidAmount: 12625, date: '2024-08-05' },
      { id: 'p6',  chitId: '1', month: 'Sep 2024', paidAmount: 12720, date: '2024-09-05' },
      { id: 'p7',  chitId: '1', month: 'Oct 2024', paidAmount: 12950, date: '2024-10-05' },
      { id: 'p8',  chitId: '1', month: 'Nov 2024', paidAmount: 12950, date: '2024-11-05' },
      { id: 'p9',  chitId: '1', month: 'Dec 2024', paidAmount: 13100, date: '2024-12-05' },
      { id: 'p10', chitId: '1', month: 'Jan 2025', paidAmount: 13290, date: '2025-01-05' },
      { id: 'p11', chitId: '1', month: 'Feb 2025', paidAmount: 13700, date: '2025-02-05' },
      { id: 'p12', chitId: '1', month: 'Mar 2025', paidAmount: 14075, date: '2025-03-05' },
      { id: 'p13', chitId: '1', month: 'Apr 2025', paidAmount: 14275, date: '2025-04-05' },
      { id: 'p14', chitId: '1', month: 'May 2025', paidAmount: 14475, date: '2025-05-05' },
      { id: 'p15', chitId: '2', month: 'May 2024', paidAmount: 5000, date: '2024-05-05' },
      { id: 'p16', chitId: '2', month: 'Jun 2024', paidAmount: 5000, date: '2024-06-05' },
      { id: 'p17', chitId: '2', month: 'Jul 2024', paidAmount: 5000, date: '2024-07-05' },
      { id: 'p18', chitId: '2', month: 'Aug 2024', paidAmount: 5000, date: '2024-08-05' },
      { id: 'p19', chitId: '2', month: 'Sep 2024', paidAmount: 5000, date: '2024-09-05' },
      { id: 'p20', chitId: '2', month: 'Oct 2024', paidAmount: 5000, date: '2024-10-05' },
      { id: 'p21', chitId: '2', month: 'Nov 2024', paidAmount: 5000, date: '2024-11-05' },
      { id: 'p22', chitId: '2', month: 'Dec 2024', paidAmount: 5000, date: '2024-12-05' },
      { id: 'p23', chitId: '2', month: 'Jan 2025', paidAmount: 5000, date: '2025-01-05' },
      { id: 'p24', chitId: '2', month: 'Feb 2025', paidAmount: 5000, date: '2025-02-05' },
      { id: 'p25', chitId: '2', month: 'Mar 2025', paidAmount: 5000, date: '2025-03-05' },
      { id: 'p26', chitId: '2', month: 'Apr 2025', paidAmount: 5000, date: '2025-04-05' },
      { id: 'p27', chitId: '2', month: 'May 2025', paidAmount: 5000, date: '2025-05-05' },
      { id: 'p28', chitId: '3', month: 'Apr 2025', paidAmount: 5000, date: '2025-04-05' },
      { id: 'p29', chitId: '3', month: 'May 2025', paidAmount: 5000, date: '2025-05-05' },
    ];
    this.savePayments(defaults);
    return defaults;
  }

  savePayments(payments: Payment[]) { localStorage.setItem(this.PAY_KEY, JSON.stringify(payments)); }

  addPayment(payment: Omit<Payment, 'id'>): Payment {
    const payments = this.getPayments();
    const newPayment = { ...payment, id: Date.now().toString() };
    payments.push(newPayment);
    this.savePayments(payments);
    return newPayment;
  }

  deletePayment(id: string) {
    this.savePayments(this.getPayments().filter(p => p.id !== id));
  }

  getPaymentsForChit(chitId: string): Payment[] {
    return this.getPayments().filter(p => p.chitId === chitId);
  }

  totalPaid(chitId: string): number {
    return this.getPaymentsForChit(chitId).reduce((s, p) => s + p.paidAmount, 0);
  }

  remaining(chit: Chit): number {
    return chit.totalAmount - this.totalPaid(chit.id);
  }
}
