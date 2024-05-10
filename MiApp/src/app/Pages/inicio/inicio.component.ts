import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ApiAwpService } from '../../Services/api-awp.service';
import { AspNetUser } from '../../Models/AspNetUser';
import { Route, Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: 
  [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private apiAwpService = inject(ApiAwpService);//Nos traemos la interfaz  el servicio
  public UserList : AspNetUser[] = [];
  public displayedColumns: string[] = ['userName','email','id','accion'];//Estas son las columnas que se vana a mostrar 
  constructor(private router : Router)
  {
    this.obtenerEmpleados();
  }// PARA CAMBIAR DE VISTA
  
obtenerEmpleados()
  {
    this.apiAwpService.listUsers().subscribe(
      {
        next:(data) =>
          {
            if(data.length >0)
              {
                
                this.UserList = data
                console.log(data);
              }
          },
        error:(err) =>
          {
            console.log(err.message)
          }
      })

  }

obtenerEmpleadoById(idUser:string)
{
  this.apiAwpService.FindUserById(idUser).subscribe(
    {
      next:(data) =>
        {
          if(data)
            {
              this.router.navigate(['/user',data.id])
            }else
            {
              alert("User not found");
            }
        },error(err)
        {
          console.log(err.message);
        }

    })
}

 newUser()
  {
    this.router.navigate(['/user','0']);//0 ya que no hay ningun  id empleado apra crear
  }
  updateUser(model: AspNetUser)
  {
    this.router.navigate(['/user',model.id])
  }
   async  deleteUser(model:AspNetUser)
  {
   
    if(confirm("Desea Eliminar el usuario?: " + model.userName))
      {
         
          (this.apiAwpService.DeleteUser(model.id)).subscribe(
          {

            next:(data)=>
              {

                console.log("Respuesta:" + data.statusCode);
                if(data.statusCode === 204)
                  {
                      this.obtenerEmpleados();
                    alert("usuario eliminado efectivamente");
                  }else
                  {
                    alert("No se pudo eliminar")
                  }
              }
                
          });
      
      }
  }

 /*  updateUser(model:AspNetUser)
  {
    this.apiAwpService.UpdateUser(model).subscribe(
      {
        next:(data)=>
          {
            if(data.response)
              {
                this.obtenerEmpleados();
              }
              else
              {
                alert("No se pudo actualizar el usario")
              }
          },error(err)
          {
            console.log(err.message);
          }
      })
  } */
}
