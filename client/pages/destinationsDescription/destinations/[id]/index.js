import { useState } from 'react';
import CommentForm from '../../../commentForm.js';
import { supabase } from '/utils/supabase';
import Image from 'next/image';

function UniqueDestination({ article, comments }) {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleShowCommentForm = () => {
    setShowCommentForm(true);
  };

  if (!article && !comments) {
    return <p className="text-center">Chargement...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <article className="shadow-lg rounded-lg overflow-hidden mb-6">
        <Image
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
          width={300}
          height={300}
        />
        <div className="bg-white bg-opacity-90 p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-700">{article.content}</p>
        </div>
      </article>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
        <ul className="list-disc pl-5 mb-6">
          {comments &&
            Array.isArray(comments) &&
            comments.map((comment) => (
              <li key={comment.id} className="mb-4 flex items-start space-x-4">
                {comment.profiles && comment.profiles.avatar_url ? (
                  <img
                    src={comment.profiles.avatar_url}
                    alt={comment.profiles.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    {/* Afficher une initiale ou un placeholder si l'avatar n'est pas disponible */}
                  </span>
                )}
                <div>
                  {comment.profiles ? (
                    <p className="font-semibold">{comment.profiles.username}</p>
                  ) : (
                    <p className="font-semibold">Utilisateur anonyme</p>
                  )}
                  <p>{comment.content}</p>
                </div>
              </li>
            ))}
        </ul>

        <button
          onClick={handleShowCommentForm}
          className="bg-customBlue hover:bg-customBlueGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter un commentaire
        </button>

        {showCommentForm && <CommentForm articleId={article.id} />}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const { data: article, error: articleError } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select(
      `
      *, 
      profiles:user_id (username, avatar_url)
    `,
    )
    .eq('id_article', id); // Assurez-vous que 'article_id' est le bon nom de colonne

  if (articleError || commentsError) {
    console.error(
      'Erreur lors de la récupération des données:',
      articleError || commentsError,
    );
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
      comments,
    },
  };
}

export default UniqueDestination;
