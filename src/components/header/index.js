import React from "react";
import styles from "./index.module.css";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import LogoutBtn from "../logoutBtn";
import { useAuthContext } from "../../context/authContext";
import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";

function Header() {
  const { user } = useAuthContext();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>theTodoApp Project</h1>
        {!user.id ? (
          <Avatar bg="gray.500" />
        ) : (
          <Menu enabled="false">
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              style={{ padding: "10px", height: "55px", margin: "0" }}
            >
              <div className={styles.userArea}>
                <Avatar
                  bg={user.name ? "green.500" : "gray.500"}
                  style={{ margin: "0" }}
                />
                <span>{user.name || "Guest"}</span>
              </div>
            </MenuButton>
            <MenuList>
              <MenuGroup title={"User: " + user.name}>
                <MenuItem>My Account</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Actions">
                <MenuItem>
                  <LogoutBtn />
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
      </nav>
    </header>
  );
}

export default Header;
