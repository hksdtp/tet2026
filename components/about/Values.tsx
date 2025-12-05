// SVG Icons - Phong cách cổ phong
const HeartIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 42L21.09 39.36C10.8 30.12 4 24.06 4 16.5C4 10.44 8.84 5.6 14.9 5.6C18.32 5.6 21.6 7.18 24 9.66C26.4 7.18 29.68 5.6 33.1 5.6C39.16 5.6 44 10.44 44 16.5C44 24.06 37.2 30.12 26.91 39.36L24 42Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="22" r="6" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
  </svg>
)

const LeafIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 40C8 40 12 28 24 20C36 12 44 8 44 8C44 8 40 20 28 28C16 36 8 40 8 40Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 40C8 40 16 32 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    <path d="M20 32C20 32 28 28 32 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
  </svg>
)

const TeapotValueIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18C15 15 18 12 24 12C30 12 33 15 33 18V21H15V18Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse cx="24" cy="21" rx="9" ry="3" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M15 21V31.5C15 34.5 18 37.5 24 37.5C30 37.5 33 34.5 33 31.5V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M33 24C36 24 39 25.5 39 28.5C39 31.5 36 33 33 33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M15 27L11 25.5C9.5 25.1 8 26.2 8 27.7C8 29.2 9.5 30.3 11 29.9L15 28.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SparkleIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L27 18L41 21L27 24L24 38L21 24L7 21L21 18L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38 8L40 14L46 16L40 18L38 24L36 18L30 16L36 14L38 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <path d="M10 30L11 34L15 35L11 36L10 40L9 36L5 35L9 34L10 30Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
  </svg>
)

const values = [
  {
    icon: HeartIcon,
    title: 'Tận tâm',
    description: 'Đặt tâm huyết và chất lượng lên hàng đầu, mỗi sản phẩm là một tác phẩm nghệ thuật.'
  },
  {
    icon: LeafIcon,
    title: 'Bền vững',
    description: 'Sử dụng vật liệu tự nhiên, thân thiện với môi trường và quy trình sản xuất sạch.'
  },
  {
    icon: TeapotValueIcon,
    title: 'Truyền thống',
    description: 'Gìn giữ và phát huy những giá trị văn hóa trà đạo ngàn năm của dân tộc Việt Nam.'
  },
  {
    icon: SparkleIcon,
    title: 'Độc bản',
    description: 'Mỗi sản phẩm là duy nhất, mang đậm dấu ấn cá nhân của nghệ nhân chế tác.'
  }
]

export function Values() {

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-incanto-dark">Giá Trị Cốt Lõi</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bốn giá trị nền tảng định hình nên tinh thần INCANTO
            và cam kết của chúng tôi với mỗi khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`flex gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center ${
                index % 2 === 1 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-incanto-light to-incanto-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 text-incanto-primary">
                <value.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-incanto-dark">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-incanto-cream to-incanto-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
            <blockquote className="text-lg sm:text-xl lg:text-2xl italic text-gray-800 mb-4 sm:mb-6 leading-relaxed">
              "Không chỉ tạo ra những sản phẩm ấm trà, chúng tôi tạo ra những giá trị văn hóa
              để lại cho thế hệ mai sau. Mỗi ấm trà là một câu chuyện, một di sản."
            </blockquote>
            <cite className="text-sm sm:text-base lg:text-lg font-semibold text-incanto-accent">
              Nguyễn Hải Ninh - Nhà sáng lập INCANTO
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}
