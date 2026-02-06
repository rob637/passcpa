import { CMA1_ESSAYS } from './cma1-essays';
import { CMA2_ESSAYS } from './cma2-essays';
import { WCTask } from '../../../types';

export { CMA1_ESSAYS } from './cma1-essays';
export { CMA2_ESSAYS } from './cma2-essays';

export const CMA_ESSAYS: WCTask[] = [
  ...CMA1_ESSAYS,
  ...CMA2_ESSAYS
];

export const getEssaysByPart = (part: '1' | '2'): WCTask[] => {
  return part === '1' ? CMA1_ESSAYS : CMA2_ESSAYS;
};
