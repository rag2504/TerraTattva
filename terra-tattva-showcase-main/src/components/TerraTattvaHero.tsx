import { ArrowRight, Sparkles, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const TerraTattvaHero = () => {
  return (
    <section className="relative min-h-screen hero-bg hero-pattern flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating elements */}
        <div className="absolute top-12 left-8 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full floating-element opacity-60 blur-sm"></div>
        <div className="absolute bottom-16 right-12 w-32 h-32 bg-gradient-to-br from-accent/25 to-primary/25 rounded-full floating-delayed opacity-50 blur-sm"></div>
        
        {/* Medium floating elements */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-primary-glow/30 to-primary/30 rounded-full floating-element opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-accent/20 to-primary-glow/20 rounded-full floating-delayed opacity-35"></div>
        
        {/* Small accent dots */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
        <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-primary-glow rounded-full animate-pulse-glow"></div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute top-1/3 right-0 w-40 h-px bg-gradient-to-l from-transparent via-accent/30 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Animated Badge */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <Badge className="hero-badge text-primary px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105">
              <Sparkles className="w-4 h-4 mr-2" />
              Handcrafted with Love
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight animate-fade-in">
            TerraTattva
          </h1>

          {/* Subtitle */}
          <div className="mb-8 space-y-4 animate-fade-in">
            <p className="text-xl sm:text-2xl md:text-3xl text-foreground/90 font-medium max-w-4xl mx-auto leading-relaxed">
              Home décor with a desi touch –
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-primary font-bold max-w-4xl mx-auto leading-relaxed">
              मिट्टी, मेहनत और mindful living
            </p>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            <Heart className="inline w-5 h-5 mr-2 text-primary" />
            Every purchase supports a local artisan and preserves ancient traditions
            <Star className="inline w-5 h-5 ml-2 text-accent" />
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
            <Link to="/products" className="w-full sm:w-auto">
              <Button className="btn-hero w-full sm:w-auto text-white px-12 py-6 text-xl font-bold rounded-full group">
                Explore Collection
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button className="btn-outline-hero w-full sm:w-auto px-12 py-6 text-xl font-bold rounded-full">
                Our Story
              </Button>
            </Link>
          </div>

          {/* Additional Accent Elements */}
          <div className="mt-16 flex justify-center space-x-8 opacity-60">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default TerraTattvaHero;