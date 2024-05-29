import {ModerationStatus, StudorgID, StudorgInfo, StudorgRole} from "~/proto/models/studorg";
import React, {useState} from "react";
import Client from "~/client";
import {Button} from "semantic-ui-react";

export function UserInStudorgButton(params: { studorgID: StudorgID }) {
    const [role, setRole] = useState<StudorgRole | undefined>(undefined)
    Client.getInstance().getStudorgRole(params.studorgID).then(role => setRole(role))

    if (role === undefined) {
        return <></>
    }

    const addUserToStudorg = async () => {
        await Client.getInstance().addUserToStudorg(params.studorgID)
        setRole(StudorgRole.PARTICIPANT)
    }
    const deleteUserFromStudorg = async () => {
        await Client.getInstance().deleteUserFromStudorg(params.studorgID)
        setRole(StudorgRole.NOT_PARTICIPANT)
    }

    if (role === StudorgRole.ORGANIZER || role === StudorgRole.PARTICIPANT) {
        return <Button floated={"right"} basic onClick={deleteUserFromStudorg}> Покинуть организацию </Button>
    }
    if (role === StudorgRole.NOT_PARTICIPANT) {
        return <Button floated={"right"} basic onClick={addUserToStudorg}> Вступить в организацию </Button>
    }

    return <></>
}