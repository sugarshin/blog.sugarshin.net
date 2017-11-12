// Item
// {
//   date: '2016-04-30 15:00',
//   public: true,
//   tags: [],
//   title : 'Title',
//   preview: 'Preview...',
//   url :'example-article'
// }
export const articles = {
  items: [],
  archives: {},
  tags: [],
  author: {},
  isFetching: false,
  isFetched: false,
  didInvalidate: false,
  error: null,
}

export const article = {
  title: '',
  markdown: '',
  url: '',
  next: null,
  prev: null,
  isFetching: false,
  didInvalidate: false,
  cache: {},
  error: null,
}

export const sidebar = {
  open: false,
  docked: false,
}

export const searchResults = {
  totalCount: 0,
  isFetching: false,
  incomplete: false,
  items: [],
  error: null,
}
