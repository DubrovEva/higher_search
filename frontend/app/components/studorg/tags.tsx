import {FormDropdown, Label, LabelGroup} from "semantic-ui-react";
import React from "react";

export const category = [
    {text: 'Спорт', value: 'SPORT'},
    {text: 'Волонтерство', value: 'VOLUNTEERING'},
    {text: 'Активизм', value: 'ACTIVISM'},
    {text: 'Животные', value: 'ANIMALS'},
    {text: 'Фандомы', value: 'FANDOMS'},
    {text: 'Компьютерные игры', value: 'GAMES'},
    {text: 'Аниме', value: 'ANIME'},
    {text: 'Разное', value: '' + 'OTHER'},
    {text: 'Книги', value: '' + 'BOOKS'},
    {text: 'Кулинария', value: '' + 'COOKING'},
    {text: 'Боевые искусства', value: '' + 'COMBAT'},
    {text: 'Психология', value: '' + 'PSYCHOLOGY'},
    {text: 'Программирование', value: '' + 'PROGRAMMING'},
    {text: 'Биология', value: '' + 'BIOLOGY'},
    {text: 'Математика', value: '' + 'MATH'},
    {text: 'Просвещение', value: '' + 'EDUCATION'},
    {text: 'Музыка', value: 'MUSIC'},
    {text: 'Кино', value: 'MOVIE'},
    {text: 'Танцы', value: 'DANCE'},
    {text: 'Театр', value: 'THEATRE'},
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
        search
        fluid multiple selection
        options={category}
        label={"Категории"}
        placeholder='Категории'
        value={params.value}
        onChange={params.onChange}
    />
}

export function TagsView(params: { tags: string[] }) {
    return<LabelGroup size={"big"}>
        {params.tags.map((tag) => <TagToLable tag={tag}/>)}
    </LabelGroup>
}

function TagToLable(params: { tag: string }) {
    const tagName = category.find(elem => elem.value == params.tag)?.text
    return (
        <Label content={tagName}/>
    )
}

function PastelColor() {
    const colors = ["#f4eded"]
    return colors[Math.floor(Math.random() * colors.length)];
}