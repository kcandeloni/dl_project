import { Link } from "react-router-dom";
import styled from "styled-components";

export default styled(Link)`
  text-decoration: none;
  color: #f7b10a;
  margin: 4px auto;
  &:hover {
    text-decoration: underline;
  }
`;
