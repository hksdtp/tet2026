import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { Facebook, Instagram, Youtube } from 'lucide-react'

export function Contact() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-incanto-dark">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Hãy đến thăm showroom của INCANTO hoặc liên hệ qua các kênh sau
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-incanto-dark">Thông tin liên hệ</h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-incanto-bg-main/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-incanto-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 text-incanto-dark">Showroom Hà Nội</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Số 24, Villa D, khu The Manor, phường Từ Liêm, Hà Nội<br />
                      <a href="tel:0916861166" className="hover:text-incanto-primary">091.686.1166</a> - <a href="tel:0936321188" className="hover:text-incanto-primary">093.632.1188</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-incanto-bg-main/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-incanto-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 text-incanto-dark">Showroom TP.HCM</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Số 56, đường số 7, phường Bình Trưng, TP.HCM<br />
                      <a href="tel:0948839898" className="hover:text-incanto-primary">094.883.9898</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-incanto-bg-main/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-incanto-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 text-incanto-dark">Điện thoại văn phòng</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      <a href="tel:02437551199" className="hover:text-incanto-primary">024.3755.1199</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-incanto-bg-main/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-incanto-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 text-incanto-dark">Email</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      <a href="mailto:info@incantovietnam.com.vn" className="hover:text-incanto-primary">info@incantovietnam.com.vn</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-incanto-bg-main/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-incanto-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 text-incanto-dark">Giờ mở cửa</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Thứ 2 - Thứ 7: 09:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-incanto-dark">Theo dõi chúng tôi</h4>
              <div className="flex space-x-3 sm:space-x-4">
                <a href="https://www.facebook.com/incantovietnam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-incanto-primary hover:text-white transition-colors">
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="https://www.instagram.com/incantovietnam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-incanto-primary hover:text-white transition-colors">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="https://www.youtube.com/@incantovietnam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-incanto-primary hover:text-white transition-colors">
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <div className="bg-gradient-to-br from-incanto-cream to-incanto-light rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-incanto-dark">Gửi tin nhắn cho chúng tôi</h3>

              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary bg-white min-h-[44px]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary bg-white min-h-[44px]"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary bg-white min-h-[44px]"
                    placeholder="09xxxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Nội dung
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-incanto-primary focus:ring-1 focus:ring-incanto-primary bg-white"
                    placeholder="Nhập nội dung tin nhắn..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 sm:py-4 flex items-center justify-center space-x-2 text-sm sm:text-base min-h-[48px]"
                >
                  <span>Gửi tin nhắn</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
