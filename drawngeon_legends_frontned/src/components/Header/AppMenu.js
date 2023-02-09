import styled from "styled-components";

import { GiWhiteBook } from "react-icons/gi";

export default function AppMenu() {
  return (
    <>
      <StyledBookMenu />
    </>
  );
}

const StyledBookMenu = styled(GiWhiteBook)`
  color: var(--icon);
  font-size: 28px;
  cursor: pointer;
`;
