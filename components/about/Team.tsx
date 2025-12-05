import Image from 'next/image'

const teamMembers = [
  {
    name: 'Nguyễn Hải Ninh',
    position: 'Nhà sáng lập & Nghệ nhân chính',
    bio: 'Với 15 năm kinh nghiệm trong ngành gốm sứ và đam mê văn hóa trà đạo, ông là người đặt nền móng cho INCANTO.',
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Trần Thị Lan',
    position: 'Thiết kế trưởng',
    bio: 'Cảm hứng từ hoa văn truyền thống Việt Nam, cô tạo ra những thiết kế độc đáo kết hợp xưa và nay.',
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Lê Văn Hùng',
    position: 'Nghệ nhân chế tác',
    bio: 'Tay nghề điêu luyện từ 3 thế hệ, ông là chuyên gia về chế tác ấm trà từ gỗ sồi và tử sa.',
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Phạm Thị Mai',
    position: 'Quản lý chất lượng',
    bio: 'Đảm bảo mỗi sản phẩm trước khi đến tay khách hàng đều đạt tiêu chuẩn cao nhất về chất lượng.',
    image: '/api/placeholder/300/300'
  }
]

export function Team() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-incanto-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-incanto-dark">Đội Ngũ INCANTO</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gặp gỡ những nghệ nhân và chuyên gia tâm huyết,
            những người đã cùng nhau tạo nên thương hiệu INCANTO.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow">
                {/* Image */}
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base lg:text-xl font-bold mb-0.5 sm:mb-1 text-incanto-dark">{member.name}</h3>
                  <p className="text-incanto-accent font-medium text-xs sm:text-sm lg:text-base mb-2 sm:mb-3">{member.position}</p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed hidden sm:block">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join us CTA */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-incanto-dark">Gia nhập đội ngũ của chúng tôi</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 lg:mb-8">
            Chúng tôi luôn tìm kiếm những tài năng đam mê nghệ thuật và văn hóa truyền thống
          </p>
          <button className="btn-secondary text-sm sm:text-base">
            Xem cơ hội việc làm
          </button>
        </div>
      </div>
    </section>
  )
}
