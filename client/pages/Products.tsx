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

      {/* Page Header */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6 sm:mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:bg-orange-100 text-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Badge className="bg-white/90 text-orange-600 border border-orange-200 px-3 py-2 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              Our Collection
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Handcrafted{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Pottery
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Discover our curated selection of authentic handcrafted pottery,
              each piece uniquely beautiful and culturally significant.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                    : "border-orange-300 text-orange-600 hover:bg-orange-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <Card className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 pottery-card-hover">
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
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(product.id);
                        }}
                      >
                        <Heart
                          className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-10 w-10 bg-white/90 hover:bg-white rounded-full shadow-lg"
                        >
                          <Eye className="h-5 w-5 text-gray-600" />
                        </Button>
                      </Link>
                    </div>
                    {product.originalPrice && (
                      <Badge className="absolute top-4 left-4 bg-red-500 text-white font-semibold px-3 py-1">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100,
                        )}
                        % OFF
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">(4.8)</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Link to={`/product/${product.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          👁️ View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
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

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            We're always adding new pieces to our collection. Contact us for
            custom orders or to learn about upcoming arrivals.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <Toaster />
    </div>
  );
}
