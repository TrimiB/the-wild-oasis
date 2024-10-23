import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

/**
 * Renders a form row with a label, input, and optional error message.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.labelText='Please add lable-text'] - The text to display for the label.
 * @param {string} [props.errorMessage] - The error message to display, if any.
 * @param {React.ReactNode} props.children - The input or other form element to render in the row.
 * @returns {React.ReactElement} - The rendered form row.
 */

function FormRow({ labelText, errorMessage, children }) {
  return (
    <StyledFormRow>
      {labelText && <Label htmlFor={children.props?.id}>{labelText}</Label>}
      {children}
      {errorMessage && <Error>{errorMessage}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
