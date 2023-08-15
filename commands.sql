CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 7);
INSERT INTO blogs (author, url, title, likes) VALUES ('Michael Chan', 'https://reactpatterns.com/', 'Go To Statement Considered Harmful', 5);

SELECT * FROM blogs
