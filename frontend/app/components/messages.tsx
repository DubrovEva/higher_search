import {Icon, Message, MessageContent, MessageHeader} from "semantic-ui-react";
import React from "react";

export function LoadingRightsMessage() {
    return <Message icon>
        <Icon name='circle notched' loading/>
        <MessageContent>
            <MessageHeader>Подождите немного..</MessageHeader>
            Проверяем, что у вас достаточно прав.
        </MessageContent>
    </Message>
}

export function LoadingMessage() {
    return <Message icon>
        <Icon name='circle notched' loading/>
        <MessageContent>
            <MessageHeader>Подождите немного..</MessageHeader>
            Обрабатываем запрос.
        </MessageContent>
    </Message>
}

export function NoOrgsMessage() {
    return <Message negative>
        <MessageContent>
            <MessageHeader> Подходящих организаций не найдено </MessageHeader>
            Попробуйте изменить параметры поиска.
        </MessageContent>
    </Message>
}

export function NoRightsMessage() {
    return <Message negative>
        <MessageHeader> У вас нет доступа к данным </MessageHeader>
        <p> Ваших прав недостаточно для получения доступа</p>
    </Message>
}

export const OrgHiddenByModeratorMessage = () => (
    <Message
        warning
        header='Организация скрыта модератором'
    />
)

export const OrgHiddenByHeadMessage = () => (
    <Message
        warning
        header='Организация скрыта главой организации'
    />
)

export const NoOrganizationsMessage = () => (
    <Message>
        <MessageHeader> У вас пока нет студенческих организаций! </MessageHeader>
        <p>
            Подобрать себе первую организацию можно через <a href="/search">поиск</a>.
        </p>
    </Message>
)

export const SavedMessage = () => (
    <Message
        success
        header='Сохранено'
    />
)