"use client"

import { useState } from "react"

export default function Home() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState("")

  const submit = async () => {
  const res = await fetch("/api/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: url
    })
  })

  const data = await res.json()
  console.log("FRONTEND DATA:", data)

  if (data.shortUrl) {
    setResult(data.shortUrl)
  } else {
    setResult("❌ Error from backend")
  }
}

  return (
    <main style={{ padding: 40 }}>
      <h1>Day 5 - URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter a long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>
        Shorten
      </button>

      <p>Result: https://nextjs-zero-7hqo.vercel.app/{result}</p>
    </main>
  )
}
