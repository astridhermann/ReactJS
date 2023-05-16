import { HomeIcon, TagIcon } from "@heroicons/react/24/outline";

export const navData = [
  {
    id: 0,
    icon: <HomeIcon width="20" />,
    text: "Home",
    link: "/",
  },
  {
    id: 1,
    icon: <TagIcon width="20" />,
    text: "Products",
    link: "/products",
  },
  {
    id: 2,
    icon: <TagIcon width="20" />,
    text: "Brand",
    link: "/brands/add",
  },
  {
    id: 3,
    icon: <TagIcon width="20" />,
    text: "Categories",
    link: "/categories/add",
  },
];
