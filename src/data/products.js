export const products = [
  /* ================== 口味裱花奶油蛋糕 ================== */
  {
    id: 1,
    name: "伯爵红茶",
    category: "flavorCream",
    type: "cake",
    image: "/images/伯爵红茶.jpg",
    sizes: {
      6: 28.00, // 澳元：约¥168 → $28
      8: 40.00  // 澳元：约¥238 → $40
    },
    description: "英式伯爵红茶风味，茶香浓郁"
  },
  {
    id: 2,
    name: "抹茶",
    category: "flavorCream",
    type: "cake",
    image: "/images/抹茶.jpg",
    sizes: {
      6: 28.00, // 澳元：约¥168 → $28
      8: 40.00  // 澳元：约¥238 → $40
    },
    description: "日本宇治抹茶，清新微苦"
  },

  /* ================== 水果裱花奶油蛋糕 ================== */
  {
    id: 3,
    name: "蓝莓",
    category: "fruitCream",
    type: "cake",
    image: "/images/蓝莓.jpg",
    sizes: {
      6: 32.00, // 澳元：约¥188 → $32
      8: 45.00  // 澳元：约¥268 → $45
    },
    description: "新鲜蓝莓，酸甜可口"
  },
  {
    id: 4,
    name: "葡萄",
    category: "fruitCream",
    type: "cake",
    image: "/images/葡萄.jpg",
    sizes: {
      6: 32.00, // 澳元：约¥188 → $32
      8: 45.00  // 澳元：约¥268 → $45
    },
    description: "阳光玫瑰葡萄，清甜多汁"
  },

  /* ================== 加料（Topping） ================== */
  {
    id: 101,
    name: "芒果",
    category: "topping",
    type: "topping",
    price: 4.50, // 澳元：约¥12 → $4.5
    image: "/images/mango.jpg",
    description: "新鲜芒果粒"
  },
  {
    id: 102,
    name: "葡萄",
    category: "topping",
    type: "topping",
    price: 4.50, // 澳元：约¥12 → $4.5
    image: "/images/grape.jpg",
    description: "阳光玫瑰葡萄"
  },
  {
    id: 103,
    name: "蓝莓",
    category: "topping",
    type: "topping",
    price: 5.00, // 澳元：约¥15 → $5
    image: "/images/blueberry.jpg",
    description: "新鲜蓝莓"
  },
  {
    id: 104,
    name: "草莓",
    category: "topping",
    type: "topping",
    price: 5.00, // 澳元：约¥15 → $5
    image: "/images/strawberry.jpg",
    description: "当季草莓"
  }
];