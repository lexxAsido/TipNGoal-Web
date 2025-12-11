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
const keywords = [
  "Player Biography",
  "Player Information",
];

// 🔍 Highlight function (React Web / Next.js)
const highlightKeywords = (text) => {
  if (!text) return "";

  const escapeRegex = (str) =>
    str.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");

  const regex = new RegExp(
    `(${keywords.map(escapeRegex).join("|")})`,
    "gi"
  );

  return text.split(regex).map((part, index) => {
    const match = keywords.find(
      (kw) => kw.toLowerCase() === part.toLowerCase()
    );

    if (match) {
      return (
        <span key={index} className="font-bold text-green-500">
          {part}
        </span>
      );
    }

    return <span key={index}>{part}</span>;
  });
};


/* ----------------------------- Gossip Card ----------------------------- */
const GossipCard = memo(({ article, featured = false }) => {
  const router = useRouter()
  const isTip = article.title?.toLowerCase().includes('tipngoal')

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
        position: 'relative', // 🔹 needed for badge absolute positioning
        
      }}
    >
      {/* TIPnGOAL BADGE */}
      {featured && isTip && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: 'black',
            padding: '6px 12px',
            borderRadius: 8,
            zIndex: 10,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            TIP<span className='text-green-500'>N</span>GOAL 🔥
          </h1>
        </div>
      )}

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
          width: featured ? "100%" : "100%",
          height: featured ? 500 : 200,
          objectFit: 'contain',
        }}
        className='p-5 rounded-md'
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
    color: "#333",
    fontSize: 14,
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    marginBottom: 8,
  }}
>
  {highlightKeywords(article.content)}
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
          Loading Sport Hub...
        </p>
      ) : (
        <>
          {/* ---------------- MAIN TIPNGOAL FEATURED ARTICLE ---------------- */}
          {mainArticle && (
  <div
    style={{
      marginBottom: 40,
      maxWidth: 900,
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      justifyContent: "center",
    }}
    
  >
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
