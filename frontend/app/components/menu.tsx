import {
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu, FormButton,
    ItemImage,
    Menu,
    MenuItem, MenuMenu, Sidebar
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import hs_logo from "../assets/logo.png?url";
import {useNavigate} from "react-router-dom";
import Client from "~/client";
import {AuthInfo} from "~/proto/models/user";

export function FixedMenu(params: {authInfo: AuthInfo}) {

    return (
        <Menu fixed="top" inverted>
            <Container>
                <MenuItem href="/">
                    <img className="logo" src={hs_logo}/>
                    Higher Search
                </MenuItem>
                <MenuItem> <OrganizationsMenu authInfo={params.authInfo}/> </MenuItem>

                <MenuMenu position="right">
                    <MenuItem>
                    <AccountButton authInfo={params.authInfo}/>
                    </MenuItem>
                </MenuMenu>
            </Container>

        </Menu>
    );
}

function AccountButton(params: {authInfo: AuthInfo}) {
    const account = async () => {
        window.location.href = "/user/" + params.authInfo.userID?.iD
    }
    const login = async () => {
        window.location.href = "/login"
    }

    if (params.authInfo.isAuth) {
        return <FormButton inverted basic onClick={account}> Личный кабинет </FormButton>
    } else {
        return <FormButton inverted basic onClick={login}> Войти </FormButton>
    }
}

export function OrganizationsMenu(params: {authInfo: AuthInfo}) {
    return (
        <Dropdown text={"Меню"} simple>
            <DropdownMenu>
                <DropdownItem href="/list" active> Полный список </DropdownItem>
                <DropdownItem href="/search"> Поиск </DropdownItem>
                {params.authInfo.isAuth && <DropdownItem href="/studorg/create"> Новая организация </DropdownItem>}
            </DropdownMenu>
        </Dropdown>
    )
}

export function SidebarMenu(props: {visible: boolean} = {visible: false}) {
    return (
        <Sidebar as={Menu} vertical inverted visible={props.visible}>
            <MenuItem>
                <ItemImage src={hs_logo} size={"tiny"}/>
            </MenuItem>
            <MenuItem active> Главная </MenuItem>
            <MenuItem> <OrganizationsMenu authInfo={AuthInfo.create()}/> </MenuItem>
            <MenuItem href="#"> Войти </MenuItem>
            <MenuItem href="#"> Зарегистрироваться </MenuItem>

        </Sidebar>
    );
}

export function FixedMenuForAccount(params: {authInfo: AuthInfo}) {
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
                <MenuItem> <OrganizationsMenu authInfo={params.authInfo}/> </MenuItem>

                <MenuMenu position="right">
                    <MenuItem>
                        <FormButton inverted basic onClick={logout}> Выйти </FormButton>
                    </MenuItem>
                </MenuMenu>
            </Container>

        </Menu>
    );
}

