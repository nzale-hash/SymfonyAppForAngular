import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  jwt = new JwtHelperService;
  message :  any;
  nom :  any;
  prenom :  any;
  imageName : any;
  roles :any
  valuRole= false;
  constructor(private _auth:AuthService,
              private _router: Router) { }

  ngOnInit() {
    console.log(this.roles);
  }

  loginUser () {
    
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
           if(!res.code){
          localStorage.setItem('token', res.token);
          const Decode=this.jwt.decodeToken(res.token);
          localStorage.setItem('username', Decode.username);
          localStorage.setItem('roles', Decode.roles[0]);
          localStorage.setItem('nom', Decode.nom);
          localStorage.setItem('prenom', Decode.prenom);
          localStorage.setItem('expiration', Decode.exp);
          localStorage.setItem('imageName', Decode.imageName);
          this.prenom= res.prenom;
          this.imageName= res.imageName;
          this.nom= res.nom;
          this.roles= res.roles;
          this.authenticate();
          this._router.navigate(['/accueil']);
          //window.location.reload()
        }else{
          localStorage.setItem('message',res.message);
          this.message = res.message;
        }
            
      },
      err => console.log('err' ,err.message)
    ) 
  }
  isAuthenticate(){
    console.log('ceci est un test', this.roles)

    return !this.roles && (this.roles=="ROLE_SUPER"||this.roles=="ROLE_ADMIN"||this.roles=="ROLE_USERS"||this.roles=="ROLE_CAISSIER")
  }

  authenticate() {
    if(this.roles){
      this.valuRole = true;
    }
    else{
      this.valuRole = false;
    }
    return this.valuRole;
  }
}