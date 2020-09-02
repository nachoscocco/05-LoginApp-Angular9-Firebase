import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm }  from '@angular/forms'
import Swal from 'sweetalert2';


import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel ;  //creo la instancia
  recordarme:boolean = false;



  constructor( private auth:AuthService,
               private router: Router ) { }

  ngOnInit() { 

    this.usuario = new UsuarioModel();
   /*  this.usuario.email  = "nachoscocco14@gmail.com";
    this.usuario.pasword = "angular2020";
    this.usuario.nombre = "Ignacio Scocco"; */
  }
  onSubmit( form : NgForm ){


    if(form.invalid) {return; } 
/* Osea q si el form es invalid no se ejecuta lo de abajos */



    Swal.fire({

      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere por favor',
      text: 'Cargando'

    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario)
          .subscribe( resp=>{

            //-----------REGISTRO CORRECTO----------
          Swal.close();

            if (this.recordarme = true) {
              localStorage.setItem('email', this.usuario.email);
            }
            this.router.navigateByUrl('/home');
            //-----POPUP Q CONFIRMA---

            Swal.fire({
              allowOutsideClick: false,
              icon: 'success',
              title: 'Cuenta creada con exito!'
            });

          }, (err)=>{

        //------ REGISTRO ERRONEO---------

              Swal.fire({


                icon: 'error',
                title: 'Error al registrarse',
                text: err.error.error.message

              });
            console.log(err.error.error.message);
          });
  }

}
