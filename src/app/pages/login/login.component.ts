import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm }  from '@angular/forms'
import { Router } from "@angular/router";

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: UsuarioModel = new UsuarioModel(); //creo la instancia del modelo de usuario a logear
  recordarme:boolean = false;

  constructor( private auth : AuthService,
               private router : Router ) { }

  ngOnInit() {
     //pregunto si la checkbox ta activada apenas recargo la pagina asi muestra el mail
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }
  login( form: NgForm ){

    if(form.invalid){return ; }
  
    Swal.fire({

      allowOutsideClick:false,
      icon:'info',
      title: 'Espere por favor',
      text: 'Cargando'

    });
    Swal.showLoading();   //saca el boton y muestra la rueda de carga

     this.auth.login( this.usuario)
        .subscribe( resp=>{
        // LOGIN CORRECTO
          Swal.close(); //cierro el loading, pues ya tiene la info

          if (this.recordarme = true) {
            localStorage.setItem('email',this.usuario.email );
          }

          this.router.navigateByUrl('/home');
        },(err =>{
                
            //ERROR DE LOGIN 

            Swal.fire({

             
              icon: 'error',
              title: 'Error de inicio de sesion',
              text: err.error.error.message

            });
          console.log(err.error.error.message);

        }));
    /* console.log("Imprimir SI el usuario es valido ")
    console.log(form); */
  }
  

}
