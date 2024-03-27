CREATE TABLE users
(
    ID          SERIAL PRIMARY KEY,
    Name        VARCHAR(255)        NOT NULL,
    Surname     VARCHAR(255)        NOT NULL,
    MiddleName  VARCHAR(255),
    Description VARCHAR,
    Email       VARCHAR(255) UNIQUE NOT NULL,
    Contacts    JSON,
    Salt        INTEGER             NOT NULL,
    Hash        VARCHAR             NOT NULL,
    Role        VARCHAR(255)
)

CREATE TABLE studorgs
(
    ID          SERIAL PRIMARY KEY,
    Name        VARCHAR(255) UNIQUE NOT NULL,
    Description VARCHAR             NOT NULL,
    Head        INTEGER             NOT NULL REFERENCES users (ID),
    Contacts    JSON,
    Status      VARCHAR(255)        NOT NULL,
    Faculty     VARCHAR(255),
    Campus      VARCHAR(255)        NOT NULL,
    Links       JSON,
    Language    VARCHAR(255)        NOT NULL
);

CREATE TABLE tags
(
    ID     SERIAL PRIMARY KEY,
    Name   VARCHAR(255) UNIQUE NOT NULL,
    Parent INTEGER REFERENCES tags (ID)
);

CREATE TABLE studorg2tag
(
    studorg_ID INTEGER NOT NULL REFERENCES studorgs (ID),
    tag_id     INTEGER NOT NULL REFERENCES tags (ID)
);