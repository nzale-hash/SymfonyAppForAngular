import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2'
import * as jsPDF from 'jspdf';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.scss']
})
export class RetraitComponent implements OnInit {
  laDate:Date=new Date();

  constructor(private _trans:TransactionService,
    private _router: Router,private _auth:AuthService) { }
    @ViewChild("rows")rows:ElementRef;
    downloadPdf(){
     
      var doc = new jsPDF();
      var specialElementHandlers ={
        '#contrat': function(Element,render){return true;}
      };
      doc.fromHTML($('#contrat').get(0),2,2,{
        'width':500,
        'elementHandlers':specialElementHandlers
    });
      doc.save('recu.pdf')
    //  window.print();
    }
    code
    info:[];
    valide ={}

  ngOnInit() {
  
 this._auth.getInfo().subscribe(
   res =>{
     this.info=res 
     console.log(this.info)
   },
   err => {
    if( err instanceof HttpErrorResponse ) {
      if (err.status === 401) {
        this._auth.logoutUser();   
           }
    }
  }
)
 


}

  verifier(){
    this._trans.verifier(this.valide)
    .subscribe(
    
   res =>{
  
    if(res.validate==true){
      Swal.fire(
        {
          type: 'warning',
          title: 'Oops...',
          html: '<h1> Le transfert a été retiré </h1>',
        })
       
    }else
    {
      this.code =res
      console.log(this.code)
    }
  },
      err => {
        if(err){
          Swal.fire(
            {
              type: 'error',
              title: 'Oops...',
              html: '<h3>ce code n\'est pas valide<h3>',
            })
        }
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();             }
        }
      }
      
    )
  }
  retrait(){
    this._trans.retrait(this.valide)
    .subscribe(
      res => {
        if (res) {
          Swal.fire({
            html: '<h3>Le retrait a été fait avec succes<h3>',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'btn btn-success',
            cancelButtonColor: '#d33',
            confirmButtonText: 'imprimer , recu it!'
          }).then((result) => {
            if (result.value) {
              this.downloadPdf();
            }
            
          })
        }
        if(res.status){
          Swal.fire(
            {
              type: 'warning',
              title: 'Oops...',
              html: '<h1> Le transfert a été retiré </h1>',
            })
      //  this._router.navigate(['/depot'])
      }
      if(res.message){
        Swal.fire(
          {
            type: 'warning',
            title: 'Oops...',
            html: '<h1>' +res.message+'</h1>',
          })
    //  this._router.navigate(['/depot'])
    }
    },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();             }
        }
   
      }
    )
  }
}
