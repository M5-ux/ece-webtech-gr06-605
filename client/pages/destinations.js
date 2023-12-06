import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from 'pages/login.js';
import Link from 'next/link';

export default function Destination() {
  const [articles, setArticles] = useState([]);

  const [Articles2, setArticles2] = useState([]);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    async function chargerArticles() {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('id', { ascending: true })
        
      if (error) {
        console.error('Erreur de récupération des articles', error);
      } else {
        setArticles(data);
      }
    }

    chargerArticles();
  }, []);

  useEffect(() => {
    const lowercasedFilter = recherche.toLowerCase();
    const filteredData = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercasedFilter) ||
        article.description.toLowerCase().includes(lowercasedFilter),
    );
    setArticles2(filteredData);
  }, [recherche, articles]);

  return (
    <>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <input
              type="text"
              placeholder="Recherche..."
              className="p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Articles2.map((article, index) => (
              <div
                key={article.id}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
                className="bg-white rounded-lg shadow overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <Link href={`/destinationsDescription/destinations/${article.id}`}>
                 <img
                  src={article.image}
                  alt={article.title}
                  className="w-40 h-40 object-cover mb-2"
                />
                </Link>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-600 mb-2">{article.description}</p>
                  <p className="text-gray-600">Prix : {article.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
          <Link href="/destinationForm"
  className="bg-customBlue text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
  Ajouter une Destination +
</Link>

          </div>
        </div>
      </div>
    </>
  );
}
