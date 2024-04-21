import {
    Container,
    Dropdown,
    DropdownHeader,
    DropdownItem,
    DropdownMenu,
    Header, ItemImage,
    Menu,
    MenuItem, Sidebar
} from "semantic-ui-react";
import React from "react";
import hs_logo from "../assets/logo.png?url";

export function FixedMenu() {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <MenuItem href="/">
                    <img className="logo" src={hs_logo}/>
                    Higher Search
                </MenuItem>
                <MenuItem> <OrganizationsMenu/> </MenuItem>

            </Container>

        </Menu>
    );
}

export function OrganizationsMenu() {
    return (
        <Dropdown text={"Организации"} simple>
            <DropdownMenu>
                <DropdownItem href="/list" active> Полный список </DropdownItem>
                <DropdownHeader> Категории </DropdownHeader>
                <DropdownItem>
                    <Dropdown text={"Организации"} simple>
                        <DropdownMenu>
                            <DropdownItem href="#"> Москва </DropdownItem>
                            <DropdownItem href="#"> Санкт-Петербург </DropdownItem>
                            <DropdownItem href="#"> Пермь </DropdownItem>
                            <DropdownItem href="#"> Нижний Новгород </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </DropdownItem>
                <DropdownItem>
                    <Dropdown text={"Вид деятельности"} simple>
                        <DropdownMenu>
                            <DropdownItem href="#"> Спорт </DropdownItem>
                            <DropdownItem href="#"> Творчество </DropdownItem>
                            <DropdownItem href="#"> Учеба </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </DropdownItem>
                <DropdownItem href="#"> Расширенный поиск </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export function SidebarMenu(props: {visible: boolean} = {visible: false}) {
    return (
        <Sidebar as={Menu} vertical inverted visible={props.visible}>
            <MenuItem>
                <ItemImage src={hs_logo} size={"tiny"}/>
            </MenuItem>
            <MenuItem active> Главная </MenuItem>
            <MenuItem> <OrganizationsMenu/> </MenuItem>
            <MenuItem href="#"> Войти </MenuItem>
            <MenuItem href="#"> Зарегистрироваться </MenuItem>

        </Sidebar>
    );
}