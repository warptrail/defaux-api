BEGIN;

TRUNCATE
  "widget", "event", "user", "category" RESTART IDENTITY CASCADE;

  INSERT INTO "user" ("username", "password")
  VALUES
    ('warptrail', '$2a$10$aWAZFAz3DZHC64BrppAbI.cHudPtSkyphtMk.xJPo54bjZpRtcDAS'),
    ('larry', '$2a$10$GabU0ZPJ9sUW6wqnpobIc.g6L3OaDVqDKn7MfCMN4S4h6hvsOy3Qq');

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

  INSERT INTO "category" ("user_id", "real_name", "encoded_name", "icon", "color")
  VALUES
    (1, 'cigar', 'death stick', 'smoking', '#000'),
    (1, 'soda', 'protop', 'soda', '#324'),
    (2, 'cigar', 'death stick', 'smoking', '#000');


  INSERT INTO "event" ("date", "timestamp", "info", "category_id", "user_id")
  VALUES
    ('2021-01-01', '2021-01-01T00:00:00.001Z', 'New Years Day', 1, 1),
    ('2021-02-06', '2021-01-06T12:32:15.001Z', 'Harrys birthday', 1, 1);
    

COMMIT;

-- psql -U warptrail -d defaux -f ./seeds/seed.tables.sql

