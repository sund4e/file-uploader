import styled from 'styled-components';
import { colors, spacing } from '../../theme';
export const HorizontalBox = styled.div<{ border?: boolean; active?: boolean }>`
  border: ${(props) =>
    props.border
      ? `${props.active ? '0.2rem' : '0.1rem'} ${
          props.active ? colors.primary : colors.secondary
        } solid`
      : 'none'};
  padding: ${spacing}rem;
  border-radius: 0.5rem;
  display: flex;
  margin: ${spacing}rem;
  justify-content: center;
`;

export const VerticalBox = styled(HorizontalBox)`
  flex-direction: column;
  align-items: center;
`;
