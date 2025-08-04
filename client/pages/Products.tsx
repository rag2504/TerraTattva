import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Heart, Eye, Star, ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    price: 2499,
    originalPrice: 3299,
    image: "https://images.pexels.com/photos/18635393/pexels-photo-18635393.jpeg",
    category: "Decorative",
    rating: 4.8,
    reviews: 156,
    description: "Beautiful handcrafted ceramic vase with intricate floral patterns, perfect for home decoration."
  },
  {
    id: 2,
    name: "Traditional Clay Pot",
    price: 1899,
    originalPrice: 2499,
    image: "https://images.pexels.com/photos/6694342/pexels-photo-6694342.jpeg",
    category: "Functional",
    rating: 4.9,
    reviews: 203,
    description: "Authentic traditional clay pot, handmade by skilled artisans using age-old techniques."
  },
  {
    id: 3,
    name: "Artisan Bowl Set",
    price: 3299,
    originalPrice: 4199,
    image: "https://images.pexels.com/photos/18633243/pexels-photo-18633243.jpeg",
    category: "Set",
    rating: 4.7,
    reviews: 89,
    description: "Set of three beautiful ceramic bowls with unique blue patterns, perfect for serving."
  },
  {
    id: 4,
    name: "Terracotta Planter",
    price: 1599,
    image: "https://images.pexels.com/photos/19884207/pexels-photo-19884207.png",
    category: "Garden",
    rating: 4.6,
    reviews: 134,
    description: "Elegant terracotta planter perfect for indoor plants and herbs."
  },
  {
    id: 5,
    name: "Decorative Ceramic Collection",
    price: 4599,
    originalPrice: 5999,
    image: "https://images.pexels.com/photos/6611173/pexels-photo-6611173.jpeg",
    category: "Collection",
    rating: 4.9,
    reviews: 267,
    description: "Exquisite collection of handmade ceramic pieces showcasing traditional craftsmanship."
  }
];

export default function Products() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { toast } = useToast();

  const categories = ["All", "Decorative", "Functional", "Set", "Garden", "Collection"];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        toast({
          title: "Quantity Updated!",
          description: `${product.name} - Quantity: ${newQuantity} - Total: ₹${product.price * newQuantity}`,
          action: <CheckCircle className="h-4 w-4 text-green-600" />,
        });
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart. Check your cart to proceed to checkout.`,
        action: <ShoppingCart className="h-4 w-4 text-orange-600" />,
      });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Header
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Page Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Collection</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover authentic handcrafted pottery made by talented artisans. Each piece tells a story 
              of tradition, skill, and passion.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-orange-600 hover:bg-orange-700" 
                  : "border-orange-600 text-orange-600 hover:bg-orange-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-10 w-10 bg-white/90 hover:bg-white rounded-full"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart 
                        className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-10 w-10 bg-white/90 hover:bg-white rounded-full">
                      <Eye className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="flex-1 border-orange-600 text-orange-600 hover:bg-orange-50">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster />
    </div>
  );
}
