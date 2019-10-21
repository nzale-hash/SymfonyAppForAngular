import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import {MatInputModule} from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-envoi',
  templateUrl: './envoi.component.html',
  styleUrls: ['./envoi.component.scss']
})
export class EnvoiComponent implements OnInit {
  EnvoiData = {}
tarif
  constructor(private _trans:TransactionService,private _authService :AuthService,private _router: Router) { }

  ngOnInit() {
  }

envoi() {
    
  this._trans.envoi(this.EnvoiData)
  .subscribe(
    res => {
   
        if (res.message) {
          Swal.fire({
            type: 'success',
              title: res.message,
              showConfirmButton: true,

          })
      }
      console.log(res);
   
    
      this._router.navigate(['/accueil'])
    },
    err => {
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          this._authService.logoutUser();        }
      }
    }
  )    
    
}

frais(){
  this._trans.frais(this.EnvoiData)
  .subscribe(
  
 res =>{this.tarif =res
  console.log(this.tarif)
},
    err => {
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          this._authService.logoutUser();        }
      }
    }
  )
}
}
