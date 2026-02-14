import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-yandex'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(private configService: ConfigService) {
		super({
			clientID: configService.getOrThrow('YANDEX_CLIENT_ID'),
			clientSecret: configService.getOrThrow('YANDEX_CLIENT_SECRET'),
			callbackURL:
				configService.get('SERVER_URL') + '/auth/yandex/callback'
		})
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: any
	): Promise<any> {
		const { username, emails, photos } = profile

		const email = emails && emails.length > 0 ? emails[0].value : null
		const picture = photos && photos.length > 0 ? photos[0].value : null

		if (!email) {
			return done(new Error('Email не найден в профиле Yandex'), null)
		}

		const user = {
			email,
			name: username || 'Неизвестный пользователь',
			picture: picture || '/uploads/no-user-image.png'
		}

		done(null, user)
	}
}
