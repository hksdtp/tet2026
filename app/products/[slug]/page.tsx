import { ProductDetails } from '@/components/ProductDetails'
import { RelatedProducts } from '@/components/RelatedProducts'
import { getProductBySlug } from '@/data/products'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <ProductDetails slug={params.slug} />
      <RelatedProducts currentProductId={product?.id} />
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)
  return {
    title: product ? `${product.name} - INCANTO` : 'INCANTO - Chi tiết sản phẩm',
    description: product?.description || 'Khám phá sản phẩm ấm trà cổ phong tinh hoa từ INCANTO',
  }
}
