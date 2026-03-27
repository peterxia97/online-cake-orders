export const products = [
  /* ================== 口味裱花奶油蛋糕 ================== */
  {
    id: 1,
    name: "伯爵红茶",
    category: "flavorCream",
    type: "cake", // ✅ 一定要有
    image: "/images/伯爵红茶.jpg",
    sizes: {
      6: 168,
      8: 238
    }
  },
  {
    id: 2,
    name: "抹茶",
    category: "flavorCream",
    type: "cake", // ✅ 一定要有
    image: "/images/抹茶.jpg",
    sizes: {
      6: 168,
      8: 238
    }
  },

  /* ================== 水果裱花奶油蛋糕 ================== */
  {
    id: 3,
    name: "蓝莓",
    category: "fruitCream",
    type: "cake", // ✅ 一定要有
    image: "/images/蓝莓.jpg",
    sizes: {
      6: 188,
      8: 268
    }
  },
  {
    id: 4,
    name: "葡萄",
    category: "fruitCream",
    type: "cake", // ✅ 一定要有
    image: "/images/葡萄.jpg",
    sizes: {
      6: 188,
      8: 268
    }
  },

  /* ================== 加料（Topping） ================== */
  {
    id: 101,
    name: "芒果",
    category: "topping",
    type: "topping",
    price: 12,
    image: "/images/mango.jpg"
  },
  {
    id: 102,
    name: "葡萄",
    category: "topping",
    type: "topping",
    price: 12,
    image: "/images/grape.jpg"
  },
  {
    id: 103,
    name: "蓝莓",
    category: "topping",
    type: "topping",
    price: 15,
    image: "/images/blueberry.jpg"
  },
  {
    id: 104,
    name: "草莓",
    category: "topping",
    type: "topping",
    price: 15,
    image: "/images/strawberry.jpg"
  }
];