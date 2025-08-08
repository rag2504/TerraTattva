import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import {
  ArrowLeft,
  Heart,
  Star,
  ShoppingCart,
  CheckCircle,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { featuredProducts, Product } from "./Index";

interface CartItem extends Product {
  quantity: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundProduct = featuredProducts.find((p) => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
    // Scroll to top when component mounts
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
  }, [id]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("terraTattvaCart", JSON.stringify(cart));
  }, [cart]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("terraTattvaFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
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
        description: `${product.name} (${quantity}x) has been added to your cart.`,
        action: <ShoppingCart className="h-4 w-4 text-orange-600" />,
      });
      return [...prevCart, { ...product, quantity }];
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

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, selectedQuantity);
      setIsCartOpen(true);
      toast({
        title: "Ready for Checkout!",
        description: `${product.name} has been added to your cart. Opening cart for checkout...`,
        action: <CheckCircle className="h-4 w-4 text-green-600" />,
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

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

      {/* Breadcrumb */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/products"
              className="hover:text-orange-600 transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-orange-600 font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link to="/products">
              <Button variant="ghost" size="sm" className="hover:bg-orange-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl bg-white">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full shadow-lg"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </Button>
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-orange-500 ring-2 ring-orange-200"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4 lg:space-y-6">
              <div>
                <Badge className="bg-orange-100 text-orange-700 mb-4">
                  100% Handcrafted
                </Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1 mb-4 lg:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 lg:h-5 lg:w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm lg:text-base text-gray-600 ml-2">
                    (4.8/5 from 24 reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-2 lg:space-y-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.dimensions && (
                <div className="space-y-1 lg:space-y-2">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                    Dimensions
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600">
                    {product.dimensions}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                    }
                    className="h-10 w-10 p-0 rounded-full"
                  >
                    -
                  </Button>
                  <span className="text-lg lg:text-xl font-semibold text-gray-700 min-w-[40px] text-center">
                    {selectedQuantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    className="h-10 w-10 p-0 rounded-full"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 lg:py-6 text-base lg:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    Buy Now - ₹{product.price * selectedQuantity}
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 lg:py-6 text-base lg:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => addToCart(product, selectedQuantity)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Free Delivery</span>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Authentic Craft</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            You might also like
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 2)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-600">
                          ₹{relatedProduct.price}
                        </span>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster />
    </div>
  );
}
