export const articles = {
  items: [],
  archives: {},
  tags: [],
  isFetching: false,
  isFetched: false,
  didInvalidate: false,
  error: null
};

export const article = {
  title: '',
  markdown: '',
  url: '',
  isFetching: false,
  didInvalidate: false,
  cache: {},
  error: null
};

export const sidebar = {
  open: false,
  docked: false
};
