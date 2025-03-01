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
  tags: string[];
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

export type TagListItem = {
  tag: string;
  forPath: string;
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

export type ArticleMeta = {
  tags: string[];
  author: {
    name: string;
    url: string;
  };
  date: string;
};
