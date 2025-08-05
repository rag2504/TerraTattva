import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Heart,
  ShoppingCart,
  Menu,
  X,
  Plus,
  Minus,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface HeaderProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  featuredProducts: Product[];
}

export default function Header({
  cart,
  setCart,
  favorites,
  setFavorites,
  isCartOpen,
  setIsCartOpen,
  featuredProducts,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const removeFromCart = (productId: number) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      toast({
        title: "Removed from Cart",
        description: `${item.name} has been removed from your cart.`,
        action: <X className="h-4 w-4 text-red-500" />,
      });
    }
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isActivePage = (path: string) => location.pathname === path;

  const getFavoriteProducts = () => {
    return featuredProducts.filter((product) => favorites.includes(product.id));
  };

  const addToCartFromFavorites = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        toast({
          title: "Quantity Updated!",
          description: `${product.name} quantity increased to ${existingItem.quantity + 1}`,
          action: <CheckCircle className="h-4 w-4 text-green-600" />,
        });
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart.`,
        action: <CheckCircle className="h-4 w-4 text-green-600" />,
      });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromFavorites = (productId: number) => {
    const product = featuredProducts.find((p) => p.id === productId);
    setFavorites((prev) => prev.filter((id) => id !== productId));
    if (product) {
      toast({
        title: "Removed from Favorites",
        description: `${product.name} has been removed from your favorites.`,
        action: <Heart className="h-4 w-4 text-gray-400" />,
      });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-xl border-b-2 border-gradient-to-r from-orange-200 to-red-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <img
              src="https://i.postimg.cc/PrrCJSKJ/Whats-App-Image-2025-08-04-at-15-57-48-a9d55488.jpg"
              alt="TerraTattva Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl shadow-lg border-2 border-orange-200 flex-shrink-0"
            />
            <a
              href="/"
              className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent truncate"
            >
              TerraTattva
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-2 shadow-lg border border-orange-100 mx-auto">
            <Link
              to="/"
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActivePage("/")
                  ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 mx-1 ${
                isActivePage("/products")
                  ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 mx-1 ${
                isActivePage("/about")
                  ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 mx-1 ${
                isActivePage("/contact")
                  ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side - Cart & Mobile Menu */}
          <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0 ml-auto lg:ml-0">
            {/* Favorites */}
            <Dialog open={isFavoritesOpen} onOpenChange={setIsFavoritesOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-2 sm:p-3 hover:bg-orange-50 rounded-full"
                >
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full">
                      {favorites.length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between text-2xl">
                    <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                      Favorites
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-700 px-3 py-1"
                    >
                      {favorites.length} items
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="max-h-96 overflow-y-auto">
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No favorites yet
                      </h3>
                      <p className="text-gray-400">
                        Start adding items to your favorites!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getFavoriteProducts().map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-4 p-4 border border-red-100 rounded-xl bg-gradient-to-r from-red-50 to-pink-50"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-xl shadow-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">
                              {product.name}
                            </h4>
                            <p className="text-red-600 font-bold text-xl">
                              ₹{product.price}
                            </p>
                            <div className="flex items-center space-x-2 mt-3">
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 py-1 text-xs rounded-full"
                                onClick={() => addToCartFromFavorites(product)}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
                            onClick={() => removeFromFavorites(product.id)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Shopping Cart */}
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-2 sm:p-3 hover:bg-orange-50 rounded-full"
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                  {getCartItemCount() > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 bg-orange-600 text-white text-xs rounded-full">
                      {getCartItemCount()}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between text-2xl">
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Shopping Cart
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 px-3 py-1"
                    >
                      {getCartItemCount()} items
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="max-h-96 overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-400">
                        Add some beautiful pottery to get started!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 border border-orange-100 rounded-xl bg-gradient-to-r from-orange-50 to-red-50"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl shadow-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">
                              {item.name}
                            </h4>
                            <p className="text-orange-600 font-bold text-xl">
                              ₹{item.price}
                            </p>
                            <div className="flex items-center space-x-3 mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 rounded-full border-orange-300"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-lg font-bold text-gray-700 min-w-[30px] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 rounded-full border-orange-300"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}

                      <div className="border-t border-orange-200 pt-6 mt-6">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-xl font-bold text-gray-800">
                            Total:
                          </span>
                          <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            ₹{getCartTotal()}
                          </span>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          onClick={() => {
                            toast({
                              title: "Order Placed Successfully!",
                              description: `Thank you for your order! Total: ₹${getCartTotal()} - Items: ${getCartItemCount()}`,
                              action: (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ),
                            });
                            setCart([]);
                            setIsCartOpen(false);
                          }}
                        >
                          Proceed to Checkout 🛒
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2 sm:p-3 hover:bg-orange-50 rounded-full"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gradient-to-b from-orange-50 to-red-50"
              >
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    TerraTattva
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-6 py-4 rounded-xl font-semibold shadow-lg ${
                      isActivePage("/")
                        ? "text-white bg-gradient-to-r from-orange-500 to-red-500"
                        : "text-gray-700 hover:text-orange-600 hover:bg-white/80"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-6 py-4 rounded-xl font-semibold shadow-lg ${
                      isActivePage("/products")
                        ? "text-white bg-gradient-to-r from-orange-500 to-red-500"
                        : "text-gray-700 hover:text-orange-600 hover:bg-white/80"
                    }`}
                  >
                    Products
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-6 py-4 rounded-xl font-semibold shadow-lg ${
                      isActivePage("/about")
                        ? "text-white bg-gradient-to-r from-orange-500 to-red-500"
                        : "text-gray-700 hover:text-orange-600 hover:bg-white/80"
                    }`}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-6 py-4 rounded-xl font-semibold shadow-lg ${
                      isActivePage("/contact")
                        ? "text-white bg-gradient-to-r from-orange-500 to-red-500"
                        : "text-gray-700 hover:text-orange-600 hover:bg-white/80"
                    }`}
                  >
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
