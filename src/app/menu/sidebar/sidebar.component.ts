import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  role: any;
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
        this.getRole();
        this.getNom();


    }
    
getRole(){
  this.role = localStorage.getItem('roles');
  console.log(this.role);
  return this.role;

}
getNom(){
  this.nom = localStorage.getItem('nom');
  console.log(this.nom);
  return this.nom;
}

}
