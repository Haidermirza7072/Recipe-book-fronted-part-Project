import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeForm from '../components/RecipeForm';

function Dashboard() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://recipe-book-backend-project.onrender.com/api/recipes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure it's an array before setting
      const data = Array.isArray(res.data) ? res.data : [];
      setRecipes(data);

    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      setRecipes([]); // fallback to empty
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://recipe-book-backend-project.onrender.com/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRecipes();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h2>My Recipes</h2>
      <RecipeForm onRecipeAdded={fetchRecipes} />

      {Array.isArray(recipes) && recipes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Ingredients</th>
              <th>Instructions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.title}</td>
                <td>{recipe.ingredients}</td>
                <td>{recipe.instructions}</td>
                <td>
                  <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center' }}>No recipes available. Add some!</p>
      )}
    </div>
  );
}

export default Dashboard;
