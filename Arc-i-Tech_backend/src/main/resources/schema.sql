-- Drop tables in correct order (child tables first)
SET FOREIGN_KEY_CHECKS = 0;

-- Drop dependent tables first
DROP TABLE IF EXISTS chat_message_reactions;
DROP TABLE IF EXISTS chat_message_attachments;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS user_notifications;  -- Added this table
DROP TABLE IF EXISTS project_tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS user_profile;

SET FOREIGN_KEY_CHECKS = 1;

-- Create user_profile table
CREATE TABLE IF NOT EXISTS user_profile (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    access_status VARCHAR(50),
    program_type VARCHAR(100),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    project_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details TEXT,
    summary VARCHAR(500),
    progress_percentage INT,
    highlighted BOOLEAN,
    status VARCHAR(50),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    repo_link VARCHAR(255),
    project_manager_user_id BIGINT,
    owner_id BIGINT,
    client_id BIGINT,
    FOREIGN KEY (owner_id) REFERENCES user_profile(id),
    FOREIGN KEY (client_id) REFERENCES user_profile(id)
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT,
    sender_id BIGINT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (sender_id) REFERENCES user_profile(id)
);

-- Create chat_message_attachments table
CREATE TABLE IF NOT EXISTS chat_message_attachments (
    message_id BIGINT,
    attachment_url VARCHAR(255),
    FOREIGN KEY (message_id) REFERENCES chat_messages(id)
);

-- Create chat_message_reactions table
CREATE TABLE IF NOT EXISTS chat_message_reactions (
    message_id BIGINT,
    user_id BIGINT,
    emoji VARCHAR(50),
    FOREIGN KEY (message_id) REFERENCES chat_messages(id),
    FOREIGN KEY (user_id) REFERENCES user_profile(id),
    PRIMARY KEY (message_id, user_id, emoji)
);