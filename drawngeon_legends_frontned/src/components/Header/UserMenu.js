import styled from "styled-components";
import { BsPerson } from "react-icons/bs";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function UserMenu() {
  const { userData } = useContext(UserContext);
  console.log(userData);
  return (
    <>
      <StyledBookMenu />
    </>
  );
}

const StyledBookMenu = styled(BsPerson)`
  color: var(--icon);
  font-size: 28px;
  cursor: pointer;
`;
