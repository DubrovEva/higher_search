import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";
import {
    Container,
    Header, List, ListItem, Segment, SegmentGroup,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {AuthInfo} from "~/proto/models/user";
import Client from "~/client";

export const meta: MetaFunction = () => {
    return [
        {title: "Часто задаваемые вопросы"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

export default function FAQ() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <Container text className={"main"}>
                <Header size={"huge"}> Часто задаваемые вопросы </Header>

                <Segment basic>
                    <Segment padded>
                        <Header as={"h3"}> Как создать студенческую организацию? </Header>

                        <p> Для того, чтобы создать студенческую организацию, необходимо авторизоваться или зарегистрироваться на сайте.</p>

                    </Segment>

                    <Segment padded>
                        <Header as={"h3"}> Моя организация будет считаться официальной организацией ВШЭ? </Header>

                        <p>
                            Нет, все текущие организации не считаются официальными, если ЦПСИ не согласовывал их отдельно.
                        </p>

                    </Segment>

                    <Segment padded>
                        <Header as={"h3"}> Почему моя организация пропала из общего списка? </Header>

                        <p>
                            Организации, нарушающие правила сервиса, скрываются модератором. Для того, чтобы снова сделать
                            организацию публичной, нужно исправить указанные недостатки и подать заявку на повторную проверку модератором.
                        </p>

                    </Segment>

                </Segment>
            </Container>

            <CustomFooter/>
        </>
    );
}
