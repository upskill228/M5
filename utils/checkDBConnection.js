export const checkDBConnection = async (db) => {
  try {
    await db.query("SELECT 1");
    console.log("✅ DB OK");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};