import {Header, Search, Segment} from "semantic-ui-react";
import React from "react";
import Client from "~/client";
import {StudorgID} from "~/proto/models/studorg";
import {User2Studorg} from "~/proto/models/user2studorg";

const initialState = {
    loading: false,
    results: [] as User2Studorg[],
    value: '',
}

function exampleReducer(state: any, action: any) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return {...state, loading: true, value: action.query}
        case 'FINISH_SEARCH':
            return {...state, loading: false, results: action.results}
        case 'UPDATE_SELECTION':
            return {...state, value: action.selection}

        default:
            throw new Error()
    }
}

export function AdminsSearch(params: { studorgID: StudorgID }) {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        //     params.setAdmins(params.admins.concat({id: crypto.randomUUID()} as User2Studorg))
    }

    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const {loading, results, value} = state

    const handleSearchChange = React.useCallback(async (e: any, data: { value?: string; }) => {
        if (data.value === undefined || data.value.length === 0) {
            dispatch({type: 'CLEAN_QUERY'})
            return
        }

        dispatch({type: 'START_SEARCH', query: data.value})

        const result = await Client.getInstance().getParticipants(params.studorgID)

        if (result === undefined) {
            return
        }

        const searchResult = result.user2Studorgs.filter(user => user.publicInfo === data.value )

        dispatch({
            type: 'FINISH_SEARCH',
            results: searchResult.map(user => {return {
                title: user.id,
                description: user.publicInfo,
            }}),
        })
    }, [])

    return (
        <Segment>
            <Header as={"h5"}> Администраторы сообщества </Header>

            <Search
                loading={loading}
                placeholder='Search...'
                onResultSelect={(e, data) =>
                    dispatch({type: 'UPDATE_SELECTION', selection: data.result.title})
                }
                onSearchChange={handleSearchChange}
                results={results}
                value={value}
            />
            {/*<Button onClick={handleSubmit} circular> Добавить </Button>*/}
        </Segment>
    )
}

export function AdminsForm(params: { studorgID: StudorgID }) { //(params: { admins: User2Studorg[], setAdmins: (admins: User2Studorg[]) => void }) {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        //     params.setAdmins(params.admins.concat({id: crypto.randomUUID()} as User2Studorg))
    }

    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const {loading, results, value} = state

    const handleSearchChange = React.useCallback(async (e: any, data: { value?: string; }) => {
        if (data.value === undefined || data.value.length === 0) {
            dispatch({type: 'CLEAN_QUERY'})
            return
        }

        dispatch({type: 'START_SEARCH', query: data.value})

        const result = await Client.getInstance().getParticipants(params.studorgID)

        if (result === undefined) {
            return
        }

        const searchResult = result.user2Studorgs.filter(user => user.publicInfo === data.value )

        dispatch({
            type: 'FINISH_SEARCH',
            results: searchResult.map(user => {return {
                title: user.id,
                description: user.publicInfo,
            }}),
        })
    }, [])

    return (
        <Segment>
            <Header as={"h5"}> Администраторы сообщества </Header>

            <Search
                loading={loading}
                placeholder='Search...'
                onResultSelect={(e, data) =>
                    dispatch({type: 'UPDATE_SELECTION', selection: data.result.title})
                }
                onSearchChange={handleSearchChange}
                results={results}
                value={value}
            />
            {/*<Button onClick={handleSubmit} circular> Добавить </Button>*/}
        </Segment>
    )
}