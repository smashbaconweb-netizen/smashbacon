export type OptionGroup = {
  id: string;
  name: string;
  choices: string[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // pre-tax, in-store pricing from the menu board
  category: CategoryId;
  image?: string;
  options?: OptionGroup[];
  featured?: boolean;
  priceTbc?: boolean; // placeholder price pending owner confirmation
};

export type CategoryId =
  | "burgers"
  | "buffalo-chicken"
  | "chicken"
  | "shareables"
  | "kids"
  | "shakes";

export const CATEGORIES: { id: CategoryId; name: string; note?: string; icon: string }[] = [
  { id: "burgers", name: "Burger Specialties", note: "All burgers come with french fries", icon: "burger" },
  { id: "buffalo-chicken", name: "Buffalo Chicken", icon: "wing" },
  { id: "chicken", name: "Chicken", icon: "wing" },
  { id: "shareables", name: "Shareables", icon: "fries" },
  { id: "kids", name: "Kids", icon: "burger" },
  { id: "shakes", name: "Shakes", note: "Made with real ice cream", icon: "shake" },
];

const HEAT: OptionGroup = {
  id: "heat",
  name: "Pick your heat",
  choices: ["Hot", "Mild", "BBQ", "Salt & Pepper"],
};

export const MENU: MenuItem[] = [
  // ---- Burger Specialties (with fries) ----
  {
    id: "original-smash-bacon",
    name: "The Original Smash Bacon",
    description:
      "Double patty, cheese, bacon, lettuce, tomatoes, pickles, red onions & house spread. Fries included.",
    price: 11.99,
    category: "burgers",
    image: "/images/original-smash-bacon.jpg",
    featured: true,
  },
  {
    id: "double-bacon-jam",
    name: "The Double Bacon Jam",
    description:
      "A juicy smash burger topped with melted American and blue cheese, finished with our house special bacon jam. Fries included.",
    price: 13.99,
    category: "burgers",
    image: "/images/double-bacon-jam.jpg",
  },
  {
    id: "bone-marrow-double",
    name: "The Bone Marrow Double",
    description:
      "Grilled onions with bone marrow, spread sauce, and American cheese on a double patty. Fries included.",
    price: 13.99,
    category: "burgers",
    image: "/images/bone-marrow-double.jpg",
  },
  {
    id: "eggcellent-double",
    name: "The Eggcellent Double Burger",
    description:
      "Fried egg and bacon on a double patty with American cheese. Fries included.",
    price: 13.99,
    category: "burgers",
    image: "/images/eggcellent-double.jpg",
  },
  {
    id: "double-guac-bacon-jalapeno",
    name: "The Double Guac Bacon Jalapeño",
    description:
      "Guacamole, bacon, grilled onions, jalapeños, and American cheese. Fries included.",
    price: 13.99,
    category: "burgers",
    image: "/images/bacon-avocado-burger.png",
    featured: true,
  },
  {
    id: "bbq-queen",
    name: "The BBQ Queen",
    description:
      "Tangy BBQ sauce, crunchy onion rings, melted American cheese, and crispy bacon. Fries included.",
    price: 13.99,
    category: "burgers",
    image: "/images/bbq-queen.jpg",
  },

  // ---- Buffalo Chicken ----
  {
    id: "buffalo-chicken-burger",
    name: "Buffalo Chicken Burger",
    description:
      "Crispy buffalo-sauced chicken, ranch, lettuce and pickles on a toasted bun.",
    price: 12.99,
    category: "buffalo-chicken",
    image: "/images/buffalo-chicken-burger.png",
    featured: true,
  },
  {
    id: "buffalo-chicken-burrito",
    name: "Buffalo Chicken Burrito",
    description: "Our buffalo chicken wrapped burrito-style — hearty and portable.",
    price: 12.99,
    category: "buffalo-chicken",
    image: "/images/buffalo-chicken-burrito.jpg",
  },

  // ---- Chicken ----
  {
    id: "buffalo-chicken-fries",
    name: "Buffalo Chicken Fries",
    description: "Loaded fries topped with buffalo chicken.",
    price: 13.99,
    category: "chicken",
    image: "/images/buffalo-chicken-fries.jpg",
    options: [HEAT],
  },
  {
    id: "buffalo-wings-8",
    name: "8 pc Buffalo Wings",
    description: "Eight crispy wings tossed to order.",
    price: 13.99,
    category: "chicken",
    image: "/images/buffalo-wings.jpg",
    options: [HEAT],
  },
  {
    id: "chicken-tenders-5",
    name: "5 pc Chicken Tenders",
    description: "Five golden hand-breaded tenders.",
    price: 13.99,
    category: "chicken",
  },

  // ---- Shareables ----
  {
    id: "classic-fries",
    name: "Classic Fries",
    description: "Crispy golden fries, salted.",
    price: 3.99,
    category: "shareables",
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    description: "Thick-cut, golden and crunchy.",
    price: 4.99,
    category: "shareables",
    image: "/images/onion-rings.jpg",
  },
  {
    id: "jalapeno-poppers",
    name: "Jalapeño Poppers (5)",
    description: "Five cheese-stuffed jalapeño poppers.",
    price: 5.99,
    category: "shareables",
    image: "/images/jalapeno-poppers.jpg",
  },
  {
    id: "mozzarella-sticks",
    name: "Mozzarella Sticks (5)",
    description: "Five gooey mozzarella sticks.",
    price: 6.99,
    category: "shareables",
    image: "/images/mozzarella-sticks.jpg",
  },
  {
    id: "truffle-fries",
    name: "Truffle Fries",
    description: "Fries tossed in truffle oil and parmesan.",
    price: 6.99,
    category: "shareables",
    image: "/images/truffle-fries.jpg",
  },

  // ---- Kids ----
  {
    id: "kids-meal",
    name: "Kids Meal",
    description: "Cheeseburger, grilled cheese, or 3 chicken tenders — with french fries.",
    price: 8.99,
    category: "kids",
    image: "/images/kids-cheeseburger.jpg",
    options: [
      {
        id: "kids-choice",
        name: "Pick your main",
        choices: ["Cheeseburger", "Grilled Cheese", "3 Chicken Tenders"],
      },
    ],
  },

  // ---- Shakes ----
  {
    id: "shake",
    name: "Hand-Spun Shake",
    description: "Made with real ice cream.",
    price: 5.99,
    category: "shakes",
    options: [
      {
        id: "flavor",
        name: "Pick your flavor",
        choices: [
          "Oreo",
          "Chocolate",
          "Vanilla",
          "Strawberry",
          "Salted Caramel",
          "Peanut Butter Banana",
        ],
      },
    ],
  },
];

export const TAX_RATE = 0.0875; // National City, CA sales tax

export function getItem(id: string): MenuItem | undefined {
  return MENU.find((m) => m.id === id);
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}
