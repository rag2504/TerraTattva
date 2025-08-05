import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ArrowLeft, Users, Award, Globe } from "lucide-react";

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

export default function About() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Header
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        featuredProducts={[]}
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

          <div className="text-center mb-16">
            <Badge className="bg-white/90 text-orange-600 border border-orange-200 px-4 py-2 text-sm font-medium mb-6">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                TerraTattva
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging the gap between traditional artisans and modern art
              lovers, one handcrafted piece at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                TerraTattva was founded with a simple yet powerful vision: to
                empower talented pottery artisans by connecting their beautiful
                handcrafted creations with art lovers worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We work directly with skilled pottery makers from rural
                communities, ensuring they receive fair compensation for their
                exceptional craftsmanship while preserving ancient traditions
                that have been passed down through generations.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every purchase supports a local artisan and helps preserve the
                rich cultural heritage of traditional pottery making.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6243345/pexels-photo-6243345.jpeg"
                alt="Master artisan crafting pottery"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">100+</div>
                <div className="text-sm opacity-90">Years of Tradition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything we do is guided by our core values of authenticity,
              sustainability, and social impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize the well-being and prosperity of our artisan
                community, ensuring fair wages and sustainable livelihoods.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Authentic Craftsmanship
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece is handcrafted using traditional techniques,
                ensuring authenticity and preserving cultural heritage.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Global Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connecting local artisans with global markets, creating
                opportunities for cultural exchange and economic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Together, we're making a difference in the lives of artisans and
              their communities across India.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600">Artisans Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">8</div>
              <div className="text-gray-600">Villages Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">5</div>
              <div className="text-gray-600">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                150+
              </div>
              <div className="text-gray-600">Pieces Sold</div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Artisans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Behind every piece is a talented artisan with a unique story,
              skill, and passion for their craft.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6694342/pexels-photo-6694342.jpeg"
                alt="Artisan working on pottery"
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                "Every pot tells a story"
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                "I learned pottery from my grandmother when I was just 12 years
                old. Each piece I create carries forward the traditions of my
                family and my village. Through TerraTattva, my work reaches
                people who truly appreciate handmade art."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-semibold">R</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ravi Kumar</div>
                  <div className="text-gray-600">Master Potter, Rajasthan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Every purchase you make supports an artisan, preserves tradition,
            and brings authentic handcrafted beauty to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-full"
              >
                Shop Collection
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
