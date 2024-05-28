import {
    Card,
    CardContent,
    CardGroup,
    Placeholder,
    PlaceholderHeader,
    PlaceholderLine,
    PlaceholderParagraph
} from "semantic-ui-react";
import React from "react";

export function OrgCardsPlaceholder() {
    return (
        <CardGroup stackable itemsPerRow={1}>
            <OrgCardPlaceholder/>
            <OrgCardPlaceholder/>
            <OrgCardPlaceholder/>
        </CardGroup>
    );
}

function OrgCardPlaceholder() {

    return (
        <Card fluid>
            <CardContent>
                <Placeholder>
                    <PlaceholderHeader image>
                        <PlaceholderLine />
                        <PlaceholderLine />
                    </PlaceholderHeader>
                    <PlaceholderParagraph>
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                    </PlaceholderParagraph>
                </Placeholder>
            </CardContent>
        </Card>
    )
}

export function PlaceholderForm() {
    return (
        <Placeholder>
            {[...Array(10)].map((x, i) =>
                <PlaceholderParagraph>
                    <PlaceholderLine length={"very short"}/>
                    <PlaceholderLine fluid length={"full"}/>
                    <PlaceholderLine length={"very long"}/>
                    <PlaceholderLine length={"very short"}/>
                </PlaceholderParagraph>
            )}
        </Placeholder>
    )
}