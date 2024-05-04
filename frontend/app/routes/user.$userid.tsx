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
    CardGroup, Message
} from "semantic-ui-react";
import React, {FormEvent, useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {faculty, gender, year} from "~/components/options";
import {StudorgID, StudorgInfo} from "~/proto/models/studorg";
import {useParams} from "react-router";
import Client from "~/client";
import {User, UserID, UserInfo} from "~/proto/models/user";
import {RegistrationRequest} from "~/proto/api/router";

export const meta: MetaFunction = () => {
    return [
        {title: "Личный кабинет"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function BasicUserInfo(params: { userInfo: UserInfo }) {
    const currentFaculty = faculty.find(f => f.value === params.userInfo.faculty)?.text
    return (
        <Card>
            <Image src={dummy} wrapped ui={false} />
            <CardContent>
                <CardHeader> {params.userInfo.name} {params.userInfo.surname} </CardHeader>
                <CardMeta>
                    <span className='date'> {currentFaculty? currentFaculty + "," : ""} {params.userInfo.educationInfo}</span>
                </CardMeta>
                <CardDescription>
                    {params.userInfo.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>

                    <Icon name='users'/>
                    13 студенческих организаций

            </CardContent>
        </Card>
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
    const [userInfo, setUserInfo] = useState(UserInfo.create())
    const [saved, saveInfo] = useState(false)

    const params = useParams();

    const request = UserID.create();
    request.iD = params.userid?.toString()!

    useEffect(() => {
        Client.getInstance().getUserInfo(request).then(x => setUserInfo(x!))
    }, [])

    function handleUpdate(key: keyof UserInfo) {
        // saveInfo(false)
        return (e: any, data: { value?: boolean | number | string | (boolean | number | string)[] }) => {
            setUserInfo({...userInfo, [key]: data.value})
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        await Client.getInstance().updateUserInfo({iD: request, userInfo: userInfo!});
        saveInfo(true)
        setTimeout(() => saveInfo(false), 2000)
    }

    return (
        <Container text className={"main"}  >
            <Header size={"huge"}> Личная информация </Header>
            <Divider/>
            <Grid stackable columns={2}>
                <GridColumn> <BasicUserInfo userInfo={userInfo!}/> </GridColumn>
                <GridColumn>
                    <Form onSubmit={handleSubmit} success={saved}>
                        <FormGroup widths='equal'>
                            <FormInput fluid label="Имя" placeholder='Имя' value={userInfo?.name} onChange={handleUpdate("name")}/>
                            <FormInput fluid label="Отчество" placeholder='Отчество' value={userInfo?.middleName} onChange={handleUpdate("middleName")}/>
                            <FormInput fluid label="Фамилия" placeholder='Фамилия' value={userInfo?.surname} onChange={handleUpdate("surname")} />
                        </FormGroup>
                        <FormGroup>
                            <FormSelect
                                fluid
                                label="Пол"
                                options={gender}
                                placeholder='Пол'
                                value={userInfo?.gender}
                                onChange={handleUpdate("gender")}
                            />
                            <FormSelect
                                fluid
                                options={faculty}
                                label='Факультет'
                                placeholder='Факультет'
                                width={12}
                                value={userInfo?.faculty}
                                onChange={handleUpdate("faculty")}
                            />
                        </FormGroup>
                        <FormTextArea
                            label='Информация об обучении'
                            placeholder='Курс, учебная программа, группа и прочее'
                            value={userInfo?.educationInfo}
                            onChange={handleUpdate("educationInfo")}
                        />
                        <FormTextArea
                            label='Описание'
                            placeholder='Расскажите о себе'
                            value={userInfo?.description}
                            onChange={handleUpdate("description")}
                        />
                        <Message
                            success
                                header='Сохранено'
                        />
                        <FormButton type="submit"> Сохранить </FormButton>
                    </Form>
                </GridColumn>
            </Grid>
        </Container>
    );
}

export default function UserUserid() {
    return (
        <>
            <FixedMenu/>

            <AllPersonalInfo/>
            <Organizations/>

            <CustomFooter/>
        </>
    );
}
