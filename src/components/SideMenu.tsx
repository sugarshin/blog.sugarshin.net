import ArchiveList from '~/components/ArchiveList';
import LinkList from '~/components/LinkList';
import RecentPostList from '~/components/RecentPostList';
import SideMenuTagList from '~/components/SideMenuTagList';
import { SideMenuArticleListItem, TagListItem } from '~/types';

export type SideMenuData = {
  recentPosts: SideMenuArticleListItem[];
  archives: string[];
  tags: TagListItem[];
};

export default function SideMenu({ data }: { data: SideMenuData }) {
  return (
    <div className="drawer-side shadow-xs lg:mt-[2px]">
      <label
        htmlFor="main-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
        <RecentPostList posts={data.recentPosts}></RecentPostList>
        <ArchiveList archives={data.archives} className="mt-4"></ArchiveList>
        <SideMenuTagList list={data.tags} className="mt-4"></SideMenuTagList>
        <LinkList className="mt-4" />
      </div>
    </div>
  );
}
