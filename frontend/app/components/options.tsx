import {Gender,} from "~/proto/models/common";

export const gender = [
    { key: '', text: '', value: Gender.OTHER_GENDER },
    { key: 'ж', text: 'Женский', value: Gender.FEMALE },
    { key: 'м', text: 'Мужской', value: Gender.MALE },
]

export const colors = [
    { key: 'main_blue', field: {style: {backgroundColor: '#0F2D69'}} }
]

export function setColor(key: string) {
    return colors.find(elem => elem.key == key)
}