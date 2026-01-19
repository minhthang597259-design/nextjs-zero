import { prisma } from "@/lib/prisma"

function generateCode() {
  return Math.random().toString(36).substring(2, 8)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const longUrl = body.url

    if (!longUrl) {
      return Response.json(
        { error: "URL is required" },
        { status: 400 }
      )
    }

    let shortCode = generateCode()

    // retry nếu bị trùng shortCode
    for (let i = 0; i < 5; i++) {
      const exists = await prisma.url.findUnique({
        where: { shortCode }
      })

      if (!exists) break
      shortCode = generateCode()
    }

    const saved = await prisma.url.create({
      data: {
        shortCode,
        longUrl
      }
    })

    return Response.json({
      shortUrl: saved.shortCode
    })
  } catch (error) {
    console.error("SHORTEN ERROR:", error)

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
