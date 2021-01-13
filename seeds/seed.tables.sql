BEGIN;

TRUNCATE
  "widget";

  INSERT INTO "widget" ("name")
  VALUES 
    ('Rog-Trok'),
    ('Nog-Lok'),
    ('arvan-zork'),
    ('monsta-truck'),
    ('Rezlak'),
    ('Nifty'),
    ('Revalve'),
    ('Omkorok');

COMMIT;

-- psql -U warptrail -d defaux -f ./seeds/seed.tables.sql

