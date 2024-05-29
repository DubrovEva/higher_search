import {Faculty} from "~/proto/models/common";
import {FormSelect} from "semantic-ui-react";
import React from "react";

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

export function FacultyForm(params: {onChange: any, value: Faculty}) {
    return (
        <FormSelect
            fluid
            label="Факультет"
            width={11}
            options={faculty}
            onChange={params.onChange}
            value={params.value}
            placeholder='Факультет'
            search
        />
    )
}