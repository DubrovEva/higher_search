import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";
import dummy from "../assets/dummy.png?url";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardMeta,
    Container,
    Divider,
    FormButton,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextArea,
    Grid,
    GridColumn,
    Header,
    Icon,
    Image,
    Form,
    Label,
    CardGroup
} from "semantic-ui-react";
import React from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";

export const meta: MetaFunction = () => {
    return [
        {title: "Личный кабинет"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function BasicUserInfo() {
    return (
        <Card>
            <Image src={dummy} wrapped ui={false} />
            <CardContent>
                <CardHeader> Дмитрий Разводов </CardHeader>
                <CardMeta>
                    <span className='date'>Факультет компьютерных наук, 4 курс</span>
                </CardMeta>
                <CardDescription>
                    В детстве меня уронили в куст с розами.
                </CardDescription>
            </CardContent>
            <CardContent extra>

                    <Icon name='users'/>
                    13 студенческих организаций

            </CardContent>
        </Card>
    );
}

const genderOptions = [
    { key: 'м', text: 'Мужской', value: 'мужской' },
    { key: 'ж', text: 'Женский', value: 'женский' },
]

const yearOptions = [
    { key: 'b1', text: 'Бакалавриат, 1 курс', value: 'b1' },
    { key: 'b2', text: 'Бакалавриат, 2 курс', value: 'b2' },
    { key: 'b3', text: 'Бакалавриат, 3 курс', value: 'b3' },
    { key: 'b4', text: 'Бакалавриат, 4 курс', value: 'b4' },
    { key: 'b5', text: 'Бакалавриат, 5 курс', value: 'b5' },
    { key: 'm1', text: 'Магистратура, 1 курс', value: 'm1' },
    { key: 'm2', text: 'Магистратура, 2 курс', value: 'm2' },
    { key: 'phd', text: 'Аспирантура', value: 'phd' },
    { key: 'other', text: 'Другое', value: 'other' },
]

const facultyOptions = [
    { key: 'math', text: 'Факультет математики', value: 'math'},
    { key: 'economics', text: 'Факультет экономических наук', value: 'economics'},
    { key: 'cs', text: 'Факультет компьютерных наук', value: 'cs'},
    { key: 'miem', text: 'Московский институт электроники и математики им. А.Н. Тихонова', value: 'miem'},
    { key: 'pravo', text: 'Высшая школа бизнеса', value: 'pravo'},
    { key: 'gsb', text: 'Факультет права', value: 'gsb'},
    { key: 'hum', text: 'Факультет гуманитарных наук', value: 'hum'},
    { key: 'law', text: 'Высшая школа юриспруденции и администрирования', value: 'law'},
    { key: 'social', text: 'Факультет социальных наук', value: 'social'},
    { key: 'cmd', text: 'Факультет креативных индустрий', value: 'cmd'},
    { key: 'physics', text: 'Факультет физики', value: 'physics'},
    { key: 'we', text: 'Факультет мировой экономики и мировой политики', value: 'we'},
    { key: 'icef', text: 'Международный институт экономики и финансов', value: 'icef'},
    { key: 'gorod', text: 'Факультет городского и регионального развития', value: 'gorod'},
    { key: 'chemistry', text: 'Факультет химии', value: 'chemistry'},
    { key: 'biology', text: 'Факультет биологии и биотехнологии', value: 'biology'},
    { key: 'geography', text: 'Факультет географии и геоинформационных технологий', value: 'geography'},
    { key: 'lang', text: 'Школа иностранных языков', value: 'lang'},
    { key: 'issek', text: 'Институт статистических исследований и экономики знаний', value: 'issek'},
    { key: 'binst', text: 'Банковский институт', value: 'binst'},
    { key: 'inman', text: 'Школа инноватики и предпринимательства', value: 'inman'},
    { key: 'other', text: 'Другое', value: 'other'},
]

function UserInfoForm() {
    return (
        <Form>
            <FormGroup widths='equal'>
                <FormInput fluid placeholder='First name' />
                <FormInput fluid placeholder='Last name' />
                <FormSelect
                    fluid
                    options={genderOptions}
                    placeholder='Пол'
                />
            </FormGroup>
            <FormGroup>
                <FormSelect
                    fluid
                    options={facultyOptions}
                    placeholder='Факультет'
                    width={12}
                />
                <FormSelect
                    fluid
                    options={yearOptions}
                    placeholder='Курс'
                />
            </FormGroup>
            <FormTextArea label='Описание' placeholder='Расскажите о себе' />
            <FormGroup  widths='equal'>
                <FormInput fluid placeholder='Email' />
                <FormInput fluid placeholder='Phone' />
            </FormGroup>
            <FormGroup  widths='equal'>
                <FormInput fluid placeholder='Telgram' />
                <FormInput fluid placeholder='VK' />
            </FormGroup>
            <FormInput fluid label='Photo' type={"file"}/>
            <FormButton>Submit</FormButton>
        </Form>
    );
}

function Organizations() {
    return (
        <Container text className={"main"}>
            <Divider horizontal><Header as='h2'><Icon name='users'/>Организации</Header></Divider>

            <CardGroup stackable itemsPerRow={1}>
                <Card>
                    <CardContent>
                        <Image
                            floated='left'
                            size='tiny'
                            src={dummy}
                        />
                        <CardHeader href={"#"}> Ролевой клуб</CardHeader>
                        <CardMeta> С 24 апреля 2024     </CardMeta>
                        <CardContent extra> <Label> Участник </Label></CardContent>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Image
                            floated='left'
                            size='tiny'
                            src={dummy}
                        />
                        <CardHeader href={"#"}> Шахматный клуб </CardHeader>
                        <CardMeta> С 16 мая 2024     </CardMeta>
                        <CardContent extra> <Label color={"blue"}> Организатор </Label></CardContent>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Image
                            floated='left'
                            size='tiny'
                            src={dummy}
                        />
                        <CardHeader href={"#"}> Клуб веселых и находчивых </CardHeader>
                        <CardMeta> С 1 апреля 2024     </CardMeta>
                        <CardContent extra> <Label color={"green"}> Глава </Label></CardContent>
                    </CardContent>
                </Card>
            </CardGroup>

        </Container>
    );
}

function AllPersonalInfo() {
    return (
        <Container text className={"main"}  >
            <Header size={"huge"}> Личная информация </Header>
            <Divider/>
            <Grid stackable columns={2}>
                <GridColumn> <BasicUserInfo/> </GridColumn>
                <GridColumn> <UserInfoForm/> </GridColumn>
            </Grid>
        </Container>
    );
}

export default function Account() {
    return (
        <>
            <FixedMenu/>

            <AllPersonalInfo/>
            <Organizations/>

            <CustomFooter/>
        </>
    );
}
