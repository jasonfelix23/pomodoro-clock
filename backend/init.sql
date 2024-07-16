-- init.sql

-- Drop table if it exists
DROP TABLE IF EXISTS public.users;

-- Create table
CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    pomo_session_duration INTEGER,
    pomo_session_break INTEGER,
    total_sessions INTEGER DEFAULT 0,
    total_tasks INTEGER DEFAULT 0
);

-- Grant permissions
GRANT ALL ON TABLE public.users TO pomodoro_user;
