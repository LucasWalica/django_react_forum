import React, { useState } from "react";
import { createComment } from "../../services/forumService";

interface CommentFormProps {
  postId: number; 
}

export default function PostCommentForm({ postId }: CommentFormProps) {
  const [text, setText] = useState("");
  const [stars, setStars] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    setIsSubmitting(true);

    try {
      const commentData = {
        fkPost: postId, 
        text,
        stars,
      };
      await createComment(commentData);
      console.log("Datos enviados:", commentData);
      setText(""); 
      setStars(0);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 m-2 bg-blue-500 rounded shadow-md text-blue-200">
      <h2 className="text-lg font-bold mb-4">Deja un comentario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="commentText">
            Comentario:
          </label>
          <textarea
            id="commentText"
            className="w-full p-2 border rounded text-black"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="stars">
            Calificación (0-5):
          </label>
          <input
            id="stars"
            type="number"
            className="w-full p-2 border rounded text-black"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            min={0}
            max={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>
    </div>
  );
}