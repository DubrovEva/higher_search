import {Campus, Faculty, Gender, Language} from "~/proto/models/common";


// TODO: сделать proto.Enum
// TODO: добавить значение в бд в табличку user
export const gender = [
    { key: 'ж', text: 'Женский', value: Gender.FEMALE },
    { key: 'м', text: 'Мужской', value: Gender.MALE },
]

// TODO: сделать proto.Enum
// TODO: добавить значение в бд в табличку user
export const year = [
    { text: 'Бакалавриат, 1 курс', value: 'b1' },
    { text: 'Бакалавриат, 2 курс', value: 'b2' },
    { text: 'Бакалавриат, 3 курс', value: 'b3' },
    { text: 'Бакалавриат, 4 курс', value: 'b4' },
    { text: 'Бакалавриат, 5 курс', value: 'b5' },
    { text: 'Магистратура, 1 курс', value: 'm1' },
    { text: 'Магистратура, 2 курс', value: 'm2' },
    { text: 'Аспирантура', value: 'phd' },
    { text: 'Другое', value: 'other' },
]

export const campus = [
    { text: 'Москва', value: Campus.MSK },
    { text: 'Санкт-Петербург', value: Campus.SPB },
    { text: 'Нижний-Новгород', value: Campus.NOV },
    { text: 'Пермь', value: Campus.PER },
    { text: 'Другое', value: Campus.OTHER_CAMPUS },
]

export const language = [
    { text: 'Русский', value: Language.RU },
    { text: 'Английский', value: Language.EN },
    { text: 'Арабский', value: Language.AR },
    { text: 'Немецкий', value: Language.DE },
    { text: 'Французский', value: Language.FR },
    { text: 'Итальянский', value: Language.IT },
    { text: 'Японский', value: Language.JA },
    { text: 'Корейский', value: Language.KO },
    { text: 'Хинди', value: Language.HI },
    { text: 'Китайский', value: Language.ZH },
    { text: 'Испанский', value: Language.ES },
]

export const category = [
    { text: 'Спорт', value: 'SPORT' },
    { text: 'Музыка', value: 'MUSIC' },
    { text: 'Кино', value: 'MOVIE' },
    { text: 'Танцы', value: 'DANCE' },
    { text: 'Медиа', value: 'MEDIA' },
    { text: 'Наука', value: 'SCIENCE' },
    { text: 'Иностранные языки', value: 'LANGUAGE' },
    { text: 'Настольные игры', value: 'BOARD_GAME' },
    { text: 'Мероприятия', value: 'EVENT' },
    { text: 'Туризм и путешествия', value: 'TOURISM' },
    { text: 'Юмор', value: 'HUMOR' },
    { text: 'Творчество', value: 'ART'},
    { text: 'Общение и нетворкинг', value: 'COMMUNICATION'},
]

export const faculty = [
    { text: '', value: Faculty.OTHER_FACULTY},
    { text: 'Факультет математики', value: Faculty.MATH},
    { text: 'Факультет экономических наук', value: Faculty.ECONOMICS},
    { text: 'Факультет компьютерных наук', value: Faculty.CS},
    { text: 'Московский институт электроники и математики им. А.Н. Тихонова', value: Faculty.MIEM},
    { text: 'Высшая школа бизнеса', value: Faculty.PRAVO},
    { text: 'Факультет права', value: Faculty.GSB},
    { text: 'Факультет гуманитарных наук', value: Faculty.HUM},
    { text: 'Высшая школа юриспруденции и администрирования', value: Faculty.LAW},
    { text: 'Факультет социальных наук', value: Faculty.SOCIAL},
    { text: 'Факультет креативных индустрий', value: Faculty.CMD},
    { text: 'Факультет физики', value: Faculty.PHYSICS},
    { text: 'Факультет мировой экономики и мировой политики', value: Faculty.WE},
    { text: 'Международный институт экономики и финансов', value: Faculty.ICEF},
    { text: 'Факультет городского и регионального развития', value: Faculty.GOROD},
    { text: 'Факультет химии', value: Faculty.CHEMISTRY},
    { text: 'Факультет биологии и биотехнологии', value: Faculty.BIOLOGY},
    { text: 'Факультет географии и геоинформационных технологий', value: Faculty.GEOGRAPHY},
    { text: 'Школа иностранных языков', value: Faculty.LANG},
    { text: 'Институт статистических исследований и экономики знаний', value: Faculty.ISSEK},
    { text: 'Банковский институт', value: Faculty.BINST},
    { text: 'Школа инноватики и предпринимательства', value: Faculty.INMAN},
]