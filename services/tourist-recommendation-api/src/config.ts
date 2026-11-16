import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl:
    process.env.DATABASE_URL ??
    "postgresql://tourism:tourism@localhost:5432/tourism",
  webOrigin: process.env.WEB_ORIGIN ?? "http://localhost:5173",
};
