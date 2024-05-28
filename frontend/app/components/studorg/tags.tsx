import {FormDropdown, Label, Segment} from "semantic-ui-react";
import React from "react";

export const category = [
    {text: 'Спорт', value: 'SPORT'},
    {text: 'Музыка', value: 'MUSIC'},
    {text: 'Кино', value: 'MOVIE'},
    {text: 'Танцы', value: 'DANCE'},
    {text: 'Медиа', value: 'MEDIA'},
    {text: 'Наука', value: 'SCIENCE'},
    {text: 'Иностранные языки', value: 'LANGUAGE'},
    {text: 'Настольные игры', value: 'BOARD_GAME'},
    {text: 'Мероприятия', value: 'EVENT'},
    {text: 'Туризм и путешествия', value: 'TOURISM'},
    {text: 'Юмор', value: 'HUMOR'},
    {text: 'Творчество', value: 'ART'},
    {text: 'Общение и нетворкинг', value: 'COMMUNICATION'},
]

export function TagsForm(params: { onChange: any, value: any }) {
    return <FormDropdown
        fluid multiple selection
        options={category}
        label={"Категории"}
        placeholder='Категории'
        value={params.value}
        onChange={params.onChange}
    />
}

export function TagsView(params: { tags: string[] }) {
    return <Segment basic>
        {params.tags.map((tag) => <Label content={tag}/>)}
    </Segment>
}