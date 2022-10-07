import { getReq } from '../DAL/serverData';

// const getCategories = async () => {
//   return await getReq('categories');
// };

export const navSlidersData = () => {
  return {
    hamburger: {
      state: false,
      collapseState: false,
      name: 'hamburger',
      collapseName: 'hamburger-collapse',
      sections: {
        disconnected: [
          'Categories',
          { name: 'Cart', route: 'shopping-cart' },
          { name: 'Wishlist', route: 'wishlist' },
        ],
        connected: [
          { name: 'Account', route: 'my-account' },
          'Categories',
          { name: 'Cart', route: 'shopping-cart' },
          { name: 'Wishlist', route: 'wishlist' },
        ],
      },
    },
    user: {
      state: false,
      name: 'user',
      sections: {
        disconnected: [
          { name: 'Register', route: 'register' },
          { name: 'log In', route: 'login' },
        ],
        connected: [
          { name: 'My Account', route: 'my-account' },
          { name: 'My Orders', route: 'my-orders' },
          'Log Out',
        ],
      },
    },
    categories: {
      state: false,
      collapseState: false,
      name: 'categories',
      collapseName: 'categories-collapse',
    },
  };
};

export const sortByOptions = () => {
  return ['Price - high to low', 'Price - low to high', 'Newest products'];
};
