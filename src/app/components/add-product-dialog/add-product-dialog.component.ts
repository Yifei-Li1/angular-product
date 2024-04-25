import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


export interface DialogData {
  name: string;
  manufacturer: string;
  price:string;
}

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  product:DialogData = {name:'',manufacturer:'',price:''}
  name = ''
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
   
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
 
}