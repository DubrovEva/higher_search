import {
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu, FormButton,
    ItemImage,
    Menu,
    MenuItem, MenuMenu, Sidebar
} from "semantic-ui-react";
import React from "react";
import hs_logo from "../assets/logo.png?url";
import {useNavigate} from "react-router-dom";
import Client from "~/client";

export function FixedMenu() {
    const logout = async () => {
        await Client.getInstance().logout()
        window.location.href = "/"
    }

    return (
        <Menu fixed="top" inverted>
            <Container>
                <MenuItem href="/">
                    <img className="logo" src={hs_logo}/>
                    Higher Search
                </MenuItem>
                <MenuItem> <OrganizationsMenu/> </MenuItem>

                <MenuMenu position="right">
                    <MenuItem>
                    <FormButton  inverted basic onClick={logout}> Выйти</FormButton>
                    </MenuItem>
                </MenuMenu>
            </Container>

        </Menu>
    );
}

export function OrganizationsMenu() {
    return (
        <Dropdown text={"Меню"} simple>
            <DropdownMenu>
                <DropdownItem href="/list" active> Полный список </DropdownItem>
                <DropdownItem href="/search"> Расширенный поиск </DropdownItem>
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