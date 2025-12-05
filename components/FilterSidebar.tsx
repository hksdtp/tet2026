'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FilterSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: { min: number; max: number }
  onPriceRangeChange: (range: { min: number; max: number }) => void
  isOpen?: boolean
  onClose?: () => void
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  isOpen = true,
  onClose
}: FilterSidebarProps) {
  const categories = [
    { value: 'all', label: 'Tất cả', count: 9 },
    { value: 'sets', label: 'Bộ Ấm Tách', count: 9 },
  ]

  const pricePresets = [
    { label: 'Tất cả giá', min: 0, max: 10000000 },
  ]

  const filterContent = (
    <>
      {/* Mobile header */}
      <div className="flex justify-between items-center mb-6 lg:hidden sticky top-0 bg-white pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-incanto-dark">Bộ lọc</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6 lg:mb-8">
        <h3 className="font-semibold text-base lg:text-lg mb-3 lg:mb-4 text-incanto-dark">Danh mục</h3>
        <div className="space-y-1 sm:space-y-2">
          {categories.map((category) => (
            <label
              key={category.value}
              className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={selectedCategory === category.value}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-4 h-4 text-incanto-primary focus:ring-incanto-primary"
                />
                <span className={`text-sm sm:text-base ${selectedCategory === category.value ? 'font-medium text-incanto-primary' : 'text-gray-700'}`}>
                  {category.label}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="mb-6 lg:mb-8">
        <h3 className="font-semibold text-base lg:text-lg mb-3 lg:mb-4 text-incanto-dark">Khoảng giá</h3>

        {/* Price presets */}
        <div className="space-y-1 sm:space-y-2 mb-4">
          {pricePresets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => onPriceRangeChange({ min: preset.min, max: preset.max })}
              className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-colors text-sm sm:text-base ${
                priceRange.min === preset.min && priceRange.max === preset.max
                  ? 'bg-incanto-primary/10 text-incanto-primary font-medium'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Custom price range */}
        <div className="space-y-3">
          <div>
            <label className="text-xs sm:text-sm text-gray-600">Giá tối thiểu</label>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => onPriceRangeChange({ ...priceRange, min: Number(e.target.value) })}
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-600">Giá tối đa</label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => onPriceRangeChange({ ...priceRange, max: Number(e.target.value) })}
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary"
              placeholder="5000000"
            />
          </div>
        </div>
      </div>

      {/* Other filters */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-base lg:text-lg text-incanto-dark">Bộ lọc khác</h3>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-incanto-primary rounded focus:ring-incanto-primary" />
          <span className="text-sm sm:text-base text-gray-700">Còn hàng</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-incanto-primary rounded focus:ring-incanto-primary" />
          <span className="text-sm sm:text-base text-gray-700">Đang giảm giá</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-incanto-primary rounded focus:ring-incanto-primary" />
          <span className="text-sm sm:text-base text-gray-700">Free ship</span>
        </label>
      </div>

      {/* Clear filters */}
      <button className="w-full mt-6 py-3 text-sm sm:text-base border border-gray-300 rounded-full hover:border-incanto-primary hover:text-incanto-primary transition-colors min-h-[48px]">
        Xóa bộ lọc
      </button>
    </>
  )

  // Mobile drawer mode - chỉ render khi isOpen và onClose được truyền vào
  const isMobileMode = onClose !== undefined

  // Desktop mode - render static sidebar
  if (!isMobileMode) {
    return (
      <div className="bg-white rounded-2xl p-6 h-fit sticky top-24">
        {filterContent}
      </div>
    )
  }

  // Mobile drawer mode
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer from bottom */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="p-5 pb-8">
              {filterContent}
            </div>
            {/* Safe area */}
            <div className="h-6" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
