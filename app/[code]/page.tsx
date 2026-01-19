import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  if (!code) {
    return <h1>Invalid short URL</h1>
  }

  const record = await prisma.url.update({
    where: { shortCode: code },
    data: {
      clicks: { increment: 1 }, // 👈 QUAN TRỌNG
    },
  })

  redirect(record.longUrl)
}
