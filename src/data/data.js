export const navSlidersData = () => {
  return {
    // hamburger: {
    //   state: false,
    //   collapseState: false,
    //   name: 'hamburger',
    //   collapseName: 'hamburger-collapse',
    //   sections: {
    //     disconnected: [
    //       'Categories',
    //       { name: 'Cart', route: 'shopping-cart' },
    //       { name: 'Wishlist', route: 'wishlist' },
    //       { name: 'Log In', route: 'login' },
    //     ],
    //     connected: [
    //       'Account',
    //       'Categories',
    //       { name: 'Cart', route: 'shopping-cart' },
    //       { name: 'Wishlist', route: 'wishlist' },
    //     ],
    //   },
    // },
    // user: {
    //   hamburgerState: false,
    //   state: false,
    //   name: 'user',
    //   hamburgerName: 'account',
    //   collapseName: 'account-collapse',
    //   collapseState: false,
    //   sections: {
    //     disconnected: [
    //       { name: 'Register', route: 'register' },
    //       { name: 'log In', route: 'login' },
    //     ],
    //     connected: [
    //       { name: 'My Details', route: 'my-account' },
    //       { name: 'My Orders', route: 'my-orders' },
    //       'Log Out',
    //     ],
    //   },
    // },
    // categories: {
    //   state: false,
    //   collapseState: false,
    //   name: 'categories',
    //   collapseName: 'categories-collapse',
    // },
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

export const companiesLogosLinks = () => {
  return [
    'https://lh3.googleusercontent.com/pw/AL9nZEVxvDvxOtMGVBxfXt_0wOVzdI37Tpq39Su4QxqsODD-JLt9XGYw1o61HCVPy0fCu60Z9G2DQqpDgMHmgjwkhUNXwXgZcHhOqpeTtbSCAbfm5re2QfCt8VnHo-zuaAccOMjnPSpOm35e0eio5Xwn-dyD=s250-no?authuser=1',
    'https://lh3.googleusercontent.com/pw/AL9nZEXao7ubbQpM3Sbo751qExKkbD_cqBHGgwJhWPzk8kzopwnOtcoCeX380LP5kkJVDU-JoXaxRcPn-y5gsGTjQfQA0ctE104Cf0GbikGNjMzsFFId1mN0Q_1129yMVH_MOyxWiJrBeOOhbhqSqSS5oxXV=s250-no?authuser=1',
    'https://lh3.googleusercontent.com/pw/AL9nZEXfbHitcWGJQ-uSeYjIq1g-KXmJ0djrcgtc4bRG1z8w1eTZ2DUCRFrpHgOS-vNAVAX6yw6YtXg_c52XCjERrxYC1DzElXNpaSkads7lZmEqPHdp9KkDjN3BJPGba5Kp4ECtY2oFsMUxvO2toaUadkwg=s250-no?authuser=1',
    'https://lh3.googleusercontent.com/pw/AL9nZEVDURery2mHWErCLDvaWinPEMSicr_nCtvD7V3fIbuOm7Duvep9dqemTTJtSMOOAqklBWCqzF5L1cOc8gHwJOCa1lmjInWmPwwFziVdjRaGn-QgspDVhFfPE3bXqQ9puEx9fZtkvkWQW8Jg9O29Ju9F=s250-no?authuser=1',
    'https://lh3.googleusercontent.com/pw/AL9nZEV5lsk7Tri13GpBdKxneUqxlbTpYABUt5jeLVbCGZgZhb6MZBJ74Uv7wbTKjWTW7kEBS5A6pYdOiyn87VYRqwvzj6JM8qX68TYDAdTrEYfSH4ZgIfmk_2hJEpzZFsYhzl6MfVF9QtIAzWmasa4Mj_dk=s250-no?authuser=1',
    'https://lh3.googleusercontent.com/pw/AL9nZEVCV4MwYVu87Sv3nP0R0GGi6GxmQtscrCY1WqpR3FJks4gUNcG_-_OVDA_-xzSwgqqRldo43OTKL5-q9jseFry344XKsMA-NT4UcgxIdeLzs9_JP6_tMN9xbwzM5drUQxyYv3mEjiPBI2BEpTNXoyL2=s250-no?authuser=1',
    'https://lh3.googleusercontent.com/pw/AL9nZEVDBSpZIAMroOKcjy1ftmX5W7TWuLjqUvFoO2NtDuk56UNErG1ZewjbCPyQnxb7Z_qZg3hbNkr8soeegRQP6vqCgzeTY5Ukh99_xF6Q31vo5QHWXjy6H52MiMQizPQZmnCaTz7r0pXaB4aOvSEOfgyE=s250-no?authuser=1',
    'https://lh3.googleusercontent.com/pw/AL9nZEXXZ8zgYQ7ENtYmuDnuUBmY_Omq5ju3RpiaUP3RiFuCMjs1vknRf-qC3dX7lwA_0GC_NUj3Zln8c9bqo1XrDqhqdIarmf9UACz89h0fEg-LklnoKruRsZuVlyNfgU_yV4c4F0v0OOhAJSbBBr1RlbFL=s250-no?authuser=1',
  ];
};

export const contactUsFormDetails = () => [
  {
    label: 'Full Name',
    name: 'fullName',
    type: 'text',
    placeholder: 'Full name',
  },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'Email' },
  { label: 'Subject', name: 'subject', type: 'text', placeholder: 'Subject' },
  {
    label: 'Message',
    name: 'message',
    placeholder: 'Message',
    textArea: true,
  },
];
