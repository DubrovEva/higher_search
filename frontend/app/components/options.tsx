import {Campus, Faculty, Gender, Language} from "~/proto/models/common";


export const gender = [
    { key: '', text: '', value: Gender.OTHER_GENDER },
    { key: 'ж', text: 'Женский', value: Gender.FEMALE },
    { key: 'м', text: 'Мужской', value: Gender.MALE },
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