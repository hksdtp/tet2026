export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-incanto-primary/80 to-incanto-dark/80 z-10" />
        <img
          src="/api/placeholder/1920/1080"
          alt="Traditional tea workshop"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-24 lg:py-32">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 text-white">
          Câu Chuyện INCANTO
        </h1>
        <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-white/90 leading-relaxed">
          Hơn một thập kỷ đam mê và gìn giữ văn hóa trà đạo Việt Nam.
          Mỗi sản phẩm là một hành trình của nghệ thuật, tâm hồn và truyền thống.
        </p>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-2xl mx-auto">
          <div className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">10+</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base">Năm kinh nghiệm</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">5000+</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base">Khách hàng tin tưởng</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">100+</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base">Sản phẩm độc bản</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce z-20">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
