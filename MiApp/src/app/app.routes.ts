import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { UserComponent } from './Pages/user/user.component';

export const routes: Routes = 
[
 {path:'',component:InicioComponent},//path indica como se va a mostrar  la url.
                                    //Aqui le digo que si esta vacio que me muestre el componente de inicio
 {path:'inicio',component:InicioComponent},
 {path:'user/:id',component:UserComponent},//Como va a mostrar la informacion del empleado le vamos a pasar el Id en la url

                                    

];
