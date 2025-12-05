'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.')
  }

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-incanto-light/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-incanto-dark mb-4"
          >
            Liên Hệ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="font-display text-2xl font-bold text-incanto-dark mb-6">Showroom</h2>

              {/* Showroom 1 */}
              <div className="mb-8 p-5 bg-incanto-light/30 rounded-2xl">
                <h3 className="font-semibold text-incanto-primary mb-3">SHOWROOM 1 - HÀ NỘI</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-incanto-primary flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Số 24, Villa D, khu The Manor, phường Từ Liêm, thành phố Hà Nội</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-incanto-primary flex-shrink-0" />
                    <div className="flex flex-wrap gap-x-3">
                      <a href="tel:0916861166" className="text-gray-900 font-medium hover:text-incanto-primary transition-colors">091.686.1166</a>
                      <span className="text-gray-400">-</span>
                      <a href="tel:0936321188" className="text-gray-900 font-medium hover:text-incanto-primary transition-colors">093.632.1188</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showroom 2 */}
              <div className="mb-8 p-5 bg-incanto-light/30 rounded-2xl">
                <h3 className="font-semibold text-incanto-primary mb-3">SHOWROOM 2 - TP.HCM</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-incanto-primary flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Số 56, đường số 7, phường Bình Trưng, Thành phố Hồ Chí Minh</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-incanto-primary flex-shrink-0" />
                    <a href="tel:0948839898" className="text-gray-900 font-medium hover:text-incanto-primary transition-colors">094.883.9898</a>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-incanto-primary flex-shrink-0" />
                  <a href="mailto:info@incantovietnam.com.vn" className="text-gray-900 font-medium hover:text-incanto-primary transition-colors">info@incantovietnam.com.vn</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-incanto-primary flex-shrink-0" />
                  <a href="tel:02437551199" className="text-gray-900 font-medium hover:text-incanto-primary transition-colors">024.3755.1199</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-incanto-primary flex-shrink-0" />
                  <p className="text-gray-700">09:00 - 18:00 (Thứ 2 - Thứ 7)</p>
                </div>
              </div>

              {/* Legal */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Đơn vị chủ quản: Công ty TNHH TUISS Việt Nam - GPKD số: 0106622970 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày 19.08.2014.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-incanto-primary focus:ring-2 focus:ring-incanto-primary/20 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-incanto-primary focus:ring-2 focus:ring-incanto-primary/20 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-incanto-primary focus:ring-2 focus:ring-incanto-primary/20 outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <textarea
                  placeholder="Nội dung tin nhắn..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-incanto-primary focus:ring-2 focus:ring-incanto-primary/20 outline-none transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-incanto-primary hover:bg-incanto-dark text-white font-medium px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors min-h-[48px]"
                >
                  <Send className="w-4 h-4" />
                  Gửi tin nhắn
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

