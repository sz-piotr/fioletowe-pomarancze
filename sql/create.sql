CREATE TABLE animals
(
    id bigserial NOT NULL,
    name character varying(100) NOT NULL,
    sound character varying(20),
    CONSTRAINT animals_pk PRIMARY KEY (id)
);
ALTER TABLE animals
    OWNER TO "fioletowe";

CREATE TABLE users
(
    id bigserial NOT NULL,
    username character varying(100) NOT NULL,
    hash character(88) NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id),
    CONSTRAINT users_username_un UNIQUE (username)
);
ALTER TABLE users
    OWNER TO "fioletowe";
