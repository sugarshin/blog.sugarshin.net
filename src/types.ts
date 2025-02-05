export type Frontmatter = {
  title: string;
  date: string;

  // TODO:
  description?: string;
  public: boolean;
  author: {
    name: string;
    url: string;
  };
  tags: string; // joind with ', '
  ogp: {
    og: {
      image: {
        src: string;
      };
    };
  };
};

export type SideMenuArticleListItem = {
  title: string;
  path: string;
};

export type ArticleListItem = {
  title: string;
  date: string;
  path: string;
  tags: string[];
  author: {
    name: string;
    url: string;
  };
  beginning: string;
};
