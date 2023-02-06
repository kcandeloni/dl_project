import styled from "styled-components";
import fogueira from "../assets/images/fogueira.jpg";
import Page from "../components/common/Page";

export default function HomePage({ children }) {
  return (
    <Page background={`url(${fogueira})`}>
      <StyledContainer>
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
`;
