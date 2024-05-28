import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";
import {
    CardGroup,
    Container, Divider,
    Header,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {AuthInfo, User} from "~/proto/models/user";
import Client from "~/client";
import {ClickableUserCard} from "~/components/user";
import {LoadingMessage} from "~/components/messages";

export const meta: MetaFunction = () => {
    return [
        {title: "Контакты"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

export default function Contacts() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    const [users, setUsers] = useState<User[] | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    useEffect(() => {
        Client.getInstance().getDevelopers().then(users => setUsers(users))
    }, [])


    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <Container text className={"main"}>
                <Header size={"huge"}> Контакты </Header>
                <Divider/>

                <CardGroup itemsPerRow={1}>
                    {users ?
                        users?.map(user => <ClickableUserCard user={user}/>) :
                    <LoadingMessage/>
                    }

                </CardGroup>
            </Container>

            <CustomFooter/>
        </>
    );
}
