import {User} from "~/proto/models/user";
import {faculty} from "~/components/options";
import {Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import Client from "~/client";
import dummy from "../assets/dummy.png?url";


export function OrganizationsNumber(params: {number: number}) {
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
        return <Card>loading...</Card>
    }
    const currentFaculty = faculty.find(f => f.value === params.user.userInfo!.faculty)?.text

    const [studorgsNumber, setStudorgsNumber] = useState<number | null>(null)
    useEffect(() => {
        Client.getInstance().studorgsNumber(params.user.iD!).then(result => setStudorgsNumber(result))
    }, [])

    return (
        <Card>
            <Image src={dummy} wrapped ui={false} />
            <CardContent>
                <CardHeader> {params.user.userInfo!.name} {params.user.userInfo!.surname} </CardHeader>
                <CardMeta>
                    <span className='date'> {currentFaculty? currentFaculty + "," : ""} {params.user.userInfo!.educationInfo}</span>
                </CardMeta>
                <CardDescription>
                    {params.user.userInfo!.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>

                {studorgsNumber != null && <><Icon name='users'/> <OrganizationsNumber number={studorgsNumber}/></> }

            </CardContent>
        </Card>
    );
}