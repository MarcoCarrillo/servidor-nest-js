import { Param, Controller, Get, Body, Put, Post, Delete, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { UsuariosService } from './usuarios.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { modFileName } from 'src/utils/image.upload.utils';

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

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('imagen', {
            storage: diskStorage({
                destination:'./avatars',
                filename: modFileName
            })
        })
    )
    async uploadedFile(@Body() usuario:Usuario, @UploadedFile() file){
        
        usuario.avatar = file.filename;

        await this.servicio.crearUsuario(JSON.parse(JSON.stringify(usuario)));

        const response = {
            nombreOriginal: file.originalname,
            nombreFinal: file.filename
        };
        return {
            status: HttpStatus.OK,
            message: 'La imagen se subió correctamente',
            data: response
        }
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

