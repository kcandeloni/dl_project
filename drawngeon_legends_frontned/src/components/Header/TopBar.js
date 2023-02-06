import ContainerTopBar from "./ContainerTopBar";
import AppMenu from "./AppMenu";
import UserMenu from "./UserMenu";
import Logo from "../common/Logo";

export function TopBar() {
  return (
    <ContainerTopBar>
      <AppMenu />
      <Logo />
      <UserMenu />
    </ ContainerTopBar>
  );
}
