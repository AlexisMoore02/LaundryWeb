export const ERROR_CODES = {
  MISSING_ARGUMENT: 422,
  REQUEST_SUCCESSFUL: 600,
  USER_NOT_EXIST_ADMIN: 601,
  INVALID_LOGIN_OR_PASSWORD_ADMIN: 602,
  MISSING_DATA_RECORDS: 604,
  INVALID_ROOM: 605,
  INVALID_DATE_OR_TIME: 607,
  UNAUTHENTICATED_NO_ACCESS_TOKEN: 610,
  INVALID_TOKEN: 611,
  NETWORK_OR_INTERNAL_SERVER_ERROR: 613,
};

export const ERROR_MESSAGES = {
  [ERROR_CODES.MISSING_ARGUMENT]: "Пропущен аргумент при запросе",
  [ERROR_CODES.REQUEST_SUCCESSFUL]: "Запрос успешно выполнен",
  [ERROR_CODES.USER_NOT_EXIST_ADMIN]: "Пользователя не существует (админ)",
  [ERROR_CODES.INVALID_LOGIN_OR_PASSWORD_ADMIN]: "Не верный логин или пароль (админ)",
  [ERROR_CODES.MISSING_DATA_RECORDS]: "Не найденные данные (записи)",
  [ERROR_CODES.INVALID_ROOM]: "Не верно указана комната",
  [ERROR_CODES.INVALID_DATE_OR_TIME]: "Не верно указана дата или время",
  [ERROR_CODES.UNAUTHENTICATED_NO_ACCESS_TOKEN]: "Не аунтифиицирован (нет токен доступа)",
  [ERROR_CODES.INVALID_TOKEN]: "Не верный токен",
  [ERROR_CODES.NETWORK_OR_INTERNAL_SERVER_ERROR]: "Упс! Произошла внутренняя ошибка, обратитесь к администратору сайта",
};