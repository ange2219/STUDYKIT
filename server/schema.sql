CREATE TABLE IF NOT EXISTS activation_codes (
  code_hash TEXT PRIMARY KEY,
  book_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activated_at TIMESTAMPTZ,
  device_id TEXT
);
CREATE TABLE IF NOT EXISTS devices (
  device_id TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS entitlements (
  device_id TEXT NOT NULL REFERENCES devices(device_id),
  book_id TEXT NOT NULL,
  code_hash TEXT NOT NULL UNIQUE REFERENCES activation_codes(code_hash),
  activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (device_id, book_id)
);
CREATE TABLE IF NOT EXISTS book_content_parts (
  book_id TEXT NOT NULL,
  part_index INTEGER NOT NULL,
  pathname TEXT NOT NULL,
  byte_length INTEGER NOT NULL,
  PRIMARY KEY (book_id, part_index)
);
CREATE TABLE IF NOT EXISTS activation_attempts (
  ip_hash TEXT PRIMARY KEY,
  window_start TIMESTAMPTZ NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS entitlements_device_idx ON entitlements(device_id);
