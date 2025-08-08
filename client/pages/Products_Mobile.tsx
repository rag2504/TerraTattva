{filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <Card className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 pottery-card-hover rounded-2xl">
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 sm:h-10 sm:w-10 bg-white/90 hover:bg-white rounded-full shadow-lg"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(product.id);
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 sm:h-10 sm:w-10 bg-white/90 hover:bg-white rounded-full shadow-lg"
                        >
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        </Button>
                      </Link>
                    </div>
                    {product.originalPrice && (
                      <Badge className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white font-semibold px-2 py-1 text-xs sm:text-sm">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100,
                        )}
                        % OFF
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="flex items-center space-x-0.5 sm:space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">(4.8)</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm sm:text-base lg:text-lg text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Link to={`/product/${product.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium sm:font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          👁️ View Details
                        </Button>
                      </Link>
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium sm:font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
