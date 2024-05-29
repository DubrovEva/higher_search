import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardGroup,
    CardHeader,
    CardMeta,
    Divider,
    Icon,
    Image,
    Label, Placeholder, PlaceholderHeader, PlaceholderLine, PlaceholderParagraph
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import dummy from "../../assets/dummy.png?url";
import {ModerationStatus, Studorg, StudorgID, StudorgInfo, StudorgRole} from "~/proto/models/studorg";
import Client from "~/client";
import {NoOrganizationsMessage, NoOrgsMessage} from "~/components/messages";
import {category} from "~/components/studorg/tags";

export function OrgCards(params: { studorgs: Studorg[]}) {
    if (params.studorgs.length == 0) {
        return <NoOrgsMessage/>
    }

    return (
        <CardGroup stackable itemsPerRow={1}>
            {params.studorgs.map(
                studorg => <OrgCard studorgInfo={studorg.studorgInfo!} ID={studorg.iD!}/>
            )}
        </CardGroup>
    );
}

export function OrgCard(params: { studorgInfo: StudorgInfo, ID: StudorgID}) {
    const [usersNumber, setUsersNumber] = useState<string | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().usersNumber(params.ID).then(x => setUsersNumber(x))
    }, [])

    return (
        <Card href={"/studorg/" + params.ID.iD} color={"grey"} >
            <CardContent>
                <Image floated='left' rounded size='tiny' src={dummy}/>
                <CardHeader> {params.studorgInfo.name} </CardHeader>

                {params.studorgInfo.createdAt && <CardMeta> C <AdmissionTime seconds={+params.studorgInfo?.createdAt?.seconds}/> </CardMeta> }
                <CardMeta>
                    {usersNumber} <Icon name="id card"/>
                </CardMeta>
                <CardDescription> {params.studorgInfo.shortDescription} </CardDescription>
                <Divider/>
                <CardContent extra> <Icon name="tags" color="grey"/> <OrgTags tags={params.studorgInfo.tags}/> </CardContent>
            </CardContent>
        </Card>
    )
}

export function OrgTags(params: { tags: string[]}) {
    return params.tags.map(
        tag => <TagToLabel tag={tag}/>
    )
}

export function TagToLabel(params: {tag: string}) {
    const tagName = category.find(elem => elem.value == params.tag)?.text
    return (
        <Label> {tagName} </Label>
    )
}

function UserOrgCard(params: {studorg: Studorg}) {
    // params.studorg.studorgInfo?.admissionTime
    const [isDeleted, setIsDeleted] = useState(false)

    return !isDeleted && <Card color={"grey"} href={"/studorg/" + params.studorg.iD?.iD}>
        <CardContent>
            <Image
                rounded
                floated='left'
                size='tiny'
                src={dummy}
            />

            <EditButton role={params.studorg.studorgInfo?.role!} studorgID={params.studorg.iD!} onDelete={() => setIsDeleted(true)}/>
            <CardHeader > {params.studorg.studorgInfo?.name}
            </CardHeader>
            {params.studorg.studorgInfo?.admissionTime && <CardMeta> Участник с <AdmissionTime seconds={+params.studorg.studorgInfo?.admissionTime?.seconds}/> </CardMeta> }
            <CardContent extra>
                <RoleToLabel role={params.studorg.studorgInfo?.role!}/>
                <ModerationStatusToLabel status={params.studorg.studorgInfo?.moderationStatus!}/>
            </CardContent>
        </CardContent>
    </Card>
}

export function UserOrgCards(params: {studorgs: Studorg[]}) {
    if (params.studorgs.length == 0) {
        return <NoOrganizationsMessage/>
    }
    return (
        <CardGroup stackable itemsPerRow={1}>
            {params.studorgs.map(
                studorg => <UserOrgCard studorg={studorg}/>
            )}
        </CardGroup>
    );
}

function AdmissionTime(params: {seconds: number}) {
    return new Date( params.seconds * 1000).toLocaleDateString();  // convert timestamp to milliseconds and construct Date object
}

function EditButton(params: {role: StudorgRole, studorgID: StudorgID, onDelete: () => void}) {
    const deleteUserFromStudorg = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        params.onDelete()
        await Client.getInstance().deleteUserFromStudorg(params.studorgID)
    }
    const routeToEditOrg = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        window.location.href = `/edit/${params.studorgID.iD}`;
    }

    if (params.role == StudorgRole.HEAD || params.role == StudorgRole.ORGANIZER) {
        return <Button floated={"right"} onClick={routeToEditOrg} basic> Редактировать </Button>
    } else {
        return <Button floated={"right"} onClick={deleteUserFromStudorg} basic> Покинуть </Button>
    }
}

function RoleToLabel(params: {role: StudorgRole}) {
    if (params.role == StudorgRole.ORGANIZER) {
        return <Label color="blue"> Организатор </Label>
    } else if (params.role == StudorgRole.HEAD) {
        return <Label color="green"> Глава </Label>
    } else {
        return <Label> Участник </Label>
    }
}

function ModerationStatusToLabel(params: {status: ModerationStatus}) {
    if (params.status == ModerationStatus.HIDDEN_BY_MODERATOR) {
        return <Label color="red" basic> Скрыта модератором </Label>
    }
}