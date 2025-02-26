CookBookBuddy

CookBookBuddy is a full-stack recipe management application that allows users to create, edit, delete, and browse recipes. The app features a modern UI built with React, TypeScript, and Tailwind CSS, along with a REST API powered by Express and PostgreSQL.

📌 Features

📜 View Recipes: Display all recipes in a responsive grid layout.

🔍 Search Functionality: Easily find recipes by title or description.

📝 Recipe Details: View ingredients, instructions, and an image for each recipe.

✏️ Create/Edit Recipes: Add new recipes or update existing ones.

🗑 Delete Recipes: Remove unwanted recipes with a confirmation dialog.

📸 Image Upload: Upload photos for each recipe.

✅ Form Validation: Uses Zod to validate form inputs.

⚡ Fast API: A REST API using Express and PostgreSQL.

🎨 Modern UI: Built with React, TypeScript, and Tailwind CSS.

🤖 Built with AI

This application was entirely created with the help of AI, specifically utilizing the free version of Replit.com.

🚀 Getting Started

🔧 Prerequisites

Ensure you have the following installed:

Node.js (>= 18)

PostgreSQL (>= 14)

Git

📥 Clone the Repository

git clone https://github.com/evemf/CookBookBuddy.git
cd CookBookBuddy

⚙️ Setup Environment Variables

Create a .env file in the root directory and add:

DATABASE_URL=postgresql://user:password@localhost:5432/cookbookbuddy
PORT=5000

Replace user, password, and cookbookbuddy with your actual PostgreSQL credentials.

🛠 Install Dependencies

npm install

🔨 Run Database Migrations

npm run db:push

🏗 Build the Application

npm run build

▶️ Run the Application

Development Mode:

npm run dev

Production Mode:

npm start

🌐 Using the Application

Once the server is running, open your browser and navigate to:

http://localhost:5000

Use the search bar to find recipes.

Click on a recipe card to view details.

Add new recipes using the "Create Recipe" form.

Edit or delete existing recipes.

👤 Author

Evelia Molina🔗 GitHub Profile

📜 License

This project is licensed under the MIT License.

Happy cooking! 🍽️🔥