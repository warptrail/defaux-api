CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
  date_modified TIMESTAMPTZ
);

ALTER TABLE event
  ADD COLUMN
    user_id INTEGER REFERENCES "user"(id)
    ON DELETE SET NULL;