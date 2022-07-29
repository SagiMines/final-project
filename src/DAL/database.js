const categories = [
  { id: 1, category_name: 'Drills' },
  { id: 2, category_name: 'Impact Drivers' },
];
const products = [
  {
    id: 1,
    category_id: 1,
    product_name: 'DeWalt DCD999 Hammer Drill',
    unit_price: 250,
    units_in_stock: 15,
    description:
      'Take advantage of more power with the 20V MAX* brushless tools with DEWALT® FLEXVOLT ADVANTAGE™ tool technology. This 1/2 in. Cordless Hammer Drill has up to 42% more power when paired with a DCB606 FLEXVOLT® Battery vs. a DCB205 20V MAX* 5.0Ah Battery. Battery and charger sold separately.',
    discount: null,
    publish_date: '2021-07-07',
  },
  {
    id: 2,
    category_id: 2,
    product_name: 'Makita LXT BL Impact Driver',
    unit_price: 190,
    units_in_stock: 6,
    description:
      'Makita has a legacy of innovation in the cordless impact driver category, and the 18V LXT® Brushless 4-Speed Impact Driver (XDT16Z) sets new standards. The XDT16Z offers users four speeds, as well as Makita’s exclusive Quick-Shift Mode™ for increased fastening control. Quick-Shift Mode™ uses the brushless motor’s electronic controls to find the best balance of speed and torque for each application for more efficient fastening. Another precision setting is Tightening Mode (T-mode), which downshifts and reduces rotation and impact speed prior to driving the screw into place, and is engineered to minimize screw thread stripping, screw breakage and damage to work. The XDT16Z delivers industry-leading performance in a compact and ergonomic design.',
    discount: 10,
    publish_date: '2020-01-21',
  },
  {
    id: 3,
    category_id: 1,
    product_name: 'Milwaukee M18 BL Hammer Drill',
    unit_price: 330,
    units_in_stock: 20,
    description:
      "The M18 FUEL™ ½” Hammer Drill is the Industry's Most Powerful Drill by delivering Up to 60% More Power, Up To 1.5” Shorter length and Up To 2X Faster Speed Under Heavy Load. The POWERSTATE™ Brushless motor delivers 1,200 in-lbs of torque and 2,000 RPMs, providing fast drilling through demanding applications. ",
    discount: null,
    publish_date: '2022-01-01',
  },
];

const productImages = [
  {
    id: 1,
    product_id: 3,
    image_src:
      'https://www.milwaukeetool.com/-/media/Products/Power-Tools/Cordless/Drills/2804-20_1.png?mh=520&mw=520&hash=AE3622694F0579295DE37C1F4BC89010',
  },
  {
    id: 2,
    product_id: 2,
    image_src: 'https://www.koretzki.co.il/images/itempics/20200.jpg',
  },
  {
    id: 3,
    product_id: 1,
    image_src:
      'http://www.tooled-up.com/artwork/prodzoom/DEW-DCD999-DeWalt-18v-Flexvolt-Advantage-Combi-Hammer-Drill.jpg',
  },
  {
    id: 4,
    product_id: 3,
    image_src:
      'https://www.milwaukeetool.com/-/media/Products/Power-Tools/Cordless/Drills/2804-20_2.png?mh=520&mw=520&hash=7FED43B0F52F3E41E035041770243CF9',
  },
  {
    id: 5,
    product_id: 1,
    image_src:
      'https://www.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/DCD999B/DCD999B_5.jpg?resize=530x530',
  },
  {
    id: 6,
    product_id: 1,
    image_src:
      'https://www.dewalt.co.uk/EANZ/PRODUCT/IMAGES/3000x3000x96//DCD999T1/DCD999T1_3.jpg?resize=600x600',
  },
  {
    id: 7,
    product_id: 2,
    image_src:
      'https://d1mv2b9v99cq0i.cloudfront.net/eyJidWNrZXQiOiJ3ZWItbmluamEtaW1hZ2VzIiwia2V5IjoidG9vbHNoZWRcL2ltYWdlc1wvcHJvZGltZ1wvMTQ1MTNfMS5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjcwMCwiaGVpZ2h0Ijo3MDAsImZpdCI6Imluc2lkZSIsIndpdGhvdXRFbmxhcmdlbWVudCI6dHJ1ZX19LCJ2ZXJzaW9uIjoiM2U2ZWEwYTgwMDk3MzJhYzQyYmI1Y2M2OGI3OTU3MDM5ZjkyZmRlZSJ9',
  },
  {
    id: 8,
    product_id: 2,
    image_src:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS0mFPcjTh5i-Xdv2SCr4dQdV5FW_pdw30Gpoz360jJlHUeTCxKZNKC6TWue9lYudOTa9NZdn9MvvyjfvIIJWO1WjMKbNaMr2jbeyjnNui6k8ZoswszGVNVdA&usqp=CAE',
  },
  {
    id: 9,
    product_id: 3,
    image_src: 'https://m.media-amazon.com/images/I/81+dPS2TovL._AC_SS450_.jpg',
  },
];

export const getProducts = () => {
  return products;
};

export const getProductImages = () => {
  return productImages;
};
