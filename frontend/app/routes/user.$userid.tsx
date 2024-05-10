import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";

import {
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
    CardGroup, Message, FormDropdown
} from "semantic-ui-react";
import React, {FormEvent, useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenuForAccount} from "~/components/menu";
import {category, faculty, gender} from "~/components/options";
import {useParams} from "react-router";
import Client from "~/client";
import {AuthInfo, UserID, UserInfo} from "~/proto/models/user";
import {UserOrgCards} from "~/components/studorg";
import {Studorg} from "~/proto/models/studorg";
import {UserCard} from "~/components/user";

export const meta: MetaFunction = () => {
    return [
        {title: "Личный кабинет"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function Organizations() {
    const [studorgs, setStudorgs] = useState([] as Studorg[])
    useEffect(() => {
        Client.getInstance().getUserStudorgs().then(result => setStudorgs(result))
    }, [])

    return (
        <Container text className={"main"}>
            <Divider horizontal><Header as='h2'><Icon name='users'/>Организации</Header></Divider>

            <UserOrgCards studorgs={studorgs}/>

        </Container>
    );
}

function AllPersonalInfo()
{
    const [userInfo, setUserInfo] = useState(UserInfo.create())
    const [saved, saveInfo] = useState(false)

    const params = useParams();

    const request = UserID.create();
    request.iD = params.userid?.toString()!

    useEffect(() => {
        Client.getInstance().getUserInfo(request).then(x => setUserInfo(x!))
    }, [])

    function handleUpdate(key: keyof UserInfo) {
        return (e: any, data: { value?: boolean | number | string | (boolean | number | string)[] }) => {
            setUserInfo({...userInfo, [key]: data.value})
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        await Client.getInstance().updateUserInfo({userInfo: userInfo, iD: request});
        saveInfo(true)
        setTimeout(() => saveInfo(false), 2000)
    }

    return (
        <Container text className={"main"}  >
            <Header size={"huge"}> Личная информация </Header>
            <Divider/>
            <Grid stackable columns={2}>
                <GridColumn> <UserCard user={{userInfo: userInfo, iD: request}}/> </GridColumn>
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

export default function ViewUser() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <FixedMenuForAccount authInfo={authInfo}/>

            <AllPersonalInfo/>
            <Organizations/>

            <CustomFooter/>
        </>
    );
}
