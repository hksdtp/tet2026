import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  const { params: pathSegments } = params

  // Handle both formats: /width/height and /width/height.png
  if (pathSegments.length >= 2) {
    const width = pathSegments[0]
    const height = pathSegments[1].replace('.png', '').replace('.jpg', '')

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">
          ${width} × ${height}
        </text>
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  }

  return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
}
