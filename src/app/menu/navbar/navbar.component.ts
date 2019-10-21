import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nom :any;
  prenom :any;
  imageName:any
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
        this.getPrenom();
       this.getImageName();

    }
    

getNom(){
  this.nom = localStorage.getItem('nom');
  console.log(this.nom);
  return this.nom;
}
getPrenom(){
  this.prenom = localStorage.getItem('prenom');
  console.log(this.prenom);
  return this.prenom;

}
getImageName(){
  this.imageName = localStorage.getItem('imageName');
  console.log(this.imageName);
  return this.imageName;

}
}
