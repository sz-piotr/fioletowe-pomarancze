CREATE TABLE animals
(
  id bigserial NOT NULL,
  name character varying(100) NOT NULL,
  sound character varying(20),
  CONSTRAINT animals_pk PRIMARY KEY (id)
);
ALTER TABLE animals
  OWNER TO "user";
