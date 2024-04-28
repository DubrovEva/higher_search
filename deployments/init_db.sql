CREATE TABLE users
(
    Avatar           VARCHAR,
    Description      VARCHAR,
    Email            VARCHAR(255) UNIQUE NOT NULL,
    Hash             VARCHAR             NOT NULL,
    ID               SERIAL PRIMARY KEY,
    Links            JSON,
    MiddleName       VARCHAR(255),
    Name             VARCHAR(255)        NOT NULL,
    Role             INTEGER,
    Salt             INTEGER             NOT NULL,
    ShortDescription VARCHAR,
    Surname          VARCHAR(255)        NOT NULL
);

CREATE TABLE studorgs
(
    Campus           INTEGER,
    CreatedAt        TIMESTAMP           NOT NULL,
    Description      VARCHAR,
    Faculty          INTEGER,
    ID               SERIAL PRIMARY KEY,
    Language         INTEGER,
    Links            JSON,
    Logo             VARCHAR,
    Name             VARCHAR(255) UNIQUE NOT NULL,
    ShortDescription VARCHAR,
    Status           INTEGER
);

CREATE TABLE tags
(
    ID     SERIAL PRIMARY KEY,
    Name   VARCHAR(255) UNIQUE NOT NULL,
    Parent INTEGER REFERENCES tags (ID)
);

CREATE TABLE studorg2tag
(
    StudorgID INTEGER NOT NULL REFERENCES studorgs (ID),
    TagID     INTEGER NOT NULL REFERENCES tags (ID)
);

CREATE TABLE user2studorg
(
    AdmissionTime TIMESTAMP,
    ContactInfo   VARCHAR,
    CustomRole    VARCHAR,
    Info          VARCHAR,
    IsContact     BOOLEAN,
    Role          INTEGER,
    StudorgID     INTEGER NOT NULL REFERENCES studorgs (ID),
    UserID        INTEGER NOT NULL REFERENCES users (ID)
);