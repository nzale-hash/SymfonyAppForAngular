import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  nom :any;

  info :[];
  constructor(private _router: Router,private _auth:AuthService) { }
 
      ngOnInit() {
           //     window.location.reload();

        this._auth.getInfo().subscribe(
          res =>{
            this.info=res 
            console.log(this.info)
          },
            err => {
              if( err instanceof HttpErrorResponse ) {
                if (err.status === 401) {
                  this._router.navigate(['/login'])
                }
              }
            }
        )
    
        this.getNom();
     

    }
    

getNom(){
  this.nom = localStorage.getItem('nom');
  console.log(this.nom);
  return this.nom;
}

}
