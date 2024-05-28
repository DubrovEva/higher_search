import {User} from "~/proto/models/user";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardMeta,
    Dimmer,
    Icon,
    Image,
    Placeholder,
    PlaceholderHeader,
    PlaceholderImage,
    PlaceholderLine
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import Client from "~/client";
import dummy from "../assets/dummy.png?url";
import {faculty} from "~/components/studorg/faculty";
import {LinksView} from "~/components/studorg/links";


export function OrganizationsNumber(params: { number: number }) {
    if (params.number % 10 == 1) {
        return params.number + " студенческая организация"
    } else if (params.number % 10 == 2 || params.number % 10 == 3 || params.number % 10 == 4) {
        return params.number + " студенческих организации"
    } else {
        return params.number + " студенческих организаций"
    }
}

export function UserCard(params: { user: User }) {
    if (!params.user.userInfo) {
        return <UserCardPlaceholder/>
    }
    const currentFaculty = faculty.find(f => f.value === params.user.userInfo!.faculty)?.text

    const [studorgsNumber, setStudorgsNumber] = useState<number | null>(null)
    useEffect(() => {
        Client.getInstance().studorgsNumber(params.user.iD!).then(result => setStudorgsNumber(result))
    }, [])

    return (
        <Card>
            <Image src={dummy} wrapped ui={false}/>
            <CardContent>
                <CardHeader> {params.user.userInfo!.name} {params.user.userInfo!.surname}
                </CardHeader>
                <CardMeta>
                    <span className='date'>
                        {currentFaculty ? currentFaculty + "," : ""} {params.user.userInfo!.educationInfo}
                    </span>
                </CardMeta>
                <CardDescription>
                    {params.user.userInfo!.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                {studorgsNumber != null && <><Icon name='users'/> <OrganizationsNumber number={studorgsNumber}/></>}
            </CardContent>
        </Card>
    );
}

export function UserCardPlaceholder() {
    return <Card>
        <Placeholder style={{height: 260, width: 290}}>
            <PlaceholderImage wrapped/>
        </Placeholder>

        <CardContent>

            <Placeholder>
                <PlaceholderHeader/>
            </Placeholder>

            <Placeholder>
                <PlaceholderLine/>
                <PlaceholderLine/>
                <PlaceholderLine/>
            </Placeholder>
        </CardContent>

        <CardMeta>
            <Placeholder>
                <PlaceholderLine/>
            </Placeholder>
        </CardMeta>

    </Card>
}

export function ClickableUserCard(params: { user: User }) {
    if (!params.user.userInfo) {
        return <></>
    }

    const [studorgsNumber, setStudorgsNumber] = useState<number | null>(null)
    useEffect(() => {
        Client.getInstance().studorgsNumber(params.user.iD!).then(result => setStudorgsNumber(result))
    }, [])

    const [active, setActive] = useState(false)

    return (
        <Card onClick={() => setActive(!active)}>
            <Dimmer active={active} onClickOutside={() => setActive(!active)} page>
                <UserCard user={{userInfo: params.user.userInfo, iD: params.user.iD}}/>
                <LinksView links={params.user.userInfo!.links}/>
            </Dimmer>
            <CardContent>
                <CardContent>
                    <Image src={dummy} size={"mini"} floated={"right"}/>
                </CardContent>
                <CardHeader> {params.user.userInfo!.name} {params.user.userInfo!.surname} </CardHeader>
                <CardDescription>
                    {params.user.userInfo!.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                {studorgsNumber != null && <><Icon name='users'/> <OrganizationsNumber number={studorgsNumber}/></>}
            </CardContent>
        </Card>
    );
}

export function ParticipantPlaceholder() {
    return (
        <Placeholder>
            <PlaceholderLine/>
            <PlaceholderLine/>
            <PlaceholderLine/>
            <PlaceholderLine/>
            <PlaceholderLine/>
            <PlaceholderLine/>
        </Placeholder>
    )
}
