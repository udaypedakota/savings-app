import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DataService, Chit } from '../data.service';

@Component({
  selector: 'app-add-chit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-chit.html',
  styleUrl: './add-chit.css',
})
export class AddChit implements OnInit {
  isEdit = false;
  editId = '';
  form = { name: '', totalAmount: 0, monthlyAmount: 0, duration: 20, startDate: '' };

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.form.startDate = new Date().toISOString().split('T')[0];
    this.editId = this.route.snapshot.paramMap.get('id') || '';
    if (this.editId) {
      this.isEdit = true;
      const chit = this.data.getChits().find(c => c.id === this.editId);
      if (chit) this.form = { name: chit.name, totalAmount: chit.totalAmount, monthlyAmount: chit.monthlyAmount, duration: chit.duration, startDate: chit.startDate };
    }
  }

  onTotalChange() {
    if (this.form.totalAmount && this.form.duration)
      this.form.monthlyAmount = Math.round(this.form.totalAmount / this.form.duration);
  }

  submit() {
    if (!this.form.name || !this.form.totalAmount || !this.form.duration) return;
    if (this.isEdit) {
      this.data.updateChit({ ...this.form, id: this.editId });
    } else {
      this.data.addChit(this.form);
    }
    this.router.navigate(['/chits']);
  }
}
