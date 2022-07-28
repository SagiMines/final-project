export const navSlidersData = () => {
  return {
    hamburger: {
      state: false,
      collapseState: false,
      name: 'hamburger',
      collapseName: 'hamburger-collapse',
      sections: ['Categories', 'Account', 'Cart', 'Wishlist'],
    },
    user: {
      state: false,
      name: 'user',
      sections: ['Register', 'Log in'],
    },
    categories: {
      state: false,
      collapseState: false,
      name: 'categories',
      collapseName: 'categories-collapse',
      sections: [
        'Drills',
        'Impact Drivers',
        'Heat Guns',
        'Saws',
        'Good-To-Have-Kits',
        'Batteries',
        'Screws & Anchors',
      ],
    },
  };
};
