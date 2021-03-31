import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsuariosModule,
    CategoriesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'avatars'),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
