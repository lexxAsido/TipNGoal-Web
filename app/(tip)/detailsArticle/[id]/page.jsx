'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/app/Services/firebaseConfig'
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore'

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
  const [related, setRelated] = useState([])

  /* ------------------ FETCH CURRENT ARTICLE ------------------ */
  useEffect(() => {
    if (!id) return

    const fetchArticle = async () => {
      const ref = doc(db, 'articles', id)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        const data = { id: snap.id, ...snap.data() }
        setArticle(data)

        /* ---------- Fetch related articles after article loads ---------- */
        fetchRelated(data)
      } else {
        setArticle(null)
      }
      setLoading(false)
    }

    fetchArticle()
  }, [id])

  /* ------------------ FETCH RELATED ARTICLES ------------------ */
  const fetchRelated = (current) => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'))

    onSnapshot(q, (snap) => {
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }))

      const filtered = all
        .filter((a) => a.id !== current.id)
        .filter((a) => {
          // Basic related logic: match words in title
          const words = current.title.toLowerCase().split(' ')
          return words.some((w) => a.title?.toLowerCase().includes(w))
        })
        .slice(0, 10) // limit

      setRelated(filtered)
    })
  }

  /* ---------------------------- LOADING UI ---------------------------- */
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
    <div style={{ minHeight: '100vh', padding: 20, color: '#fff' }}>
      
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
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 10 }}>
        {article.title}
      </h1>

      {/* DATE */}
      <p style={{ color: '#aaa', fontSize: 14, marginBottom: 30 }}>
        {article.createdAt?.toDate
          ? formatDate(article.createdAt.toDate())
          : 'Unknown Date'}
      </p>

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
            .filter((thumb) => typeof thumb === 'string' && thumb.trim() !== '')
            .map((thumb, index) => (
              <img
                key={index}
                src={thumb}
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
      <p style={{ fontSize: 18, lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 40 }}>
        {article.content}
      </p>

      {/* YOUTUBE PREVIEW */}
      {youTubeID && (
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ marginBottom: 10 }}>Video:</h3>
          <iframe
            width="100%"
            height="350"
            src={`https://www.youtube.com/embed/${youTubeID}`}
            allowFullScreen
            style={{ borderRadius: 10 }}
          ></iframe>
        </div>
      )}

  {/* BACK BUTTON */}
<div className="flex justify-end">
  <div
    onClick={() => router.back()}
    style={{
      marginTop: 40,
      marginBottom: 20,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: 'pointer',
      color: '#fff',
      fontSize: 16,
      fontWeight: 600,
    }}
    className="bg-green-500 px-3 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition"
  >
    <span style={{ fontSize: 24 }}>←</span>
    <span>Back</span>
  </div>
</div>





      {/* ----------------------------- RELATED ARTICLES SLIDER ----------------------------- */}
      {related.length > 0 && (
        <div style={{ marginTop: 30,  }}>
          <h2 
          className='font-bold mt-30 mb-12 max-md:text-base text-[26px]'
          >
            Related Articles
          </h2>

          <div
            style={{
              display: 'flex',
              gap: 16,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: 10,
            }}
          >
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => router.push(`/detailsArticle/${rel.id}`)}
                style={{
                  minWidth: 260,
                  backgroundColor: '#e0f1e3ff',
                  borderRadius: 14,
                  cursor: 'pointer',
                  paddingBottom: 10,
                  scrollSnapAlign: 'start',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}
              >
                <img
                  src={rel.mainImage || rel.imageUri || '/defaultImage.png'}
                  style={{
                    width: '100%',
                    height: 160,
                    objectFit: 'cover',
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                  }}
                />
                <div style={{ padding: 12 }}>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      color: 'black'
                    }}
                  >
                    {rel.title}
                  </h3>
                  <p style={{ color: 'black', marginTop: 6, fontSize: 12 }}>
                    {rel.createdAt?.toDate
                      ? formatDate(rel.createdAt.toDate())
                      : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 50 }}></div>
    </div>
  )
}
