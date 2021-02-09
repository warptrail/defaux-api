CREATE TABLE "category" (
  "category_id" SERIAL PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "real_name" TEXT NOT NULL,
  "encoded_name" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "color" TEXT NOT NULL
);

ALTER TABLE event
  ADD COLUMN
    category_id INTEGER REFERENCES "category"(category_id)
    ON DELETE SET NULL;