import { CMA1_ESSAYS } from './cma1-essays';
import { CMA1_ESSAYS_EXTENDED } from './cma1-essays-extended';
import { CMA2_ESSAYS } from './cma2-essays';
import { CMA2_ESSAYS_EXTENDED } from './cma2-essays-extended';
import { CMA_ESSAYS_ADDITIONAL } from './cma-essays-additional';
import { WCTask } from '../../../types';

export { CMA1_ESSAYS } from './cma1-essays';
export { CMA1_ESSAYS_EXTENDED } from './cma1-essays-extended';
export { CMA2_ESSAYS } from './cma2-essays';
export { CMA2_ESSAYS_EXTENDED } from './cma2-essays-extended';
export { CMA_ESSAYS_ADDITIONAL } from './cma-essays-additional';

// Combined by part (base + extended + additional)
const ADDITIONAL_CMA1 = CMA_ESSAYS_ADDITIONAL.filter(e => e.section === 'CMA1');
const ADDITIONAL_CMA2 = CMA_ESSAYS_ADDITIONAL.filter(e => e.section === 'CMA2');

export const CMA1_ALL_ESSAYS: WCTask[] = [...CMA1_ESSAYS, ...CMA1_ESSAYS_EXTENDED, ...ADDITIONAL_CMA1];
export const CMA2_ALL_ESSAYS: WCTask[] = [...CMA2_ESSAYS, ...CMA2_ESSAYS_EXTENDED, ...ADDITIONAL_CMA2];

export const CMA_ESSAYS: WCTask[] = [
  ...CMA1_ALL_ESSAYS,
  ...CMA2_ALL_ESSAYS
];

export const getEssaysByPart = (part: '1' | '2'): WCTask[] => {
  return part === '1' ? CMA1_ALL_ESSAYS : CMA2_ALL_ESSAYS;
};
