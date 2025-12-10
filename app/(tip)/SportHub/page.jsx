'use client'

import React, { useEffect, useState, memo } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db } from '@/app/Services/firebaseConfig'

/* ----------------------------- Format Date Helper ----------------------------- */
const formatDate = (date) => {
  if (!date) return 'Unknown Date'
  const d = new Date(date)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return d.toLocaleDateString('en-US', options)
}

/* ----------------------------- Gossip Card ----------------------------- */
const GossipCard = memo(({ article, featured = false }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/detailsArticle/${article.id}`)}
      style={{
        backgroundColor: '#e0f1e3ff',
        borderRadius: 15,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={
          article.mainImage
            ? article.mainImage
            : article.imageUri
            ? article.imageUri
            : '/defaultImage.png'
        }
        alt={article.title}
        style={{
          width: '100%',
          height: featured ? 500 : 200, // now works
          objectFit: 'cover',
        }}
      />

      <div style={{ padding: 12 }}>
        <h3
          style={{
            color: '#000',
            fontSize: 20,
            marginBottom: 6,
            lineHeight: 1.2,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          className="font-bold"
        >
          {article.title}
        </h3>

        <p
          style={{
            color: '#333',
            fontSize: 14,
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 8,
          }}
        >
          {article.content}
        </p>

        <p style={{ color: 'green', fontSize: 12 }} className="font-bold">
          {article.createdAt?.toDate ? formatDate(article.createdAt.toDate()) : 'Unknown Date'}
        </p>
      </div>
    </div>
  )
})


/* ----------------------------- Gossip Page ----------------------------- */
const GossipPage = () => {
  const [mainArticle, setMainArticle] = useState(null)
  const [otherArticles, setOtherArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      /* ---------------------------------------------
         FIND MOST RECENT TIPnGOAL ARTICLE
      --------------------------------------------- */
      const tipArticles = fetched.filter((item) =>
        item.title?.toLowerCase().includes('tipngoal')
      )

      const main = tipArticles.length > 0 ? tipArticles[0] : null

      /* ---------------------------------------------
         OTHER ARTICLES (excluding main one)
      --------------------------------------------- */
      const others = main
        ? fetched.filter((item) => item.id !== main.id)
        : fetched

      setMainArticle(main)
      setOtherArticles(others)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div style={{ minHeight: '100vh', padding: 20 }}>
      <h1
        style={{
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 600,
          color: '#fff',
          borderBottom: '4px solid #1dbf73',
          display: 'inline-block',
          marginBottom: 40,
        }}
      >
        Sport Hub
      </h1>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#bbb', marginTop: 40 }}>
          Loading gossip...
        </p>
      ) : (
        <>
          {/* ---------------- MAIN TIPNGOAL FEATURED ARTICLE ---------------- */}
          {mainArticle && (
            <div style={{ marginBottom: 40 }}>
              {/* <h2
                style={{
                  color: '#1dbf73',
                  fontSize: 26,
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                Featured — TIPnGOAL
              </h2> */}
              <GossipCard article={mainArticle} featured={true} /> 
            </div>
          )}

          {/* ---------------- OTHER ARTICLES GRID ---------------- */}
          <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    justifyItems: 'center',
    maxWidth: 1200,
    margin: '0 auto',  // FULL GRID CENTERED
    gap: 20,
  }}
>

            {otherArticles.map((article) => (
              <GossipCard key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default GossipPage
