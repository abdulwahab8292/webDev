"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const pgClient = new pg_1.Client({
    user: "neondb_owner",
    password: "npg_7AkX3FKZLisT",
    host: "ep-fancy-rain-adxbdwne-pooler.c-2.us-east-1.aws.neon.tech",
    database: "neondb",
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pgClient.connect();
            console.log("✅ Connected to DB");
        }
        catch (err) {
            console.error("❌ Error connecting to DB:", err);
        }
    });
}
main();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Signup route
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const { city, country, street, pincode } = req.body.address;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        yield pgClient.query("BEGIN");
        const usersInsertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
        const response = yield pgClient.query(usersInsertQuery, [username, email, password]);
        const addressInsertQuery = `INSERT INTO addresses(user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)`;
        yield pgClient.query(addressInsertQuery, [response.rows[0].id, city, country, street, pincode]);
        yield pgClient.query("COMMIT");
        res.json({
            message: "✅ User signed up successfully",
            data: response.rows[0], // inserted user
        });
    }
    catch (err) {
        console.error("❌ Error in /signup:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}));
app.get("/metadata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield pgClient.query(query, [id]); // pass id here
        res.json({ data: response.rows });
    }
    catch (err) {
        console.error("❌ Error in /metadata:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}));
app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});
