import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";
import Client from "~/client";

import {
    CardGroup,
    Container,
    Form,
    FormButton,
    FormDropdown,
    FormGroup,
    FormInput,
    FormTextArea,
    Header,
    Menu,
    MenuItem,
    Segment,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {category} from "~/components/options";
import {StudorgID, StudorgInfo, StudorgRole} from "~/proto/models/studorg";
import {Link} from "~/proto/models/common";
import {AuthInfo} from "~/proto/models/user";
import {useParams} from "react-router";
import {LoadingMessage, NoRightsMessage, SavedMessage} from "~/components/messages";
import {LinksForm} from "~/components/studorg/links";
import {FacultyForm} from "~/components/studorg/faculty";
import {LanguageForm} from "~/components/studorg/language";
import {CampusForm} from "~/components/studorg/campus";
import {Participant} from "~/proto/models/participant";
import {ParticipantCard} from "~/components/studorg/participant";

export const meta: MetaFunction = () => {
    return [
        {title: "Личный кабинет"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

type Filter<T, F> = {
    [K in keyof T as T[K] extends F ? K : never]: T[K] & F
};

function StudorgInfoForm(params: { studorgID: StudorgID }) {
    const [studorgInfo, setStudorgInfo] = useState<StudorgInfo | undefined>(
        undefined
    )
    const [saved, saveInfo] = useState(false)

    const [links, setLinks] = useState<Link[] | undefined>(undefined)

    useEffect(() => {
            Client.getInstance().getStudorgInfo(params.studorgID).then(x => x ? setStudorgInfo(x) : undefined)
    }, [])

    if (studorgInfo === undefined) {
        return <LoadingMessage/>
    }

    if (links === undefined && studorgInfo.links) {
        setLinks(studorgInfo.links)
    }

    const updateInfo = async () => {
        studorgInfo.links = links!

        await Client.getInstance().updateStudorg({studorgInfo: studorgInfo, iD: params.studorgID})
        saveInfo(true)
        setTimeout(() => saveInfo(false), 2000)
        // TODO: обработка ошибок??
    }

    function handleUpdate(key: keyof StudorgInfo) {
        return (e: any, data: { value?: boolean | number | string | (boolean | number | string)[] }) => {
            setStudorgInfo({...studorgInfo!, [key]: data.value})
        }
    }

    function editable(key: keyof Filter<StudorgInfo, number | string>) {
        const value: string | number = (studorgInfo as Filter<StudorgInfo, number | string>)[key];
        return {
            value,
            onChange: handleUpdate(key)
        }
    }

    return (
        <Form onSubmit={updateInfo} success={saved}>
            <FormInput fluid label="Название" placeholder='Название' required {...editable('name')}/>
            <FormGroup widths='equal'>
                <CampusForm value={studorgInfo.campus} onChange={handleUpdate("campus")}/>

                <FacultyForm value={studorgInfo.faculty} onChange={handleUpdate("faculty")}/>

                <LanguageForm value={studorgInfo.language} onChange={handleUpdate("language")}/>

            </FormGroup>
            <FormTextArea label='Краткое описание'
                          placeholder='Опиши организацию в 2-3 предложениях. Это короткое превью, которое будет отображаться в поиске.'
                          {...editable('shortDescription')}
            />
            <FormTextArea label='Описание'
                          placeholder='Полное описание организации, будет отображено на отдельной странице.'
                          {...editable('description')}/>

            <LinksForm links={links!} setLinks={setLinks}/>

            <FormDropdown label={"Категории"} placeholder='Категории' fluid multiple selection options={category}
                          value={studorgInfo.tags}
                          onChange={handleUpdate("tags")}
            />

            {/*<FormInput fluid label='Photo' type={"file"}/>*/}
            <SavedMessage/>

            <FormButton onSubmit={updateInfo}>Сохранить</FormButton>
        </Form>
    );
}

function Participants(params: { studorgID: StudorgID }) {
    const [users, setUsers] = useState<Participant[] | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().getParticipants(params.studorgID).then(response => {
            if (response !== undefined) {
                setUsers(response.participants)
            }
        })
    }, [])

    if (users === undefined) {
        return <></>
    }

    return (
        <CardGroup itemsPerRow={2}>
            {users.map(participant =>
                <ParticipantCard participant={participant}/>
            )}
        </CardGroup>
    )
}

function Organizers(params: { studorgID: StudorgID }) {
    const [users, setUsers] = useState<Participant[] | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().getOrganizers(params.studorgID).then(response => {
            if (response !== undefined) {
                setUsers(response.participants)
            }
        })
    }, [])

    if (users === undefined) {
        return <></>
    }

    return (
        <CardGroup itemsPerRow={2}>
            {users.map(participant =>
                <ParticipantCard participant={participant}/>
            )}
        </CardGroup>
    )
}


function AllInfo(params: { studorgID: StudorgID }) {
    const [state, setState] = useState("info")

    const [isOrg, setIsOrg] = useState<boolean | undefined>(undefined)
    useEffect(() => {
        Client.getInstance().getStudorgRole(params.studorgID).then(role => setIsOrg(role == StudorgRole.ORGANIZER || role == StudorgRole.HEAD))
    }, [])

    const [active, setActive] = useState(false)

    if (isOrg === undefined) {
        return <LoadingMessage/>
    }
    if (!isOrg) {
        return <NoRightsMessage/>
    }


    const selectInfo = () => {
        setState("info")
    }

    const selectParticipants = () => {
        setState("participants")
    }

    const selectOrganizers = () => {
        setState("organizers")
    }

    const handleClick = async () => {
        setActive(!active)
    }

    return (
        <>
            <Header size={"huge"}> Редактирование студенческой организации </Header>

            <Menu attached='top' tabular>
                <MenuItem
                    name='Информация'
                    active={state === "info"}
                    onClick={selectInfo}
                />
                <MenuItem
                    name="Участники"
                    active={state === "participants"}
                    onClick={selectParticipants}
                />
                <MenuItem
                    name="Организаторы"
                    active={state === "organizers"}
                    onClick={selectOrganizers}
                />
            </Menu>

            <Segment attached='bottom'>

                {state === "info" ? <StudorgInfoForm studorgID={params.studorgID}/> :
                    state === "participants" ?
                        <Participants studorgID={params.studorgID}/> :
                        <Organizers studorgID={params.studorgID}/>
                }

            </Segment>
        </>
    );
}

export default function EditStudorg() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    const params = useParams();
    const studorgID = StudorgID.create();
    if (params.studorgid === undefined) {
        // todo: redirect to 404
        return <LoadingMessage/>
    }
    studorgID.iD = params.studorgid.toString()


    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <Container text className={"main"}>
                <AllInfo studorgID={studorgID}/>
            </Container>

            <CustomFooter/>
        </>
    );
}

