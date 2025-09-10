import { Client } from "pg";
import express from "express";

const pgClient = new Client({
  user: "neondb_owner",
  password: "npg_7AkX3FKZLisT",
  host: "ep-fancy-rain-adxbdwne-pooler.c-2.us-east-1.aws.neon.tech",
  database: "neondb",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function main() {
  try {
    await pgClient.connect();
    console.log("✅ Connected to DB");
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
  }
}
main();

const app = express();
app.use(express.json());

// Signup route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
    const { city, country, street, pincode } = req.body.address;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await pgClient.query("BEGIN");
    const usersInsertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const response = await pgClient.query(usersInsertQuery, [username, email, password]);
    const addressInsertQuery = `INSERT INTO addresses(user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)`;
    await pgClient.query(addressInsertQuery, [response.rows[0].id, city,country, street, pincode]);
    await pgClient.query("COMMIT");
    res.json({
      message: "✅ User signed up successfully",
      data: response.rows[0], // inserted user
    });
  } catch (err) {
    console.error("❌ Error in /signup:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/metadata", async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    SELECT users.id, users.username, users.email,
           addresses.city, addresses.country, addresses.street, addresses.pincode
    FROM users
    JOIN addresses ON users.id = addresses.user_id
    WHERE users.id = $1
  `;

  try {
    const response = await pgClient.query(query, [id]); // pass id here
    res.json({ data: response.rows });
  } catch (err) {
    console.error("❌ Error in /metadata:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});
