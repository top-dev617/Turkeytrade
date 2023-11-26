const Category = require("./category.model");

// const getCateSlug = async (slug) => {
//   const slug = await Category.findOne({ cate_slug: slug }).select("cate_slug");
//   if (slug) {
//     const split = slug?.cate_slug?.split("-");
//   }else{
//     return `${slug}-`
//   }
// };

// [
//   {
//     cate_name: "Textiles Home and Industrial Textiles",
//     cate_slug: "textiles-home-and-industrial-textiles-1",
//     status: true,
//   },
//   {
//     cate_name: "Furniture, Bedding, and Lighting",
//     cate_slug: "furniture,-bedding,-and-lighting-2",
//     status: true,
//   },
//   {
//     cate_name: "Clothing and Apparel",
//     cate_slug: "clothing-and-apparel-3",
//     status: true,
//   },
//   {
//     cate_name: "Electronics",
//     cate_slug: "electronics-4",
//     status: true,
//   },
//   {
//     cate_name: "Beverages and Vinegar",
//     cate_slug: "beverages-and-vinegar-5",
//     status: true,
//   },
//   {
//     cate_name: "Health and Beauty Products",
//     cate_slug: "health-and-beauty-products-6",
//     status: true,
//   },
//   {
//     cate_name: "Vehicles and Mechanics",
//     cate_slug: "vehicles-and-mechanics-7",
//     status: true,
//   },
//   {
//     cate_name: "Machinery and Equipment",
//     cate_slug: "machinery-and-equipment-8",
//     status: true,
//   },
//   {
//     cate_name: "Iron, Steel & Aluminium",
//     cate_slug: "iron,-steel-&-aluminium-9",
//     status: true,
//   },
//   {
//     cate_name: "Building Materials",
//     cate_slug: "building-materials-10",
//     status: true,
//   },
//   {
//     cate_name: "Plastics and Plastic Products",
//     cate_slug: "plastics-and-plastic-products-11",
//     status: true,
//   },
//   {
//     cate_name: "Paper and Paper Products",
//     cate_slug: "paper-and-paper-products-12",
//     status: true,
//   },
//   {
//     cate_name: "Rubber and Rubber Products",
//     cate_slug: "rubber-and-rubber-products-13",
//     status: true,
//   },
//   {
//     cate_name: "Ceramics and Glassware",
//     cate_slug: "ceramics-and-glassware-14",
//     status: true,
//   },
//   {
//     cate_name: "Mining, Stones, and Minerals",
//     cate_slug: "mining,-stones,-and-minerals-15",
//     status: true,
//   },
//   {
//     cate_name: "Refined Oil and Fuel Products",
//     cate_slug: "refined-oil-and-fuel-products-16",
//     status: true,
//   },
//   {
//     cate_name: "Chemical Products",
//     cate_slug: "chemical-products-17",
//     status: true,
//   },
//   {
//     cate_name: "Optical, Photographic, and Medical Instruments",
//     cate_slug: "optical,-photographic,-and-medical-instruments-18",
//     status: true,
//   },
// ];

[
  {
    cate_name: "Textiles Home and Industrial Textiles",
    cate_slug: "textiles-home-and-industrial-textiles-1",
    status: true,
  },
  {
    cate_name: "Furniture, Bedding, and Lighting",
    cate_slug: "furniture,-bedding,-and-lighting-2",
    status: true,
  },
  {
    cate_name: "Clothing and Apparel",
    cate_slug: "clothing-and-apparel-3",
    status: true,
  },
  {
    cate_name: "Electronics",
    cate_slug: "electronics-4",
    status: true,
  },
  {
    cate_name: "Beverages and Vinegar",
    cate_slug: "beverages-and-vinegar-5",
    status: true,
  },
  {
    cate_name: "Health and Beauty Products",
    cate_slug: "health-and-beauty-products-6",
    status: true,
  },
  {
    cate_name: "Vehicles and Mechanics",
    cate_slug: "vehicles-and-mechanics-7",
    status: true,
  },
  {
    cate_name: "Machinery and Equipment",
    cate_slug: "machinery-and-equipment-8",
    status: true,
  },
  {
    cate_name: "Iron, Steel & Aluminium",
    cate_slug: "iron,-steel-&-aluminium-9",
    status: true,
  },
  {
    cate_name: "Building Materials",
    cate_slug: "building-materials-10",
    status: true,
  },
  {
    cate_name: "Plastics and Plastic Products",
    cate_slug: "plastics-and-plastic-products-11",
    status: true,
  },
  {
    cate_name: "Paper and Paper Products",
    cate_slug: "paper-and-paper-products-12",
    status: true,
  },
  {
    cate_name: "Rubber and Rubber Products",
    cate_slug: "rubber-and-rubber-products-13",
    status: true,
  },
  {
    cate_name: "Ceramics and Glassware",
    cate_slug: "ceramics-and-glassware-14",
    status: true,
  },
  {
    cate_name: "Mining, Stones, and Minerals",
    cate_slug: "mining,-stones,-and-minerals-15",
    status: true,
  },
  {
    cate_name: "Refined Oil and Fuel Products",
    cate_slug: "refined-oil-and-fuel-products-16",
    status: true,
  },
  {
    cate_name: "Chemical Products",
    cate_slug: "chemical-products-17",
    status: true,
  },
  {
    cate_name: "Optical, Photographic, and Medical Instruments",
    cate_slug: "optical,-photographic,-and-medical-instruments-18",
    status: true,
  },
];
