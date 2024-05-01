import {
    Card,
    CardContent,
    CardDescription,
    CardGroup,
    CardHeader,
    CardMeta,
    Divider,
    Icon,
    Image,
    Item,
    ItemContent,
    ItemExtra,
    ItemGroup,
    ItemHeader,
    ItemImage,
    ItemMeta,
    Label
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import dummy from "../assets/dummy.png?url";
import {StudorgInfo, Studorg, StudorgID} from "~/proto/models/studorg";
import {category} from "~/components/options";
import Client from "~/client";


export function FullList() {
    return (
        <ItemGroup divided>
            <Item>
                <ItemImage src={dummy} size="small"/>

                <ItemContent>
                    <ItemHeader as='a'>12 Years a Slave</ItemHeader>
                    <ItemMeta>
                        <span className='cinema'>Union Square 14</span>
                    </ItemMeta>
                    <ItemExtra  >
                        <Label>IMAX</Label>
                        <Label icon='globe' content='Additional Languages'/>
                    </ItemExtra>
                </ItemContent>
            </Item>

            <Item>
                <ItemImage src={dummy} size="small"/>

                <ItemContent>
                    <ItemHeader as='a'>My Neighbor Totoro</ItemHeader>
                    <ItemMeta>
                        <span className='cinema'>IFC Cinema</span>
                    </ItemMeta>
                </ItemContent>
            </Item>

            <Item>
                <ItemImage src={dummy} size="small"/>

                <ItemContent>
                    <ItemHeader as='a'>Watchmen</ItemHeader>
                    <ItemMeta>
                        <span className='cinema'>IFC</span>
                    </ItemMeta>
                </ItemContent>
            </Item>
        </ItemGroup>
    )
}

export function OrgCards(params: { studorgs: Studorg[]}) {
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
        <Card>
            <CardContent>
                <Image floated='left' size='tiny' src={dummy}/>
                <CardHeader href={"/studorg/" + params.ID.iD}> {params.studorgInfo.name} </CardHeader>
                <CardMeta>
                    C {params.studorgInfo.createdAt}
                </CardMeta>
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

    if (params.tag == "Участник") {
        return <Label> Участник </Label>
    } else if (params.tag == "Организатор") {
        return <Label color="blue"> Организатор </Label>
    } else if (params.tag == "Глава") {
        return <Label color="green"> Глава </Label>
    } else {
        return (
            <Label> {tagName} </Label>
        )
    }
}
