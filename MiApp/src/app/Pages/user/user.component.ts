import { Component, Input, OnInit, inject, input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {
  FormBuilder,//para construir 
  FormGroup,//para construir un grupo de formularios
  ReactiveFormsModule,// y para obetener lo que se escribe en los inputs de texto
} from '@angular/forms';
import { ApiAwpService } from '../../Services/api-awp.service';
import { Router } from '@angular/router';
import { AspNetUser } from '../../Models/AspNetUser';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {//onInit es un metodo  que se ejecuta cuando se inicialice el componenete

  @Input('id')idUser!: string;//decoracion de entrada que permite a otros componenetes pasarle datos al componente actual
  private apiAwpService = inject(ApiAwpService);
  public formBuild = inject(FormBuilder);//dependencia para manjear formularios reactivos


  //valores de nuestro formulario
  public formEmpleado:FormGroup = this.formBuild.group(//Un formGroup es una agrupacion de controles de formulario, 
    {
      userName:[''],//estos campos son parte de un JSON que se pasa al metodo group
      Email:[''],
      password:['']

    })

    constructor(private router:Router){}
    ngOnInit(): void {
      if(this.idUser != null)
        {
          this.apiAwpService.FindUserById(this.idUser).subscribe(
            {
              next:(data)=>
                {
                  this.formEmpleado.patchValue(
                    {
                      userName: data.userName,
                      Email:data.email
                    })
                },error:(err)=>
                {
                  console.log(err.message);
                }
            })
        }
    }


    saveData()
    {
      const objeto:AspNetUser =
      {
        id: this.idUser,
        userName: this.formEmpleado.value.userName,
        email:this.formEmpleado.value.Email,
        password:this.formEmpleado.value.password

      }
      if(this.idUser == '0')
        {
          this.apiAwpService.CreateUser(objeto).subscribe(
            {
              next:(data)=>
                {
                  console.log(data.statusCode)
                  if(data.statusCode === 201)
                    {
                      alert("Usuario creado exitosamente")
                      this.router.navigate(["/"])
                      //navegamos al inivio
                    }else
                    {
                      alert("No se pudo crear el usuario")
                    }
                
                },error:(err)=>
                {
                  console.log(err.message);
                }
            })
        }//verificamos si creamos o editamos con el Id
        else if(this.idUser != null)
          {
            this.apiAwpService.UpdateUser(objeto).subscribe(
              {
                next:(data)=>
                  {
                    if(data.response != null)
                      {
                        alert("Usuario actualizado exitosamente")
                        this.router.navigate(["/"])
                      }
                      alert("No se pudo actualizar el usuario")

                  },error:(err)=>
                    {
                      console.log(err.message);
                    }
              })
          }
    }

  volver()
  {
    this.router.navigate(["/"])
  }

}
