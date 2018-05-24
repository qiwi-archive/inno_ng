import {Injectable} from "@angular/core";
// TODO: temp code. replace with i18n
@Injectable()
export class ErrorMessageService {
    messageMap: any = {
        ERROR_LDAP_LOGIN_FAILED: 'Попытка входа не удалась. Проверьте данные для входа.',
        ERROR_CONNECT: 'Ошибка при попытке соединения с сервером.',
        ERROR_UNKNOWN: 'Неизвестная ошибка',
        ERROR_NOT_FOUND: 'Не найдено',
        ERROR_VALIDATION_VALIDATION: 'Ошибка валидации',
        ERROR_VALIDATION_NO_STRING: 'Введите строку',
        ERROR_VALIDATION_NO_INT: 'Введите число',
        ERROR_VALIDATION_NO_EMAIL: 'Введите e-mail',
        ERROR_VALIDATION_NO_ARRAY: 'Выберите элементы',
        ERROR_VALIDATION_NO_DATE: 'Введите дату',
        ERROR_VALIDATION_INT_OUT_OF_BOUNDS: 'Недопустимый размер числа',
        ERROR_VALIDATION_NUMBER_OUT_OF_BOUNDS: 'Недопустимый размер числа',
        ERROR_VALIDATION_STRING_OUT_OF_BOUNDS: 'Недопустимая длина строки',
        ERROR_VALIDATION_DATE_OUT_OF_BOUNDS: 'Введите корректную дату'
    };

    getMessage(code: string): string {
        const message = this.messageMap[code] || code || this.messageMap.ERROR_UNKNOWN;
        return message;
    }
}