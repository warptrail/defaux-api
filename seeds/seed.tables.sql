BEGIN;

TRUNCATE
  "widget", "event", "user" RESTART IDENTITY CASCADE;

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

  INSERT INTO "event" ("date", "start_timestamp", "end_timestamp", "info", "category", "user_id")
  VALUES
    ('2021-01-01', '2021-01-01T00:00:00.001Z', '2021-01-01T23:59:59.999Z', 'New Years Day', 'holiday', 1),
    ('2021-01-06', '2021-01-06T12:32:15.001Z', '2021-01-06T13:59:59.999Z', 'Insurrection Day', 'holiday', 2);
    

COMMIT;

-- psql -U warptrail -d defaux -f ./seeds/seed.tables.sql

