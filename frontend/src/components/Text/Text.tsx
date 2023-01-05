import styled from 'styled-components';
import { colors } from '../../theme';
export const Text = styled.div`
  font-size: 1rem;
`;

export const BoldText = styled(Text)`
  color: ${colors.primary};
  font-weight: bold;
`;

export const SmallText = styled(Text)`
  font-size: 0.8rem;
`;
