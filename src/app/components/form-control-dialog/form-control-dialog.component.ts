import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, FormModel } from 'src/app/shared/types';

@Component({
  selector: 'app-form-control-dialog',
  templateUrl: './form-control-dialog.component.html',
  styleUrls: ['./form-control-dialog.component.scss'],
})
export class FormControlDialogComponent implements OnInit {
  form!: FormGroup<FormModel>;
  title: string;
  values: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: DialogData,
    private dialogRef: MatDialogRef<FormControlDialogComponent>
  ) {
    this.title = data.title;
    this.values = data.values;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      values: new FormArray([]),
    });
    for (const value of this.values) {
      this.form.controls.values.push(
        new FormControl(value, [Validators.required, Validators.maxLength(40)])
      );
    }
  }

  addLine() {
    this.form.controls.values.push(
      new FormControl('', [Validators.required, Validators.maxLength(40)])
    );
  }

  removeLine(index: number) {
    this.form.controls.values.removeAt(index);
  }

  onClose() {
    this.dialogRef.close();
  }

  onApply() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.values);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
