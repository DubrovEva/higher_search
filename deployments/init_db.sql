CREATE TABLE users
(
    id                SERIAL PRIMARY KEY,

    email             VARCHAR(255) UNIQUE NOT NULL,
    name              VARCHAR(255)        NOT NULL,
    surname           VARCHAR(255)        NOT NULL,
    middlename        VARCHAR(255),
    project_role      INTEGER             NOT NULL,

    hash              VARCHAR             NOT NULL,
    salt              VARCHAR             NOT NULL,

    short_description VARCHAR,
    description       VARCHAR,

    avatar            VARCHAR,
    links             JSON,
    faculty           INTEGER,
    gender            INTEGER,
    birth             TIMESTAMP,
    education_info    VARCHAR
);

CREATE TABLE studorgs
(
    id                 SERIAL PRIMARY KEY,

    name               VARCHAR(255) UNIQUE NOT NULL,
    created_at         TIMESTAMP           NOT NULL,
    studorg_status     INTEGER             NOT NULL,

    moderation_status  INTEGER             NOT NULL,
    moderation_comment VARCHAR,

    short_description  VARCHAR,
    description        VARCHAR,

    campus             INTEGER,
    faculty            INTEGER,
    language           INTEGER,

    links              JSON,
    logo               VARCHAR
);

CREATE TABLE tags
(
    id     SERIAL PRIMARY KEY,

    name   VARCHAR(255) UNIQUE NOT NULL,
    parent INTEGER REFERENCES tags (id)
);

CREATE TABLE studorg2tag
(
    studorg_id INTEGER NOT NULL REFERENCES studorgs (ID),
    tag_id     INTEGER NOT NULL REFERENCES tags (ID)
);

CREATE TABLE user2studorg
(
    user_id        INTEGER NOT NULL REFERENCES users (ID),
    studorg_id     INTEGER NOT NULL REFERENCES studorgs (ID),
    role           INTEGER NOT NULL,

    admission_time TIMESTAMP,
    contact_info   VARCHAR,
    custom_role    VARCHAR,
    info           VARCHAR,
    is_contact     BOOLEAN
);