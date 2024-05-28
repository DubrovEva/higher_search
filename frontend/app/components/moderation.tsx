import {
    Button,
    Card, CardContent, CardDescription, CardHeader, CardMeta,
    Dimmer,
    Form,
    FormButton,
    FormTextArea,
    Grid,
    GridColumn,
    GridRow, Header, Message, MessageContent, MessageHeader,
    Segment
} from "semantic-ui-react";
import {ModerationStatus, Studorg, StudorgInfo} from "~/proto/models/studorg";
import React, {useState} from "react";
import Client from "~/client";
import {Link} from "@remix-run/react";
import {MessageEvent} from "undici-types";
import {MessageOptions} from "protobufjs/ext/descriptor";
import {ParticipantCard} from "~/components/studorg/participant";
import {Participant} from "~/proto/models/participant";

export const Moderation = (params: {
    studorg: Studorg,
    setStudorgInfo: (studorgInfo: StudorgInfo | undefined) => void
}) => {
    const [active, setActive] = useState(false)
    const [moderationComment, setModerationComment] = useState<string | undefined | number>("")

    if (params.studorg.studorgInfo == undefined) {
        return <></>
    }
    const studorgInfo = params.studorg.studorgInfo

    function handleMessage() {
        return (e: any, data: { value?: string | number }) => {
            setModerationComment(data.value)
        }
    }

    async function hideStudorg() {
        if (params.studorg.studorgInfo === undefined) {
            params.studorg.studorgInfo = StudorgInfo.create()
        }
        if (moderationComment !== undefined) {
            params.studorg.studorgInfo.moderationComment = moderationComment.toString()
        }

        await Client.getInstance().hideStudorg(params.studorg)
        setActive(!active)
        params.setStudorgInfo(undefined)
    }

    const onClickOutside = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setActive(false)
    }

    const onClickHide = () => {
        setActive(true)
    }

    const onClickShow = async () => {
        await Client.getInstance().showStudorg(params.studorg)
        params.setStudorgInfo(undefined)
    }

    return <>
        <Dimmer page onClickOutside={onClickOutside} active={active}>
            <Segment style={{ width: 400 }}>
                <Message warning>
                    <Header> Скрытие организации </Header>
                    <p>Как модератор, вы имеете право скрыть студенческую организацию из общего доступа,
                        если информация, размещенная на страница, нарушает правила сервиса.</p>
                    <p>Администраторы организации увидят оставленное вами сообщение и ваш контакт. </p>
                </Message>

                <Form>
                    <FormTextArea required placeholder={"Опишите причину скрытия организации."}
                                      value={moderationComment} onChange={handleMessage()}
                                      style={{ minHeight: 200 }}
                        />
                        <FormButton onClick={hideStudorg}> Скрыть организацию </FormButton>
                    </Form>
            </Segment>
        </Dimmer>
        <HideOrShowFormButton status={studorgInfo.moderationStatus} hide={onClickHide} show={onClickShow}/>
    </>
}

function HideOrShowFormButton(params: { status: ModerationStatus, hide: () => void, show: () => void }) {
    if (params.status == ModerationStatus.HIDDEN) {
        return <Button fluid onClick={params.show}> Сделать организацию видимой </Button>
    }

    return <Button fluid onClick={params.hide}> Скрыть организацию </Button>
}

export const OrgHiddenMessage = () => (
    <Message
        warning
        header='Организация скрыта модератором'
    />
)

export const OrgHiddenMessageFullInfo = (params: {studorgInfo: StudorgInfo}) => (
    <Message error>
        <MessageHeader> Организация скрыта модератором из публичного доступа</MessageHeader>
        <MessageContent>
            <p> </p>
            <p> Сообщение, оставленное модератором: "{params.studorgInfo.moderationComment}" </p>
            {/*<p> Контакт модератора: {params.studorgInfo.moderatorID} </p>*/}

            {/*<Link to={`/user/${params.studorgInfo.moderatorID}`}> Контакт модератора </Link>*/}
        </MessageContent>
    </Message>
)