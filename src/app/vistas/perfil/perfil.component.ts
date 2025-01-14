import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog'; // Importar el servicio para modales
import { ModificarPerfilComponent } from './modificar-perfil/modificar-perfil.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
  
export class PerfilComponent implements OnInit {

  usuario: any;
  usernameOrEmail: string = localStorage.getItem('usernameOrEmail') || '';
  constructor(private authService: AuthService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(): void {
    this.authService.obtenerPerfil(this.usernameOrEmail).subscribe(
      data => {
        if (data.success) {
          this.usuario = data;
        } else {
          console.error('Error al obtener el perfil:', data.message);
        }
      },
      error => {
       // console.error('Error en la solicitud POST:', error);
      }
    );
  }

  // Función para abrir el modal
    abrirModal(): void {
      const dialogRef = this.dialog.open( ModificarPerfilComponent, {
        width: '800px', // Ajustar el ancho del modal
        height: '600px', // Ajustar la altura del modal
        data: this.usuario // Pasar el usuario al modal
      });
    }
}
