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
const GossipCard = memo(({ article }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/detailsArticle/${article.id}`)}
      style={{
        backgroundColor: '#fff',
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
        style={{ width: '100%', height: 200, objectFit: 'cover' }}
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
          className='font-bold'
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
        <p style={{ color: 'green', fontSize: 12 }} className='font-bold'>
          {article.createdAt?.toDate ? formatDate(article.createdAt.toDate()) : 'Unknown Date'}
        </p>
      </div>
    </div>
  )
})

/* ----------------------------- Gossip Page ----------------------------- */
const GossipPage = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedArticles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setArticles(fetchedArticles)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div style={{  minHeight: '100vh', padding: 20 }}>
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
        Football Hub
      </h1>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#bbb', marginTop: 40 }}>Loading gossip...</p>
      ) : articles.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {articles.map((article) => (
            <GossipCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#777', marginTop: 40 }}>
          No gossip yet... Be the first to spill!
        </p>
      )}
    </div>
  )
}

export default GossipPage
