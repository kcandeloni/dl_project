import styled from "styled-components";

import { GiWhiteBook } from "react-icons/gi";

import { colorSchema } from "../common/themes";

export default function AppMenu() {
  return (
    <>
      <StyledBookMenu color={colorSchema.icon} />
    </>
  );
}

const StyledBookMenu = styled(GiWhiteBook)`
  color: ${props => props.color};
  font-size: 28px;
  cursor: pointer;
`;
