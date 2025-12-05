// SVG Icons - Phong cách cổ phong
const OakTreeIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 44V28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M20 44H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <ellipse cx="24" cy="18" rx="14" ry="12" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M16 20C16 20 20 16 24 18C28 20 32 16 32 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <circle cx="20" cy="14" r="2" fill="currentColor" opacity="0.3"/>
    <circle cx="28" cy="16" r="1.5" fill="currentColor" opacity="0.3"/>
  </svg>
)

const PotteryIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 14C16 11 19 8 24 8C29 8 32 11 32 14V17H16V14Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse cx="24" cy="17" rx="8" ry="2.5" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M16 17C14 22 12 32 24 36C36 32 34 22 32 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <ellipse cx="24" cy="40" rx="6" ry="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M18 36V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 36V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const TempleIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L40 16H8L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 16V40H38V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6 40H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 40V28H30V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="22" r="3" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
  </svg>
)

const PineTreeIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L32 16H16L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 12L34 26H14L24 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 22L36 38H12L24 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 38V44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M20 44H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

const materials = [
  {
    name: 'Gỗ Sồi Bắc Mỹ',
    icon: OakTreeIcon,
    description: 'Nhập khẩu trực tiếp, tuổi thọ trên 50 năm, chống mối mọt tuyệt đối'
  },
  {
    name: 'Đất Tử Sa Hà Nam',
    icon: PotteryIcon,
    description: 'Loại đất quý hiếm tạo nên ấm tử sa danh tiếng, giữ trọn hương vị trà'
  },
  {
    name: 'Sứ Bát Tràng',
    icon: TempleIcon,
    description: 'Nơi sản xuất gốm sứ lừng danh Việt Nam với lịch sử hơn 700 năm'
  },
  {
    name: 'Gỗ Pơ Mu Tự Nhiên',
    icon: PineTreeIcon,
    description: 'Gỗ quý hiếm của miền núi Việt Nam, hương thơm tự nhiên tinh tế'
  }
]

export function Craftsmanship() {

  const process = [
    {
      step: '01',
      title: 'Tuyển chọn nguyên liệu',
      description: 'Kỹ thuật viên đi khắp các vùng miền để tuyển chọn những nguyên liệu tốt nhất'
    },
    {
      step: '02',
      title: 'Thiết kế mẫu mã',
      description: 'Các nghệ nhân phác thảo ý tưởng, kết hợp giữa truyền thống và hiện đại'
    },
    {
      step: '03',
      title: 'Chế tác thủ công',
      description: 'Tay nghề của người nghệ nhân biến những khối gỗ, đất thành tác phẩm nghệ thuật'
    },
    {
      step: '04',
      title: 'Hoàn thiện',
      description: 'Quá trình đánh bóng, xử lý bề mặt bằng các kỹ thuật truyền thống'
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-incanto-light/30 to-incanto-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-incanto-dark">Nghệ Thuật Chế Tác</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mỗi sản phẩm INCANTO là kết tinh của cả một quá trình tỉ mỉ,
            từ khâu tuyển chọn nguyên liệu đến công đoạn chế tác thủ công tinh xảo.
          </p>
        </div>

        {/* Materials */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-incanto-dark">Vật Liệu Cao Cấp</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {materials.map((material) => (
              <div key={material.name} className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg text-incanto-primary">
                  <material.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </div>
                <h4 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 text-incanto-dark">{material.name}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">{material.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-incanto-dark">Quá Trình Sản Xuất</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {process.map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-incanto-bg-main/60 mb-3 sm:mb-4">{item.step}</div>
                  <h4 className="font-semibold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 text-incanto-dark">{item.title}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                </div>
                {/* Arrow connector */}
                {parseInt(item.step) < process.length && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-incanto-primary">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <div className="inline-flex flex-col items-center p-5 sm:p-6 lg:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg max-w-lg mx-auto">
            <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-incanto-dark">Trải nghiệm quy trình sản xuất</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">
              Tham quan xưởng sản xuất và tận mắt chứng kiến nghệ nhân làm việc
            </p>
            <button className="btn-primary text-sm sm:text-base">
              Đặt lịch tham quan
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
