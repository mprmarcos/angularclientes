import { Component, OnInit } from '@angular/core';
import {enableProdMode} from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular-clientes';
  cliente = {} as Cliente;
  clientes: Cliente[] = [];
  
  constructor(private clienteService: ClienteService) {
    enableProdMode();
  }
  
  ngOnInit() {
    this.getClientes();
    
  }

  getClientes() {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  saveCliente(form: NgForm) {
    if (this.cliente.id !== undefined) {
      
      this.clienteService.updateCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clienteService.saveCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    }
    this.getClientes();
  }

  deleteCliente(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente).subscribe(() => {
      this.getClientes();
    });
    this.getClientes();
  }

  editCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.getClientes();
  }

  cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    this.cliente = {} as Cliente;
  }

}