import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardGroup,
    CardHeader,
    CardMeta,
    Container,
    Divider,
    Header,
    Icon,
    Image,
    Item,
    ItemContent,
    ItemDescription,
    ItemExtra,
    ItemGroup,
    ItemHeader,
    ItemImage,
    ItemMeta,
    Label
} from "semantic-ui-react";
import React from "react";
import dummy from "../assets/dummy.png?url";
import {StudorgInfo, Tags, Tag, Studorg} from "~/proto/models/studorg";
import {category} from "~/components/options";
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";


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
                studorg => <OrgCard studorgInfo={studorg.studorgInfo!} ID={studorg.iD?.iD!}/>
            )}
        </CardGroup>
    );
}

export function OrgCard(params: { studorgInfo: StudorgInfo, ID: string}) {
    return (
        <Card>
            <CardContent>
                <Image floated='left' size='tiny' src={dummy}/>
                <CardHeader href={"/studorg/" + params.ID}> {params.studorgInfo.name} </CardHeader>
                <CardMeta>
                    C {params.studorgInfo.createdAt}
                </CardMeta>
                <CardMeta>
                    {params.studorgInfo.participantsNumber} <Icon name="id card"/>
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
