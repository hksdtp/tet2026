"use client";

import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { products } from "@/data/products";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-incanto-dark">Sản phẩm INCANTO</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Khám phá bộ sưu tập ấm trà cổ phong và phụ kiện trà đạo tinh hoa
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Search bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary min-h-[48px]"
            />
          </div>

          <div className="flex gap-2 sm:gap-3">
            {/* View mode toggle */}
            <div className="flex items-center space-x-1 bg-white rounded-full p-1 border border-gray-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-full transition-colors ${
                  viewMode === "grid"
                    ? "bg-incanto-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-full transition-colors ${
                  viewMode === "list"
                    ? "bg-incanto-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filter button (mobile) */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-5 py-2.5 border border-gray-300 rounded-full hover:border-incanto-primary hover:text-incanto-primary transition-colors min-h-[48px]"
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm sm:text-base">Bộ lọc</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6 lg:gap-8">
          {/* Filter sidebar - desktop only, mobile uses drawer */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Mobile filter drawer */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
            }}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Product grid */}
          <div className="flex-1">
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Tìm thấy <span className="font-medium text-incanto-dark">{filteredProducts.length}</span> sản phẩm
            </p>

            <div
              className={`grid gap-3 sm:gap-4 lg:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </div>

            {/* Load more */}
            <div className="text-center mt-8 sm:mt-12">
              <button className="btn-secondary text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 min-h-[48px]">
                Xem thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
