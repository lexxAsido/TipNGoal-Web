'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/app/Services/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

/* ----------------------------- Format Date ----------------------------- */
const formatDate = (date) => {
  if (!date) return 'Unknown Date'
  const d = new Date(date)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return d.toLocaleDateString('en-US', options)
}

/* ----------------------------- YT Extract Helper ----------------------------- */
const extractYouTubeID = (url) => {
  if (!url) return null
  const regex =
    /(?:youtube\.com\/(?:.*v=|v\/|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

/* ----------------------------- Article Details Page ----------------------------- */
export default function ArticleDetailsPage() {
  const { id } = useParams()
  const router = useRouter()

  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchArticle = async () => {
      const ref = doc(db, 'articles', id)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        setArticle({ id: snap.id, ...snap.data() })
      } else {
        setArticle(null)
      }
      setLoading(false)
    }

    fetchArticle()
  }, [id])

  if (loading) {
    return (
      <div style={{ color: '#ccc', textAlign: 'center', marginTop: 50 }}>
        Loading article...
      </div>
    )
  }

  if (!article) {
    return (
      <div style={{ color: '#ccc', textAlign: 'center', marginTop: 50 }}>
        Article not found.
      </div>
    )
  }

  const mainImage =
    article.mainImage || article.imageUri || '/defaultImage.png'

  const youTubeID = extractYouTubeID(article.youtubeLink)

  return (
    <div
      style={{
        // backgroundColor: '#1E1E1E',
        minHeight: '100vh',
        padding: 20,
        color: '#fff',
      }}
    >
      {/* BACK BUTTON */}
      {/* <button
        onClick={() => router.back()}
        style={{
          marginBottom: 20,
          backgroundColor: '#1dbf73',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        ← Back
      </button> */}

      {/* MAIN IMAGE */}
      <img
        src={mainImage}
        alt={article.title}
        style={{
          width: '150%',
          height: 350,
          objectFit: 'contain',
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      {/* TITLE */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 10,
          lineHeight: 1.2,
        }}
      >
        {article.title}
      </h1>

      {/* DATE */}
      <p style={{ color: '#aaa', fontSize: 14, marginBottom: 30 }}>
        {article.createdAt?.toDate
          ? formatDate(article.createdAt.toDate())
          : 'Unknown Date'}
      </p>

      {/* THUMBNAILS */}
    {/* THUMBNAILS */}
{Array.isArray(article.thumbnails) && article.thumbnails.length > 0 && (
  <div
    style={{
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      marginBottom: 25,
    }}
  >
    {article.thumbnails
      .filter((thumb) => typeof thumb === "string" && thumb.trim() !== "")
      .map((thumb, index) => (
        <img
          key={index}
          src={thumb}
          alt={`Thumbnail ${index + 1}`}
          style={{
            width: 240,
            height: 280,
            objectFit: 'contain',
            borderRadius: 10,
            
          }}
        />
      ))}
  </div>
)}


      {/* CONTENT */}
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
          marginBottom: 40,
        }}
      >
        {article.content}
      </p>

      {/* YOUTUBE PREVIEW */}
      {youTubeID && (
        <div style={{ marginBottom: 50 }}>
          <h3 style={{ marginBottom: 10 }}>Video:</h3>
          <iframe
            width="100%"
            height="350"
            src={`https://www.youtube.com/embed/${youTubeID}`}
            frameBorder="0"
            allowFullScreen
            style={{ borderRadius: 10 }}
          ></iframe>
        </div>
      )}

      <div style={{ height: 40 }}></div>
    </div>
  )
}
