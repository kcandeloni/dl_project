import styled from "styled-components";
import logo from "../../assets/images/dl_logo.png";

export default function Logo(size = "default") {
  return (
    <StyledLogo size={size} src={logo} alt={"drawngeon legends logo"} />
  );
}

const StyledLogo = styled.img`
  width: 90px;
  height: 70px;
  cursor: pointer;
 ${(props) => {
    if (props.size === "small") {
      return `
        width: 60px;
        height: 50px;
      `;
    }
    if (props.size === "large") {
      return `
        width: 120px;
        height: 100px;
      `;
    }
  }}
`;
