import { useEffect } from "react";

const App = () => {
  const migrateUsers = async () => {
    const users = [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ];

    try {
      const response = await fetch(
        "http://localhost:3000/api/migration/migrate-users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Migration successful:", data.message);
      } else {
        console.log("Migration failed:", data.error);
      }
    } catch (error) {
      console.error("Error during migration:", error);
    }
  };

  useEffect(() => {
    // Trigger the migration when the component mounts
    migrateUsers();
  }, []);

  return (
    <div>
      <h1>Migration Demo</h1>
      <p>Migration data to the database upon loading...</p>
    </div>
  );
};

export default App;
