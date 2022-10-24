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
          { name: 'Log In', route: 'login' },
        ],
        connected: [
          'Account',
          'Categories',
          { name: 'Cart', route: 'shopping-cart' },
          { name: 'Wishlist', route: 'wishlist' },
        ],
      },
    },
    user: {
      hamburgerState: false,
      state: false,
      name: 'user',
      hamburgerName: 'account',
      collapseName: 'account-collapse',
      collapseState: false,
      sections: {
        disconnected: [
          { name: 'Register', route: 'register' },
          { name: 'log In', route: 'login' },
        ],
        connected: [
          { name: 'My Details', route: 'my-account' },
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
  return [
    { title: 'Price - high to low', value: 'descending-prices' },
    { title: 'Price - low to high', value: 'ascending-prices' },
    { title: 'Newest products', value: 'newest-products' },
  ];
};
