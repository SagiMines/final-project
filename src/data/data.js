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
    search: {
      value: '',
      state: false,
      collapseState: false,
      name: 'search',
      collapseName: 'search-collapse',
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

export const companiesLogosNames = () => {
  return [
    'bosch',
    'dewalt',
    'greenworks',
    'hunter',
    'makita',
    'milwaukee',
    'ryobi',
  ];
};

export const contactUsFormDetails = () => [
  {
    label: 'Full Name',
    name: 'Full Name',
    type: 'text',
    placeholder: 'Full name',
  },
  { label: 'Email', name: 'Email', type: 'email', placeholder: 'Email' },
  { label: 'Subject', name: 'Subject', type: 'text', placeholder: 'Subject' },
  {
    label: 'Message',
    name: 'Message',
    placeholder: 'Message',
    textArea: true,
  },
];
