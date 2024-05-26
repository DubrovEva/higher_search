import {Language} from "~/proto/models/common";
import {FormSelect} from "semantic-ui-react";
import React from "react";

export const language = [
    { text: '', value: Language.OTHER_LANGUAGE},
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

export function LanguageForm(params: {onChange: any, value: Language}) {
    return (
        <FormSelect
            fluid
            label="Язык"
            options={language}
            onChange={params.onChange}
            value={params.value}
            placeholder='Язык'
            width={6}
            search
        />
    )
}