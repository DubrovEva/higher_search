import {Container, Grid, Segment} from "semantic-ui-react";
import React from "react";
import commonStyles from "~/styles/common.css?url";

export function CustomFooter() {
    return (
        <Segment className="footer" inverted vertical>
            <Container>
                <Grid stackable inverted divided>
                    <div className="three wide column">
                        <h4 className="ui inverted header">Общее</h4>
                        <div className="ui inverted link list">
                            <a href="#" className="item">FAQ</a>
                            <a href="#" className="item">Правила</a>
                            <a href="#" className="item">Контакты</a>
                            <a href="#" className="item">Модераторы</a>
                        </div>
                    </div>
                    <div className="three wide column">
                        <h4 className="ui inverted header">Соглашения</h4>
                        <div className="ui inverted link list">
                            <a href="#" className="item">Пользовательское соглашение</a>
                            <a href="#" className="item">Политика обработки персональных данных</a>
                        </div>
                    </div>
                    <div className="seven wide column">
                        <h4 className="ui inverted header"> Нарушения в работе сервиса</h4>
                        <p> Если вы обнаружили неисправности в работе сайта, заявить о них можно в <a href="https://forms.gle/KitueLW8mDLVrhBEA">эту форму</a>.</p>
                    </div>
                </Grid>
            </Container>
        </Segment>
    );
}
