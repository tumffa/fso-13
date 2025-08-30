CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (title, author, url, likes) VALUES
  ('First Blog Post', 'Alice', 'https://example.com/first', 10);

INSERT INTO blogs (title, author, url, likes) VALUES
  ('Second Blog Post', 'Bob', 'https://example.com/second', 5);