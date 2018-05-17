import { createLogger } from 'redux-logger';

export default () =>
  createLogger({
    collapsed: true,
    colors: {
      title: ({ type = '' } = {}) => {
        const start = type.startsWith('REQUEST') || type.startsWith('FETCH');
        const success = type.startsWith('RECEIVE') || type.endsWith('SUCCESS');
        const failure =
          type.startsWith('NOT_RECEIVE') || type.endsWith('FAILURE');

        if (success) {
          return '#4CAF50';
        }

        if (failure) {
          return '#F20404';
        }

        if (start) {
          return '#BCB12A';
        }

        return;
      },
      prevState: () => '#9E9E9E',
      action: () => '#03A9F4',
      nextState: () => '#4CAF50',
      error: () => '#F20404'
    }
  });
