CREATE SCHEMA estudos AUTHORIZATION postgres;

CREATE TABLE estudos.marca (
	id serial4 NOT NULL,
	nome varchar NULL,
	criado_em timestamptz DEFAULT now() NULL,
	atualizado_em timestamptz DEFAULT now() NULL,
	CONSTRAINT marca_pk PRIMARY KEY (id)
);

CREATE TABLE estudos.modelo (
	id serial4 NOT NULL,
	nome varchar NULL,
	ano int4 NULL,
	cor varchar NULL,
	id_marca int4 NULL,
	CONSTRAINT modelo_pk PRIMARY KEY (id),
	CONSTRAINT marca_fk FOREIGN KEY (id_marca) REFERENCES estudos.marca(id)
);