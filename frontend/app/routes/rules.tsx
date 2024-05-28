import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";
import {
    Container, Divider,
    Header, List, ListItem,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {AuthInfo} from "~/proto/models/user";
import Client from "~/client";

export const meta: MetaFunction = () => {
    return [
        {title: "Правила"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

export default function Rules() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <Container text className={"main"}  >
                <Header size={"huge"}> Правила сервиса </Header>
                <Divider/>
                <List ordered relaxed>

                    <ListItem>
                        "Приложение для навигации в студенческих организациях Высшей школы экономики" (далее — Приложение) предназначено для удобного поиска и взаимодействия между студентами и студенческими организациями Высшей Школы Экономики (ВШЭ).
                        В текущий момент Приложение находится в стадии разработки.
                    </ListItem>

                    <ListItem>
                        Пользование Приложением разрешается только в целях личного использования и не может быть использовано для коммерческих или иных целей, не связанных с ВШЭ.
                    </ListItem>

                    <ListItem>
                        Регистрироваться на платформе могут только студенты, сотрудники и преподаватели ВШЭ. Для регистрации необходимо использовать электронную почту с доменом edu.hse.ru. Использовать чужую электронную почту запрещено.
                    </ListItem>

                    <ListItem>
                        Пользователь не должен использовать Приложение для распространения пропаганды, оскорблений или иных материалов, которые могут быть расценены как оскорбительные или носящий провокационный характер.
                    </ListItem>

                    <ListItem>
                        Пользование Приложением означает согласие пользователя с этими правилами.
                        ВШЭ не несет ответственности за любые нарушения пользователем этих правил.
                    </ListItem>
                </List>
            </Container>

            <CustomFooter/>
        </>
    );
}
