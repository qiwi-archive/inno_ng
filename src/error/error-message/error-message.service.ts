import {Injectable} from "@angular/core";
// TODO: temp code. replace with i18n
@Injectable()
export class ErrorMessageService {
    messageMap: any = {
        ERROR_LDAP_LOGIN_FAILED: 'Попытка входа не удалась. Проверьте данные для входа.',
        ERROR_CONNECT: 'Ошибка при попытке соединения с сервером.',
        ERROR_UNKNOWN: 'Неизвестная ошибка',
        ERROR_NOT_FOUND: 'Не найдено',
        ERROR_REQUEST_NOT_FOUND: 'Заявка не найдена',
        ERROR_REQUEST_INVALID_STATUS: 'Статус текущей заявки не позволяет осуществить операцию',
        ERROR_INVALID_REQUEST_FLOW: 'Текущее состояние заявки не позволяет совершить данное действие',
        ERROR_INVALID_RESOLUTION_TYPE: 'При отправке запроса на изменение статуса заявки произошла ошибка'
    };

    getMessage(code: string): string {
        const message = this.messageMap[code];

        if (!message) {
            return this.messageMap.ERROR_UNKNOWN;
        }

        return message;
    }
}