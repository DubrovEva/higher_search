import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";

import {
    Button,
    Container,
    Divider,
    Form,
    FormButton,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextArea,
    Grid,
    GridColumn,
    Header,
    Icon,
    Segment,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenuForAccount} from "~/components/menu";
import {gender} from "~/components/options";
import Client from "~/client";
import {AuthInfo, UserID, UserInfo} from "~/proto/models/user";
import {UserOrgCards} from "~/components/studorg/studorg";
import {Studorg} from "~/proto/models/studorg";
import {UserCard} from "~/components/user";
import {LoadingMessage, NoRightsMessage, SavedMessage} from "~/components/messages";
import {FacultyForm} from "~/components/studorg/faculty";
import {Link} from "~/proto/models/common";
import {LinkForm} from "~/components/studorg/links";

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

function PersonalInfo(params: { userID: UserID, userInfo: UserInfo | undefined, updateUserInfo: any }) {
    const [saved, saveInfo] = useState(false)

    const handleUpdate = (key: keyof UserInfo) => {
        return (e: any, data: { value?: boolean | number | string | (boolean | number | string)[] }) => {
            params.updateUserInfo({...params.userInfo, [key]: data.value})
        }
    }

    const handleSubmit = async () => {
        await Client.getInstance().updateUserInfo({userInfo: params.userInfo, iD: params.userID});
        saveInfo(true)
    }

    return (
        <Container text className={"main"}>
            <Header size={"huge"}> Личная информация </Header>
            <Divider/>
            <Grid stackable columns={2}>
                <GridColumn> <UserCard user={{userInfo: params.userInfo, iD: params.userID}}/> </GridColumn>
                <GridColumn>
                    {params.userInfo && <Form onSubmit={handleSubmit} success={saved}>
                        <FormGroup widths='equal'>
                            <FormInput fluid label="Фамилия" placeholder='Фамилия' value={params.userInfo.surname}
                                       onChange={handleUpdate("surname")}/>
                            <FormInput fluid label="Имя" placeholder='Имя' value={params.userInfo.name}
                                       onChange={handleUpdate("name")}/>
                            <FormInput fluid label="Отчество" placeholder='Отчество' value={params.userInfo.middleName}
                                       onChange={handleUpdate("middleName")}/>
                        </FormGroup>
                        <FormGroup>
                            <FormSelect
                                fluid
                                label="Пол"
                                options={gender}
                                placeholder='Пол'
                                value={params.userInfo.gender}
                                onChange={handleUpdate("gender")}
                            />

                            <FacultyForm value={params.userInfo.faculty} onChange={handleUpdate("faculty")}/>
                        </FormGroup>
                        <FormTextArea
                            label='Информация об обучении'
                            placeholder='Курс, учебная программа, группа и прочее'
                            value={params.userInfo.educationInfo}
                            onChange={handleUpdate("educationInfo")}
                        />
                        <FormTextArea
                            label='Описание'
                            placeholder='Расскажите о себе'
                            value={params.userInfo.description}
                            onChange={handleUpdate("description")}
                        />

                        <SavedMessage/>
                        <FormButton type="submit"> Сохранить </FormButton>
                    </Form>
                    }
                </GridColumn>
            </Grid>
        </Container>
    );
}

function ContactInfo(params: { userID: UserID, userInfo: UserInfo, updateUserInfo: any }) {
    const [saved, saveInfo] = useState(false)
    const [links, setLinks] = useState<Link[] | undefined>(undefined)

    if (links === undefined && params.userInfo.links.length !== 0) {
        setLinks(params.userInfo.links)
    }

    const addLink = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setLinks(links!.concat({id: crypto.randomUUID()} as Link))
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        params.userInfo.links = links!
        params.updateUserInfo(params.userInfo)

        await Client.getInstance().updateUserInfo({userInfo: params.userInfo, iD: params.userID});
        saveInfo(true)
        setTimeout(() => saveInfo(false), 2000)
    }

    return (
        <Container text className={"main"}>
            <Divider horizontal><Header as='h2'><Icon name='headphones'/>Контактная информация</Header></Divider>

            <Form success={saved}>
                <Segment>
                    <Header as={"h5"}> Контакты для связи </Header>

                    {links && links.map((link) => <LinkForm id={link.id} links={links} setLinks={setLinks}/>)}

                    <Button onClick={addLink} icon={"plus"}> Добавить </Button>
                    <Button onClick={handleSubmit}> Сохранить </Button>
                    <SavedMessage/>
                </Segment>
            </Form>

        </Container>
    )
}

function PageContent(params: { userID: UserID }) {
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().getUserInfo(params.userID).then(response => {
            setUserInfo(response)
        })
    }, [])

    return (
        <>
            <PersonalInfo userInfo={userInfo} userID={params.userID} updateUserInfo={setUserInfo}/>
            {userInfo && <ContactInfo userInfo={userInfo} userID={params.userID} updateUserInfo={setUserInfo}/>}
            <Organizations/>
        </>
    )
}

export default function ViewUser() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])
    console.log(authInfo)

    if (authInfo === undefined) {
        return <></>
    }

    if (!authInfo.isAuth || authInfo.userID === undefined) {
        return <></>
    }

    return (
        <>
            <FixedMenuForAccount authInfo={authInfo}/>

            <PageContent userID={authInfo.userID}/>

            <CustomFooter/>
        </>
    );
}
