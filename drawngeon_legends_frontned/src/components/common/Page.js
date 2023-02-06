import styled from "styled-components";

export default styled.div`
    background: ${props => props.background};
    background-size: cover;
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
