import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/list.css?url";
import my_logo from "../assets/logo.png?url";
import dummy from "../assets/dummy.png?url";
import {
    Container, Divider,
    Header,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {CustomFooter} from "~/components/footer";
import {FullList, OrgCards} from "~/components/studorg";
import {FixedMenu} from "~/components/menu";
// import {Router_client} from "~/proto/api/RouterServiceClientPb";
import {StudorgID} from "~/proto/models/studorg_pb";
import Client from "~/client";
import {Studorg, StudorgInfo} from "~/proto/models/studorg";

export const meta: MetaFunction = () => {
    return [
        {title: "Список организаций"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

/*
На этой странице нужно:
1. Доставать из базы все студенческие организации
2. Выводить каждую из них в свой блок (блоки расположить последовательно)

Последовательность задач:
1. Сделать константную тестовую модель на основе прото модели
2. Написать функцию, которая обрабатывает модель и выводит карточку студенческой организации
3. Протестить, что можно одну и ту же модель последовательно разместить в карточках, и что выглядит норм
4. Добавить ссылку на страницу конкретной СО, научиться красиво отображать данные конкретной СО
5. Сделать коннект с бэкендом, доставать настоящую модельку
6. Доставать с бэкенда вообще все СО
7. Посортить СО по алфавиту
 */

function Body() {
    const [studorgs, setStudorgInfo] = useState<Studorg[] | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().getAllStudorgs().then(x => setStudorgInfo(x))
    }, [])

    return (
        <Container text className="main">
            <Header size={"huge"}> Все организации </Header>
            <Divider/>
            {studorgs ? <OrgCards studorgs={studorgs}/> : <span>Loading...</span>}
        </Container>
    );
}

export default function List() {
    return (
        <>
            <FixedMenu/>
            <Body/>
            <CustomFooter/>
        </>
    );
}
