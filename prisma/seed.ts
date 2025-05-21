import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

const mockRestaurants = [
  {
    rating: 4.2,
    rating_count: 139,
    category: Category.YAKITORI,
    city: "osaka",
    desc: "Enjoy the highest quality Omakase with unlimited sake at a reasonable price.",
    id: "4dc2e1d1-fe89-4a29-b86a-f8bb0ce1395d",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop"
    ],
    name: "Kagurazaka Ishikawa Sushi Haru Nakanoshima Sushi",
    price_range: "3~5",
    featured: {
      text: "Top Yakitori Restaurant in Nakanoshima",
      icon: "stars-02"
    },
    isFavorite: true
  },
  {
    rating: 4.5,
    rating_count: 200,
    category: Category.SUSHI,
    city: "tokyo",
    desc: "Provides fresh seafood and authentic sushi.",
    id: "6ac3e2d1-ge98-5a29-c86a-g9cc1de2396d",
    images: [
      "https://images.unsplash.com/photo-1547592180-2f1a1b3c3b68?q=80&w=1887&auto=format&fit=crop"
    ],
    name: "Sushi Ginza Ishikawa",
    price_range: "4~6",
    featured: {
      text: "Top Sushi Restaurant in Tokyo",
      icon: "stars-02"
    },
    isFavorite: false
  },
  {
    rating: 4.7,
    rating_count: 180,
    category: Category.RAMEN,
    city: "kyoto",
    desc: "Rich broth with a variety of toppings.",
    id: "7bd4f3e2-hf98-6b39-d87b-h0dd2ee2397e",
    images: [
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1887&auto=format&fit=crop"
    ],
    name: "Ichiran Ramen",
    price_range: "2~4",
    featured: {
      text: "Kyoto's Famous Ramen Spot",
      icon: "stars-02"
    },
    isFavorite: true
  },
  {
    rating: 4.3,
    rating_count: 220,
    category: Category.TEMPURA,
    city: "nagoya",
    desc: "Crispy and delicious tempura.",
    id: "8ce5g4f3-jg09-7c40-e98c-i1ee3ff3408f",
    images: [
      "https://images.unsplash.com/photo-1604908177732-40aa343c3f2b?q=80&w=1887&auto=format&fit=crop"
    ],
    name: "Tempura Matsuya",
    price_range: "3~5",
    featured: {
      text: "Best Tempura in Nagoya",
      icon: "stars-02"
    },
    isFavorite: false
  },
  {
    rating: 4.6,
    rating_count: 190,
    category: Category.SOBA,
    city: "fukuoka",
    desc: "Chewy noodles with rich broth.",
    id: "9df6h5g4-kh10-8d41-f09d-j2ff4gg4519g",
    images: [
      "https://images.unsplash.com/photo-1570544826585-8dd0cf1d2aa8?q=80&w=1887&auto=format&fit=crop"
    ],
    name: "Udon Taro",
    price_range: "2~4",
    featured: {
      text: "Fukuoka's Best Udon Restaurant",
      icon: "stars-02"
    },
    isFavorite: true
  },
  {
    rating: 4.8,
    rating_count: 250,
    category: Category.YAKINIKU,
    city: "osaka",
    desc: "Premium beef grilled to perfection.",
    images: [
      "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7a9?q=80&w=1887&auto=format&fit=crop"
    ],
    name: "Yakiniku Master",
    price_range: "5~7",
    featured: {
      text: "Osaka's Finest Yakiniku",
      icon: "stars-02"
    },
    isFavorite: false
  },
  {
    rating: 4.4,
    rating_count: 170,
    category: Category.CURRY,
    city: "tokyo",
    desc: "Rich and flavorful Japanese curry.",
    images: [
      "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1887&auto=format&fit=crop"
    ],
    name: "Curry House",
    price_range: "2~3",
    isFavorite: false
  },
  {
    rating: 4.9,
    rating_count: 300,
    category: Category.KAISEKI,
    city: "kyoto",
    desc: "Traditional multi-course Japanese dinner.",
    images: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1887&auto=format&fit=crop"
    ],
    name: "Kyoto Kaiseki",
    price_range: "7~9",
    featured: {
      text: "Authentic Kaiseki Experience",
      icon: "stars-02"
    },
    isFavorite: true
  }
];

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data
  await prisma.restaurant.deleteMany();
  
  // Insert seed data
  for (const restaurant of mockRestaurants) {
    const result = await prisma.restaurant.create({
      data: restaurant,
    });
    console.log(`Created restaurant with id: ${result.id}`);
  }
  
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
