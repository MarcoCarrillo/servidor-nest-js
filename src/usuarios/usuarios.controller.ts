import { Param, Controller, Get, Body, Put, Post, Delete } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(private servicio:UsuariosService){

    }

    @Get()
    getAll(@Param() params){
        return this.servicio.obtenerUsuarios(params.id);
    }

    @Get(':id')
    get(@Param() params){
        return this.servicio.obtenerUsuario(params.id);
    }

    @Post()
    create(@Body() usuario:Usuario){
        this.servicio.crearUsuario(usuario);
    }

    @Put()
    update(@Body() usuario:Usuario){
        return this.servicio.actualizarUsuario(usuario);
    }

    @Delete(':id')
    delete(@Param() params){
        return this.servicio.borrarUsuario(params.id);
    }
}

