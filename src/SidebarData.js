import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'User',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text',
    nonceName: 'user',
    subTitles: [
      { title: 'My Details', path: '/my-account' },
      { title: 'My Orders', path: '/my-orders' },
      { title: 'Log Out' },
    ],
  },
  {
    title: 'Tool Categories',
    icon: <AiIcons.AiFillTool />,
    cName: 'nav-text',
    nonceName: 'categories',
    subTitles: [
      { title: 'Drills', path: '/categories/1' },
      { title: 'Impact Drivers', path: '/categories/2' },
      { title: 'Heat Guns', path: '/categories/3' },
      { title: 'Saws', path: '/categories/4' },
      { title: 'Good-To-Have-Kits', path: '/categories/5' },
      { title: 'Batteries', path: '/categories/6' },
      { title: 'Screws & Anchors', path: '/categories/7' },
    ],
  },
  {
    title: 'Cart',
    path: '/shopping-cart',
    icon: <IoIcons.IoMdCart />,
    cName: 'nav-text',
  },
  {
    title: 'Wishlist',
    path: '/wishlist',
    icon: <FaIcons.FaHeart />,
    cName: 'nav-text',
  },
];
