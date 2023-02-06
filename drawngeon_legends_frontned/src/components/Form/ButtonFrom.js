import styled from "styled-components";

export default function Button({ variant = "contained", children, ...props }) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled.div`
  margin: 12px auto;
  font-size: 16px;
  text-align: center;
  background: rgba(0,0,0,.2);
  border: 1px solid #f7b10a;
  color: #f7b10a;
  text-transform: uppercase;
  -webkit-transition: all .2s,color .2s;
  transition: all .2s,color .2s;
  cursor: pointer;
  &:hover{
    background-color:#b0682a;
    border-color: #b0682a;
  }
  border-radius: 5px;
  padding: 12px;
`;
