import {Link} from "~/proto/models/common";
import {
    Button,
    ButtonGroup,
    FormButton,
    FormGroup,
    FormInput,
    Grid,
    GridColumn,
    Header,
    Segment,
    SemanticCOLORS
} from "semantic-ui-react";
import React from "react";

export function LinksView(params: { links: Link[] }) {
    return (
        <Segment basic>
            <ButtonGroup labeled vertical icon>
                {params.links.map((link) => <LinkButton link={link} compact={false}/>)}
            </ButtonGroup>
        </Segment>
    )
}

export function LinksForm(params: { links: Link[], setLinks: (links: Link[]) => void }) {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        params.setLinks(params.links.concat({id: crypto.randomUUID()} as Link))
    }

    return (
        <Segment>
            <Header as={"h5"}> Ссылки на внешние источники </Header>

            {params.links.map((link) => <LinkForm id={link.id} links={params.links} setLinks={params.setLinks}/>)}

            <Button onClick={handleSubmit} circular> Добавить </Button>
        </Segment>
    )
}

export function LinkForm(params: { links: Link[], id: string, setLinks: (links: Link[]) => void }) {
    const deleteItem = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        params.setLinks(params.links.filter((l) => l.id != params.id))
    }

    const links = [...params.links]
    const link = links.filter((l) => l.id == params.id)[0]

    function handleUpdate<K extends keyof Link, T extends Link[K]>(key: K) {
        return (e: any, data: { value: T }) => {
            link[key] = data.value
            params.setLinks(links)
        }
    }

    return <FormGroup unstackable>
        <FormInput required
                   placeholder='Краткое описание'
                   value={link.name}
                   onChange={handleUpdate("name")}
                   width={8}
        />
        <FormInput required
                   placeholder='Cсылка на источник'
                   value={link.value}
                   onChange={handleUpdate("value")}
                   width={8}

        />
        <FormButton onClick={deleteItem} icon={"delete"}/>
    </FormGroup>
}

function LinkButton(params: { link: Link, compact: boolean }) {
    if (!params.link.value || !params.link.name) return <></>

    function colorAndIcon(url: string) {
        if (url.includes("t.me") || url.includes("telegram"))
            return {icon: "telegram", color: "blue" as SemanticCOLORS}
        else if (url.includes("vk.com"))
            return {icon: "vk", color: "vk" as SemanticCOLORS}
        else if (url.includes("instagram.com"))
            return {icon: "instagram", color: "instagram" as SemanticCOLORS}
        else if (url.includes("facebook.com"))
            return {icon: "facebook official", color: "facebook" as SemanticCOLORS}
        else
            return {icon: "globe"}
    }

    if (params.compact) {
        return <Button href={params.link.value}
                       {...colorAndIcon(params.link.value)}
                       circular
        />
    }

    return <Button href={params.link.value}
                   content={params.link.name}
                   {...colorAndIcon(params.link.value)}
    />
}

export function CompactLinksView(params: { links: Link[] }) {
    return (
        <Segment basic>
            {params.links.map((link) => <LinkButton link={link} compact={true}/>)}
        </Segment>
    )
}