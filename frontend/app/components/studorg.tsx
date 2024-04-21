import {
    Button,
    Item,
    ItemContent,
    ItemDescription,
    ItemExtra,
    ItemGroup,
    ItemHeader,
    ItemImage,
    ItemMeta, Label
} from "semantic-ui-react";
import React from "react";
import dummy from "../assets/dummy.png?url";


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
                    <ItemExtra>
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
    );
}