import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  if (!code) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Invalid short URL</h1>
      </div>
    )
  }

  const record = await prisma.url.findUnique({
    where: {
      shortCode: code,
    },
  })

  if (!record) {
    return (
      <div style={{ padding: 40 }}>
        <h1>404 - Link not found</h1>
        <p>The short URL does not exist.</p>
      </div>
    )
  }

  redirect(record.longUrl)
}
