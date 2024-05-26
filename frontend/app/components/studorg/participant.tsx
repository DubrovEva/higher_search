import {Participant} from "~/proto/models/participant";
import {Button, Card, CardContent, CardDescription, CardHeader, Dimmer, Icon, Image} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import Client from "~/client";
import {LinksView} from "~/components/studorg/links";
import {StudorgRole} from "~/proto/models/studorg";
import {OrganizationsNumber, UserCard} from "~/components/user";
import dummy from "../../assets/dummy.png?url";

export function ParticipantCard(params: { participant: Participant }) {
    if (!params.participant.userInfo) {
        return <Card>loading...</Card>
    }

    const [studorgsNumber, setStudorgsNumber] = useState<number | null>(null)
    useEffect(() => {
        Client.getInstance().studorgsNumber(params.participant.userID!).then(result => setStudorgsNumber(result))
    }, [])

    const [active, setActive] = useState(false)

    return (
        <Card onClick={() => setActive(!active)}>
            <Dimmer active={active} onClickOutside={() => setActive(!active)} page>
                <AdminButton participant={params.participant}/>
                <UserCard user={{userInfo: params.participant.userInfo, iD: params.participant.userID}}/>
                <LinksView links={params.participant.userInfo!.links}/>
            </Dimmer>
            <CardContent>
                <CardContent>
                    <Image src={dummy} size={"mini"} floated={"right"}/>
                </CardContent>
                <CardHeader> {params.participant.userInfo!.name} {params.participant.userInfo!.surname} </CardHeader>
                <CardDescription>
                    {params.participant.userInfo!.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                {studorgsNumber != null && <><Icon name='users'/> <OrganizationsNumber number={studorgsNumber}/></>}
            </CardContent>
        </Card>
    );
}

function AdminButton(params: {participant: Participant}) {
    if (params.participant.role === StudorgRole.HEAD) {
        return <></>
    }

    const makeAdmin = () => {
        params.participant.role = StudorgRole.ORGANIZER
        Client.getInstance().updateParticipant(params.participant).then(result =>console.log(result))
    }

    const makeParticipant = () => {
        params.participant.role = StudorgRole.PARTICIPANT
        Client.getInstance().updateParticipant(params.participant).then(result =>console.log(result))
    }

    if (params.participant.role === StudorgRole.ORGANIZER) {
        return <Button onClick={makeParticipant} fluid color={"purple"}> Разжаловать </Button>
    }

    return <Button onClick={makeAdmin} fluid color={"blue"}> Сделать администратором </Button>
}