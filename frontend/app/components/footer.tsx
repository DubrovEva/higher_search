import {Container, Grid, GridColumn, Header, List, ListItem, Segment} from "semantic-ui-react";
import React from "react";

export function CustomFooter() {
    return (
        <Segment className="footer" inverted vertical>
            <Container>
                <Grid stackable inverted divided columns={2}>
                    <GridColumn width={3}>
                        <Header inverted> Общее </Header>
                        <List inverted>
                            <ListItem href="/faq"> FAQ </ListItem>
                            <ListItem href="/rules"> Правила </ListItem>
                            <ListItem href="/contacts"> Контакты </ListItem>
                            {/*<ListItem href="/moderators"> Модераторы </ListItem>*/}
                        </List>
                    </GridColumn>
                    {/*<div className="three wide column">*/}
                    {/*    <h4 className="ui inverted header">Соглашения</h4>*/}
                    {/*    <div className="ui inverted link list">*/}
                    {/*        <a href="#" className="item">Пользовательское соглашение</a>*/}
                    {/*        <a href="#" className="item">Политика обработки персональных данных</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <GridColumn>
                        <Header inverted> Нарушения в работе сервиса </Header>
                        <p> Если вы обнаружили неисправности в работе сайта, заявить о них можно в <a
                            href="https://forms.gle/KitueLW8mDLVrhBEA">эту форму</a>.</p>
                    </GridColumn>
                </Grid>
            </Container>
        </Segment>
    );
}
