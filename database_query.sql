CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- This is necessary to use gen_random_uuid()

SELECT * FROM pg_extension;

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    nickname VARCHAR(50) NOT NULL,
    email VARCHAR(250),
    number_phone VARCHAR(16) NOT NULL,
    visibility_number_phone BOOLEAN DEFAULT FALSE,
    visibility_email BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	last_enter TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    url_avatar VARCHAR(250)
);

CREATE TABLE code_confirmation (
	code_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	email_code VARCHAR(6),
	number_phone_code VARCHAR(6),
	expire_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	user_id UUID REFERENCES users(user_id) NOT NULL,
	CHECK (email_code ~ '^\d{6}$' OR email_code IS NULL),
	CHECK (number_phone_code ~ '^\d{6}$' OR number_phone_code IS NULL)
);

ALTER TABLE code_confirmation
DROP CONSTRAINT code_confirmation_user_id_fkey;

ALTER TABLE code_confirmation
ADD CONSTRAINT code_confirmation_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE;

alter table users rename column nickname to individual_nickname;
alter table users add column nickname varchar(70);
