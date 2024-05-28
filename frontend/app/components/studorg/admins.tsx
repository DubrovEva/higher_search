// import {Header, Search, Segment} from "semantic-ui-react";
// import React from "react";
// import Client from "~/client";
// import {StudorgID} from "~/proto/models/studorg";
// import {Participant} from "~/proto/models/participant";
//
// const initialState = {
//     loading: false,
//     results: [] as Participant[],
//     value: '',
// }
//
// function exampleReducer(state: any, action: any) {
//     switch (action.type) {
//         case 'CLEAN_QUERY':
//             return initialState
//         case 'START_SEARCH':
//             return {...state, loading: true, value: action.query}
//         case 'FINISH_SEARCH':
//             return {...state, loading: false, results: action.results}
//         case 'UPDATE_SELECTION':
//             return {...state, value: action.selection}
//
//         default:
//             throw new Error()
//     }
// }
//
// export function AdminsSearch(params: { studorgID: StudorgID }) {
//     const handleSubmit = (e: { preventDefault: () => void; }) => {
//         e.preventDefault()
//         //     params.setAdmins(params.admins.concat({id: crypto.randomUUID()} as User2Studorg))
//     }
//
//     const [state, dispatch] = React.useReducer(exampleReducer, initialState)
//     const {loading, results, value} = state
//
//     const handleSearchChange = React.useCallback(async (e: any, data: { value?: string; }) => {
//         if (data.value === undefined || data.value.length === 0) {
//             dispatch({type: 'CLEAN_QUERY'})
//             return
//         }
//
//         dispatch({type: 'START_SEARCH', query: data.value})
//
//         const result = await Client.getInstance().getParticipants(params.studorgID, false)
//
//         if (result === undefined) {
//             return
//         }
//
//         const searchResult = result.participants.filter(user => user.publicInfo === data.value )
//
//         dispatch({
//             type: 'FINISH_SEARCH',
//             results: searchResult.map(user => {return {
//                 title: user.id,
//                 description: user.publicInfo,
//             }}),
//         })
//     }, [])
//
//     return (
//         <Segment>
//             <Header as={"h5"}> Администраторы сообщества </Header>
//
//             <Search
//                 loading={loading}
//                 placeholder='Search...'
//                 onResultSelect={(e, data) =>
//                     dispatch({type: 'UPDATE_SELECTION', selection: data.result.title})
//                 }
//                 onSearchChange={handleSearchChange}
//                 results={results}
//                 value={value}
//             />
//             {/*<Button onClick={handleSubmit} circular> Добавить </Button>*/}
//         </Segment>
//     )
// }
//
// export function AdminsForm(params: { studorgID: StudorgID }) { //(params: { admins: User2Studorg[], setAdmins: (admins: User2Studorg[]) => void }) {
//     const handleSubmit = (e: { preventDefault: () => void; }) => {
//         e.preventDefault()
//         //     params.setAdmins(params.admins.concat({id: crypto.randomUUID()} as User2Studorg))
//     }
//
//     const [state, dispatch] = React.useReducer(exampleReducer, initialState)
//     const {loading, results, value} = state
//
//     const handleSearchChange = React.useCallback(async (e: any, data: { value?: string; }) => {
//         if (data.value === undefined || data.value.length === 0) {
//             dispatch({type: 'CLEAN_QUERY'})
//             return
//         }
//
//         dispatch({type: 'START_SEARCH', query: data.value})
//
//         const result = await Client.getInstance().getParticipants(params.studorgID)
//
//         if (result === undefined) {
//             return
//         }
//
//         const searchResult = result.user2Studorgs.filter(user => user.publicInfo === data.value )
//
//         dispatch({
//             type: 'FINISH_SEARCH',
//             results: searchResult.map(user => {return {
//                 title: user.id,
//                 description: user.publicInfo,
//             }}),
//         })
//     }, [])
//
//     return (
//         <Segment>
//             <Header as={"h5"}> Администраторы сообщества </Header>
//
//             <Search
//                 loading={loading}
//                 placeholder='Search...'
//                 onResultSelect={(e, data) =>
//                     dispatch({type: 'UPDATE_SELECTION', selection: data.result.title})
//                 }
//                 onSearchChange={handleSearchChange}
//                 results={results}
//                 value={value}
//             />
//             {/*<Button onClick={handleSubmit} circular> Добавить </Button>*/}
//         </Segment>
//     )
// }

import {StudorgID, StudorgRole} from "~/proto/models/studorg";
import {
    Card,
    CardContent,
    CardDescription,
    CardGroup,
    CardHeader,
    Dimmer,
    Header,
    Icon,
    Image,
    Segment
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import Client from "~/client";
import {Participant} from "~/proto/models/participant";
import dummy from "../../assets/dummy.png?url";
import {OrganizationsNumber, UserCard} from "~/components/user";
import {LinksView} from "~/components/studorg/links";

export function Admins(params: { studorgID: StudorgID }) {
    const [participants, setParticipants] = useState<Participant[] | undefined>(undefined)
    useEffect(() => {
        Client.getInstance().getParticipants(params.studorgID, true).then(response =>
            setParticipants(response!.participants))
    }, [])

    if (participants === undefined || participants.length === 0) {
        return <></>
    }

    return (
        <Segment basic>
            <Header as={"h3"} textAlign={"center"} > Администраторы сообщества </Header>

            <CardGroup itemsPerRow={1}>
                {participants?.map(participant =>
                    <AdminCard key={participant.id} participant={participant}/>
                )}

            </CardGroup>

        </Segment>
    )
}

export function AdminCard(params: { participant: Participant }) {
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
                <UserCard user={{userInfo: params.participant.userInfo, iD: params.participant.userID}}/>
                <LinksView links={params.participant.userInfo!.links}/>
            </Dimmer>
            <CardContent>
                <CardContent>
                    <Image src={dummy} size={"mini"} floated={"right"}/>
                </CardContent>
                <CardHeader>
                    {params.participant.userInfo!.name} {params.participant.userInfo!.surname}
                    {"  "}{params.participant.role === StudorgRole.HEAD && <Icon name="star"/>}
                </CardHeader>
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