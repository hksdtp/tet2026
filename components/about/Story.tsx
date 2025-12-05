import { Calendar } from 'lucide-react'

const timeline = [
  {
    year: 2014,
    title: 'Khởi đầu journey',
    description: 'INCANTO được thành lập từ niềm đam mê văn hóa trà đạo Việt Nam, bắt đầu với một xưởng chế tác nhỏ.'
  },
  {
    year: 2016,
    title: 'Bước đột phá',
    description: 'Ra mắt bộ sưu tập ấm trà cổ phong đầu tiên nhận được sự hoan nghênh từ các chuyên gia và người sành trà.'
  },
  {
    year: 2018,
    title: 'Mở rộng quy mô',
    description: 'Xây dựng xưởng sản xuất hiện đại kết hợp truyền thống, tuyển dụng những nghệ nhân tài hoa nhất.'
  },
  {
    year: 2020,
    title: 'Vươn xa',
    description: 'Sản phẩm INCANTO có mặt tại các thị trường quốc tế, mang văn hóa trà đạo Việt Nam ra thế giới.'
  },
  {
    year: 2024,
    title: 'Dấu ấn mới',
    description: 'Đạt cột mốc 5000 khách hàng, tiếp tục sứ mệnh lan tỏa giá trị văn hóa truyền thống.'
  }
]

export function Story() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-incanto-dark">Hành Trình Của Chúng Tôi</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Từ một xưởng thủ công nhỏ bé đến thương hiệu ấm trà cổ phong hàng đầu,
            mỗi năm đều là một cột mốc quan trọng trên hành trình gìn giữ và phát huy văn hóa Việt.
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {timeline.map((item) => (
            <div key={item.year} className="flex gap-4">
              {/* Year marker */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-incanto-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {item.year.toString().slice(-2)}
                </div>
                <div className="w-0.5 flex-1 bg-gradient-to-b from-incanto-primary to-incanto-bg-main mt-2" />
              </div>
              {/* Content */}
              <div className="bg-gradient-to-br from-incanto-cream to-incanto-light rounded-xl sm:rounded-2xl p-4 sm:p-6 flex-1 pb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-incanto-dark">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Timeline */}
        <div className="relative hidden lg:block">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-incanto-primary via-incanto-bg-main to-incanto-primary" />

          {/* Timeline items */}
          <div className="space-y-16">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-1/2" />

                {/* Year marker */}
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 bg-incanto-primary rounded-full flex items-center justify-center text-white font-bold z-10">
                    {item.year.toString().slice(-2)}
                  </div>
                  <Calendar className="absolute w-6 h-6 text-incanto-bg-main -z-10" />
                </div>

                {/* Content */}
                <div className={`w-1/2 px-8 ${index % 2 === 0 ? 'text-right' : ''}`}>
                  <div className="bg-gradient-to-br from-incanto-cream to-incanto-light rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-3 text-incanto-dark">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
