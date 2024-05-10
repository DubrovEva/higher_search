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

export function NoRightsMessage() {
    return <Message negative>
        <MessageHeader> У вас нет доступа к данным </MessageHeader>
        <p> Ваших прав недостаточно для получения доступа</p>
    </Message>
}