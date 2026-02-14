import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { UserService } from '../user/user.service'
import { YandexStrategy } from 'src/common/strategies/yandex.strategy'
import { JwtStrategy } from 'src/common/strategies/jwt.strategy'
import { UserModule } from '../user/user.module'


@Module({
	imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		PrismaService,
		UserService,
		YandexStrategy,
		JwtStrategy
	]
})
export class AuthModule {}
