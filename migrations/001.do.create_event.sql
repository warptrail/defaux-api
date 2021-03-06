CREATE TABLE "event" (
  "id" SERIAL PRIMARY KEY,
  "date" TEXT NOT NULL,
	"timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
	-- "end_timestamp" TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '1 hour',
	"info" TEXT NOT NULL
);