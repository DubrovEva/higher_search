import {Campus, Language} from "~/proto/models/common";
import {FormSelect} from "semantic-ui-react";
import React from "react";
import {language} from "~/components/studorg/language";

export const campus = [
    { text: '', value: Campus.OTHER_CAMPUS },
    { text: 'Москва', value: Campus.MSK },
    { text: 'Санкт-Петербург', value: Campus.SPB },
    { text: 'Нижний-Новгород', value: Campus.NOV },
    { text: 'Пермь', value: Campus.PER },
    { text: 'Онлайн', value: Campus.ONLINE },
]

export function CampusForm(params: {onChange: any, value: Campus}) {
    return (
        <FormSelect
            fluid
            label="Кампус"
            options={campus}
            onChange={params.onChange}
            value={params.value}
            placeholder='Кампус'
            width={8}
        />
    )
}