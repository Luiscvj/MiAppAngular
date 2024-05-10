import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { AspNetUser } from '../Models/AspNetUser';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAwpService {
  private http = inject(HttpClient);//injecto http para poder hacer uso de las solicitudes 
  private apiUrl:string = appsettings.apiUrl + "User"; // creo mi Url a la cual voy a apuntar

  constructor() { }


  /**
   **Peticiones a la webApi
   */
    listUsers() 
    {
      return this.http.get<AspNetUser[]>(`${this.apiUrl}/ListOfUsers`);
      //hacemos la solicitud
      //Declaramos lo que vamos a recibir
      //Pasamos la url 
      //retornamos 

    }

    FindUserById(id:string)
    {
      return this.http.get<AspNetUser>(`${this.apiUrl}/${id}`);
    }

    CreateUser(model: AspNetUser)
    {
      
      let respuesta = this.http.post<any>(`${this.apiUrl}/RegisterUser`,model)
   
      return respuesta;
    }

    DeleteUser(idUser: string): Observable<any> {

      return this.http.delete<any>(`${this.apiUrl}?UserId=${idUser}`)
    }
    UpdateUser(model:AspNetUser)
    {
      return this.http.put<ResponseAPI>(this.apiUrl,model);
    }
}
