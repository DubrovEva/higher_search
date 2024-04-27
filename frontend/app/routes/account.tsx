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
import {faculty, gender, year} from "~/components/options";

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

function UserInfoForm() {
    return (
        <Form>
            <FormGroup widths='equal'>
                <FormInput fluid placeholder='First name' />
                <FormInput fluid placeholder='Last name' />
                <FormSelect
                    fluid
                    options={gender}
                    placeholder='Пол'
                />
            </FormGroup>
            <FormGroup>
                <FormSelect
                    fluid
                    options={faculty}
                    placeholder='Факультет'
                    width={12}
                />
                <FormSelect
                    fluid
                    options={year}
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
