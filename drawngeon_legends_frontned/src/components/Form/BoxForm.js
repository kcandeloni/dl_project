import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 8px 0;
  p{
    color: var(--error);
    font-size: 0.75rem;
    margin-top: 8px;
  }
  label{
    font-size: 16px;
  }
  input {
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: var(--backgroundDark);
    color: var(--textInput);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  input::placeholder {
    color: var(--placeholder);
  }
`;
