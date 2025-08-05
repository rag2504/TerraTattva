import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Heart, ArrowRight, Leaf, Truck, Award, Sparkles, Star, ShoppingCart, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    price: 2499,
    originalPrice: 3299,
    image: "https://images.pexels.com/photos/18635393/pexels-photo-18635393.jpeg",
    description: "Beautiful handcrafted ceramic vase with traditional patterns"
  },
  {
    id: 2,
    name: "Artisan Bowl Set",
    price: 3299,
    originalPrice: 4199,
    image: "https://images.pexels.com/photos/18633243/pexels-photo-18633243.jpeg",
    description: "Set of three beautiful ceramic bowls perfect for serving"
  },
  {
    id: 3,
    name: "Terracotta Collection",
    price: 1899,
    image: "https://images.pexels.com/photos/19884207/pexels-photo-19884207.png",
    description: "Rustic charm meets contemporary style"
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Show success message for adding more quantity
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
      // Show success message for new item
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart. Check your cart to proceed to checkout.`,
        action: <ShoppingCart className="h-4 w-4 text-orange-600" />,
      });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId: number) => {
    const product = featuredProducts.find(p => p.id === productId);
    setFavorites(prev => {
      const isAlreadyFavorite = prev.includes(productId);
      if (isAlreadyFavorite) {
        toast({
          title: "Removed from Favorites",
          description: `${product?.name} has been removed from your favorites.`,
          action: <Heart className="h-4 w-4 text-gray-400" />,
        });
      } else {
        toast({
          title: "Added to Favorites",
          description: `${product?.name} has been added to your favorites.`,
          action: <Heart className="h-4 w-4 text-red-500" />,
        });
      }
      return isAlreadyFavorite
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
    });
  };

  const handleBuyNow = (product: Product) => {
    // Add to cart first
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Show buy now message and open cart
    toast({
      title: "Ready for Checkout!",
      description: `${product.name} has been added to your cart. Opening cart for checkout...`,
      action: <CheckCircle className="h-4 w-4 text-green-600" />,
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header 
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen hero-bg hero-pattern flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large floating elements */}
          <div className="absolute top-12 left-8 w-24 h-24 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full floating-element opacity-60 blur-sm"></div>
          <div className="absolute bottom-16 right-12 w-32 h-32 bg-gradient-to-br from-red-300/25 to-orange-300/25 rounded-full floating-delayed opacity-50 blur-sm"></div>
          
          {/* Medium floating elements */}
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-orange-400/30 to-orange-300/30 rounded-full floating-element opacity-40"></div>
          <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-red-300/20 to-orange-400/20 rounded-full floating-delayed opacity-35"></div>
          
          {/* Small accent dots */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-orange-500 rounded-full animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-red-500 rounded-full animate-pulse-glow"></div>
          <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-orange-400 rounded-full animate-pulse-glow"></div>
          
          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
          <div className="absolute top-1/3 right-0 w-40 h-px bg-gradient-to-l from-transparent via-red-500/30 to-transparent"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="mb-8 flex justify-center">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Handcrafted with Love
              </Badge>
            </div>

            {/* Main Title */}
            <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
              TerraTattva
            </h1>

            {/* Subtitle */}
            <div className="mb-8 space-y-4">
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed">
                Home décor with a desi touch –
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl text-orange-600 font-bold max-w-4xl mx-auto leading-relaxed">
                मिट्टी, मेहनत और mindful living
              </p>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              <Heart className="inline w-5 h-5 mr-2 text-orange-600" />
              Every purchase supports a local artisan and preserves ancient traditions
              <Star className="inline w-5 h-5 ml-2 text-red-500" />
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/products" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  Explore Collection
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-white/90 backdrop-blur-sm border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Additional Accent Elements */}
            <div className="mt-16 flex justify-center space-x-8 opacity-60">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">100%</div>
              <div className="text-gray-600 font-semibold text-base sm:text-lg leading-tight">Hand Crafted</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">100%</div>
              <div className="text-gray-600 font-semibold text-base sm:text-lg leading-tight">Eco-Friendly</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">FREE</div>
              <div className="text-gray-600 font-semibold text-base sm:text-lg leading-tight">Delivery Pan India</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Preserving Ancient Craftsmanship
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                TerraTattva bridges the gap between traditional artisans and modern art enthusiasts. 
                We work directly with skilled pottery makers from rural communities, ensuring they 
                receive fair compensation for their exceptional craftsmanship.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every piece in our collection tells a story of generations of knowledge, skill, 
                and passion passed down through families of master artisans.
              </p>
              <Link to="/about">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full">
                  Learn More About Our Artisans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/6243345/pexels-photo-6243345.jpeg"
                alt="Master artisan crafting pottery"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm opacity-90">Years of Tradition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of authentic handcrafted pottery, 
              each piece uniquely beautiful and culturally significant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <Card className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
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
                        className="h-10 w-10 bg-white/90 hover:bg-white rounded-full shadow-lg"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart 
                          className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                        />
                      </Button>
                    </div>
                    {product.originalPrice && (
                      <Badge className="absolute top-4 left-4 bg-red-500 text-white font-semibold px-3 py-1">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => addToCart(product)}
                      >
                        🛒 Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => handleBuyNow(product)}
                      >
                        ⚡ Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Toaster />
    </div>
  );
}
