
import styled from "styled-components";

export default function CustomIcon({ children, size = 26, spin = true }) {
  return (
    <Container size={size} spin={spin}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--icon);
  ${props => {
    return `
    font-size: ${props.size}px;
    `;
  }}
  ${props => {
    if (props.spin) {
      return `
        animation: loading 1s linear infinite;
        @keyframes loading {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      `;
    }
  }}
`;
