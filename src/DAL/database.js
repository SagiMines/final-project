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
  {
    id: 4,
    category_id: 1,
    product_name: 'BOSCH Cordless Drill/Driver GSR 180-LI',
    unit_price: 120,
    units_in_stock: 50,
    description: `
• More Power. More Robust.
• Affordable: Bosch Quality at affordable price!
• Durable: Designed with Robust Housing and Battery Cell Protection!
• Highly Serviceable: Motor has changeable carbon brushes for easy maintenance and serviceability!
• Changeable Carbon Brushes: Extends the lifetime of the motor!
• Electronic Cell Protection: Protects the Tool and Battery!
• Tool Status Fee`,
    discount: null,
    publish_date: '2020-05-01',
  },
  {
    id: 5,
    category_id: 1,
    product_name: 'BLACK+DECKER 20-Volt MAX* Lithium-Ion Drill-Driver, LDX120C',
    unit_price: 60,
    units_in_stock: 100,
    description: `The BLACK+DECKER LDX120C 20-Volt MAX Lithium-Ion Cordless Drill-Driver features lithium ion technology, making it lighter and more compact. The 20-Volt MAX Lithium-Ion battery holds charges longer between use and has a longer life-cycle. The 11 position clutch provides precise control for drilling into wood, metal, plastic, and all screwdriving tasks. Compact and lightweight means less fatigue and allows users to drill or screw in confined spaces. Variable speed allows countersinking without damaging material. Anti-slip soft grip provides comfort when using the drill.`,
    discount: 40,
    publish_date: '2021-01-01',
  },
  {
    id: 6,
    category_id: 1,
    product_name: 'RIDGID 18V SubCompact Brushless 1/2 in. Drill/Driver Ki',
    unit_price: 100,
    units_in_stock: 18,
    description: `RIDGID introduces the 18V SubCompact Brushless 1/2 in. Drill/Driver Kit. RIDGID SubCompact tools offer optimized ergonomics and power in a lightweight form. This drill/driver is 30% less weight to reduce fatigue and allow you to complete the job at hand. The Brushless Motor offers more runtime and longer motor life. This SubCompact 18V 2-Speed Drill/Driver Kit features all metal gears for added durability on the jobsite or at home. All RIDGID SubCompact tools are 100% compatible with all RIDGID 18V batteries and tools. With registration, this kit is backed by the Industry's Only Lifetime Service Agreement. The RIDGID Drill/Driver kit includes a 2.0 Ah Lithium-Ion Battery, an 18V Charger, a double-ended bit, tool bag and an operator's manual.`,
    discount: 10,
    publish_date: '2019-09-21',
  },
  {
    id: 7,
    category_id: 1,
    product_name:
      'Ryobi P208 One+ 18V Lithium Ion Drill/Driver with 1/2 Inch Keyless Chuck',
    unit_price: 70,
    units_in_stock: 0,
    description: `The motorized drill / driver is the staple item in anyone’s tool collection. From the DIYer to the professional contractor, the drill / driver provides utility unsurpassed by almost every other power tool on the market. Ryobi’s P208 is one such drill driver, specialized for the hardworking homeowner, that really packs a punch for its price point. On top of being lightweight and easy to handle, it’s compatible with any Ryobi 18V Lithium Ion or NiCad battery (P100, P101, P102, P103, P104, P105, P107, P108), so it can work right out of the box assuming you have another Ryobi One+ tool already in use. It has a phillips head drill bit attached to the base, giving you all you need to drive common fasteners. Bit changes are easy with the keyless chuck system, too. You can work with a variety of bits on different applications, both delicate and powerful. The P208’s diverse abilities come from its variable speed gearbox (offering 2 speeds) and 24 position clutch. With the magnetic fastener or bit holder attached to the base of the tool, you can be sure to get into those hard-to-reach places to drive fasteners without worrying about losing them while you focus on the job at hand. Ryobi means reliable, and the P208 drill / driver is no exception.`,
    discount: null,
    publish_date: '2019-07-05',
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
  {
    id: 10,
    product_id: 4,
    image_src:
      'https://mysupply.me/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/1/1/111111.png',
  },
  {
    id: 11,
    product_id: 4,
    image_src:
      'https://mysupply.me/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/2/2/22222222.jpg',
  },
  {
    id: 12,
    product_id: 4,
    image_src:
      'https://mysupply.me/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/3/3/3333333.png',
  },
  {
    id: 13,
    product_id: 5,
    image_src:
      'https://i5.walmartimages.com/asr/17010756-614a-4cf0-9015-d7323207a519_1.37f8d79c92bf8b7cae866ec1ef15d02c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
  },
  {
    id: 14,
    product_id: 5,
    image_src:
      'https://i5.walmartimages.com/asr/e845ad6d-ac56-475c-887e-525610980ea0_1.33414ce7e13b2011f34f50ac4eb75cb4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
  },
  {
    id: 15,
    product_id: 6,
    image_src:
      'https://cdn2.ridgid.com/resources/images/f1fcdd6e-8f78-449e-b494-ec3b2247494e',
  },
  {
    id: 15,
    product_id: 6,
    image_src:
      'https://cdn2.ridgid.com/resources/images/c515577f-b0d0-496b-be4f-c3b1cc9532c5',
  },
  {
    id: 16,
    product_id: 7,
    image_src:
      'https://m.media-amazon.com/images/I/81fAxch2KfL._AC_SL1500_.jpg',
  },
  {
    id: 17,
    product_id: 7,
    image_src:
      'https://m.media-amazon.com/images/I/81wR1Q-KfPL._AC_SL1500_.jpg',
  },
  {
    id: 18,
    product_id: 7,
    image_src:
      'https://m.media-amazon.com/images/I/81759o4YrZL._AC_SL1500_.jpg',
  },
];

export const getProducts = () => {
  return products;
};

export const getProductImages = () => {
  return productImages;
};

export const getCategories = () => {
  return categories;
};
