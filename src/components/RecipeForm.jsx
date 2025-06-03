import { useState } from 'react';
import axios from 'axios';

function RecipeForm({ onRecipeAdded }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      console.log('Sending recipe with token:', token);
      const response = await axios.post(
        'http://localhost:5000/api/recipes',
        { title, ingredients, instructions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Recipe added successfully:', response.data);

      setTitle('');
      setIngredients('');
      setInstructions('');
      onRecipeAdded();
    } catch (err) {
      console.error('Add recipe failed:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Recipe</h3>
      <input
        type="text"
        placeholder="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      ></textarea><br />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      ></textarea><br />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;
