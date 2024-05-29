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
    Placeholder,
    PlaceholderLine,
    PlaceholderParagraph,
    Segment,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {ModerationStatus, StudorgID, StudorgInfo, StudorgRole} from "~/proto/models/studorg";
import {Link} from "~/proto/models/common";
import {AuthInfo} from "~/proto/models/user";
import {useParams} from "react-router";
import {LoadingMessage, NoRightsMessage, SavedMessage} from "~/components/messages";
import {LinksForm} from "~/components/studorg/links";
import {FacultyForm} from "~/components/studorg/faculty";
import {LanguageForm} from "~/components/studorg/language";
import {CampusForm} from "~/components/studorg/campus";
import {Participant} from "~/proto/models/participant";
import {ParticipantCard, ParticipantPlaceholder} from "~/components/studorg/participant";
import {OrgHiddenMessageFullInfo} from "~/components/moderation";
import {TagsForm} from "~/components/studorg/tags";

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

function ModerationStatusView(params: { studorgInfo: StudorgInfo }) {
    if (params.studorgInfo.moderationStatus === ModerationStatus.HIDDEN) {
        return <OrgHiddenMessageFullInfo studorgInfo={params.studorgInfo}/>
    }
}

function StudorgInfoForm(params: { studorgID: StudorgID, studorgInfo: StudorgInfo, setStudorgInfo: any }) {
    const [saved, saveInfo] = useState(false)
    const [links, setLinks] = useState<Link[] | undefined>(undefined)

    if (links === undefined && params.studorgInfo) {
        setLinks(params.studorgInfo.links)
    } else if (links === undefined) {
        return <></>
    }

    const updateInfo = async () => {
        params.studorgInfo.links = links!

        await Client.getInstance().updateStudorg({studorgInfo: params.studorgInfo, iD: params.studorgID})
        saveInfo(true)
        setTimeout(() => saveInfo(false), 2000)
        // TODO: обработка ошибок??
    }

    function handleUpdate(key: keyof StudorgInfo) {
        return (e: any, data: { value?: boolean | number | string | (boolean | number | string)[] }) => {
            params.setStudorgInfo({...params.studorgInfo, [key]: data.value})
        }
    }

    function editable(key: keyof Filter<StudorgInfo, number | string>) {
        const value: string | number = (params.studorgInfo as Filter<StudorgInfo, number | string>)[key];
        return {
            value,
            onChange: handleUpdate(key)
        }
    }

    return (
        <Form onSubmit={updateInfo} success={saved}>
            <FormInput fluid label="Название" placeholder='Название' required {...editable('name')}/>
            <FormGroup widths='equal'>
                <CampusForm value={params.studorgInfo.campus} onChange={handleUpdate("campus")}/>

                <FacultyForm value={params.studorgInfo.faculty} onChange={handleUpdate("faculty")}/>

                <LanguageForm value={params.studorgInfo.language} onChange={handleUpdate("language")}/>

            </FormGroup>
            <FormTextArea label='Краткое описание'
                          placeholder='Опиши организацию в 2-3 предложениях. Это короткое превью, которое будет отображаться в поиске.'
                          {...editable('shortDescription')}
            />
            <FormTextArea label='Описание'
                          placeholder='Полное описание организации, будет отображено на отдельной странице.'
                          {...editable('description')}/>

            <LinksForm links={links} setLinks={setLinks}/>

            <TagsForm onChange={handleUpdate("tags")} value={params.studorgInfo.tags}/>

            {/*<FormInput fluid label='Photo' type={"file"}/>*/}
            <SavedMessage/>

            <FormButton onSubmit={updateInfo}>Сохранить</FormButton>
        </Form>
    );
}

function Participants(params: { studorgID: StudorgID, onlyOrganizers: boolean }) {
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState<Participant[] | undefined>(undefined)

    useEffect(() => {
        setUsers(undefined)
        setLoaded(false)
        setTimeout(() => setLoaded(true), 200)

        Client.getInstance().getParticipants(params.studorgID, params.onlyOrganizers).then(response => {
            if (response !== undefined) {
                setUsers(response.participants)
            }
        })
    }, [params.onlyOrganizers])


    if (users === undefined || !loaded) {
        return <ParticipantPlaceholder/>
    }

    return (
        <CardGroup itemsPerRow={2}>
            {users.map(participant =>
                <ParticipantCard key={participant.id} participant={participant}/>
            )}
        </CardGroup>
    )
}

function AllInfo(params: { studorgID: StudorgID }) {
    const [state, setState] = useState("info")
    const [isOrg, setIsOrg] = useState<boolean | undefined>(undefined)
    const [tabActive, setTabActive] = useState(false)
    const [studorgInfo, setStudorgInfo] = useState<StudorgInfo | undefined>(
        undefined
    )
    useEffect(() => {
        Client.getInstance().getStudorgRole(params.studorgID).then(role => setIsOrg(role == StudorgRole.ORGANIZER || role == StudorgRole.HEAD))
    }, [])

    useEffect(() => {
        Client.getInstance().getStudorgInfo(params.studorgID).then(x => x ? setStudorgInfo(x) : undefined)
    }, [])


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

    return (
        <>
            <Header size={"huge"}> Редактирование студенческой организации </Header>

            { studorgInfo && <ModerationStatusView studorgInfo={studorgInfo}/>}

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
                {state === "info" ?
                    <StudorgInfoForm studorgID={params.studorgID}
                                     studorgInfo={studorgInfo!}
                                     setStudorgInfo={setStudorgInfo}
                    /> :
                    <Participants studorgID={params.studorgID} onlyOrganizers={state == "organizers"}/>
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

