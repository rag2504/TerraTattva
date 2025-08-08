import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import {
  Heart,
  Eye,
  Star,
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { featuredProducts, Product } from "./Index";

interface CartItem extends Product {
  quantity: number;
}

export default function Products() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { toast } = useToast();

  // Scroll to top when component mounts and load saved data
  useEffect(() => {
    window.scrollTo(0, 0);

    // Load cart and favorites from localStorage
    const savedCart = localStorage.getItem("terraTattvaCart");
    const savedFavorites = localStorage.getItem("terraTattvaFavorites");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing saved cart:", error);
      }
    }

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing saved favorites:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("terraTattvaCart", JSON.stringify(cart));
  }, [cart]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("terraTattvaFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const categories = ["All", "Pottery", "Decorative", "Functional"];

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        toast({
          title: "Quantity Updated!",
          description: `${product.name} - Quantity: ${newQuantity} - Total: ₹${product.price * newQuantity}`,
          action: <CheckCircle className="h-4 w-4 text-green-600" />,
        });
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item,
        );
      }
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart.`,
        action: <ShoppingCart className="h-4 w-4 text-orange-600" />,
      });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId: number) => {
    const product = featuredProducts.find((p) => p.id === productId);
    setFavorites((prev) => {
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
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
    });
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    toast({
      title: "Ready for Checkout!",
      description: `${product.name} has been added to your cart. Opening cart for checkout...`,
      action: <CheckCircle className="h-4 w-4 text-green-600" />,
    });
    setIsCartOpen(true);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? featuredProducts
      : featuredProducts.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(selectedCategory.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(selectedCategory.toLowerCase()),
        );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Header
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        featuredProducts={featuredProducts}
      />

      {/* Page Header - Mobile Optimized */}
      <section className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4 sm:mb-6">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-orange-100 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm font-medium mb-4 sm:mb-6 shadow-lg">
              ✨ Our Collection
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Handcrafted{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Pottery
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              🏺 Discover authentic handcrafted pottery, each piece uniquely
              beautiful
            </p>
          </div>
        </div>
      </section>

      {/* Filter Categories - Mobile Optimized */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto">
            <div className="flex gap-3 pb-2 min-w-max justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300 min-w-[80px] ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105"
                      : "border-orange-300 text-orange-600 hover:bg-orange-50 bg-white"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid - Mobile First */}
      <section className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <Card className="relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl backdrop-blur-sm">
                  {/* Image Container with Better Mobile Ratio */}
                  <div className="relative aspect-[3/2] sm:aspect-[4/3] lg:aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Mobile-Optimized Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 bg-white/95 hover:bg-white rounded-full shadow-lg backdrop-blur-sm border border-white/50"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(product.id);
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-9 w-9 bg-white/95 hover:bg-white rounded-full shadow-lg backdrop-blur-sm border border-white/50"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                    </div>
                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1.5 text-xs rounded-full shadow-lg">
                        💸{" "}
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100,
                        )}
                        % OFF
                      </Badge>
                    )}
                    {/* Mobile-Friendly Quick View Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Content with Better Mobile Spacing */}
                  <CardContent className="p-4 sm:p-5 lg:p-6 space-y-3">
                    {/* Product Title */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 hover:text-orange-600 transition-colors line-clamp-1 leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Product Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        (4.8)
                      </span>
                      <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-base text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                      <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded-full">
                        Free Delivery
                      </span>
                    </div>

                    {/* Action Buttons - Mobile Optimized */}
                    <div className="space-y-2.5">
                      <Link to={`/product/${product.id}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3.5 text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                          👁️ View Details
                        </Button>
                      </Link>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3.5 text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        🛒 Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                No products found in this category
              </h3>
              <p className="text-gray-500 mb-8">
                Try selecting a different category or browse all products.
              </p>
              <Button
                onClick={() => setSelectedCategory("All")}
                className="bg-orange-600 hover:bg-orange-700"
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action - Themed to Match Website */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 relative overflow-hidden border-t border-orange-200">
        {/* Background Pattern - Pottery Theme */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-300 to-red-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-red-300 to-orange-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            🔍 Can't Find What You're Looking For?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
            🎨 We're always adding new pieces! Contact us for custom orders or
            upcoming arrivals.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-base sm:text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              📞 Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <Toaster />
    </div>
  );
}
