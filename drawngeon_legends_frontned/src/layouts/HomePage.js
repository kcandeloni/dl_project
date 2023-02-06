import styled from "styled-components";
import fogueira from "../assets/images/fogueira.png";
import Page from "../components/common/Page";

export default function HomePage({ children }) {
  return (
    <Page background={`url(${fogueira})`}>
      <StyledContainer width="1040px" height="680px">
        {children}
      </StyledContainer>
    </Page>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
  
  & > * {
    text-align: initial;
  }

`;
