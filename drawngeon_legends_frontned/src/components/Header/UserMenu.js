import styled from "styled-components";
import { BsPerson } from "react-icons/bs";

import { colorSchema } from "../common/themes";

export default function UserMenu() {
  return (
    <>
      <StyledBookMenu color={colorSchema.icon} />
    </>
  );
}

const StyledBookMenu = styled(BsPerson)`
  color: ${props => props.color};
  font-size: 28px;
  cursor: pointer;
`;
