import React, { useState } from "react";
import { createPost } from "../../services/forumService";

export default function PostPostForm() {
  const [title, setTitle] = useState("");
  const [topic1, setTopic1] = useState("");
  const [topic2, setTopic2] = useState("");
  const [desc, setDesc] = useState("");
  const [stars, setStars] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!title.trim() || !topic1.trim() || !desc.trim()) {
      alert("Por favor completa los campos requeridos: Título, Tema 1 y Descripción.");
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        fkCreator: 1, // Cambia esto a un valor dinámico si es necesario
        title,
        topic_1: topic1,
        topic_2: topic2,
        desc,
        stars,
      };

      await createPost(postData);

      console.log("Datos enviados:", postData);
      setTitle("");
      setTopic1("");
      setTopic2("");
      setDesc("");
      setStars(0);
    } catch (error) {
      console.error("Error al crear el post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 m-2 bg-blue-500 rounded shadow-md text-blue-200">
      <h2 className="text-lg font-bold mb-4">Crea un post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="title">
            Título:
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border rounded text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="topic1">
            Tema 1:
          </label>
          <input
            id="topic1"
            type="text"
            className="w-full p-2 border rounded text-black"
            value={topic1}
            onChange={(e) => setTopic1(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="topic2">
            Tema 2 (opcional):
          </label>
          <input
            id="topic2"
            type="text"
            className="w-full p-2 border rounded text-black"
            value={topic2}
            onChange={(e) => setTopic2(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="desc">
            Descripción:
          </label>
          <textarea
            id="desc"
            className="w-full p-2 border rounded text-black"
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Crear Post"}
        </button>
      </form>
    </div>
  );
}
