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
