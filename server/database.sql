--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.4
-- Dumped by pg_dump version 9.4.4
-- Started on 2017-07-28 17:22:52 WEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 173 (class 1259 OID 102559)
-- Name: todos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE todos (
    id integer NOT NULL,
    text character varying(255),
    status character varying(255)
);

--
-- TOC entry 172 (class 1259 OID 102557)
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE todos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 175 (class 1259 OID 102567)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    auth_token character varying(255),
    auth_expire timestamp without time zone,
    auth_ip character varying(255)
);

--
-- TOC entry 174 (class 1259 OID 102565)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 1929 (class 2604 OID 102562)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY todos ALTER COLUMN id SET DEFAULT nextval('todos_id_seq'::regclass);


--
-- TOC entry 1930 (class 2604 OID 102570)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 1932 (class 2606 OID 102564)
-- Name: todos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY todos
    ADD CONSTRAINT todos_pk PRIMARY KEY (id);


--
-- TOC entry 1934 (class 2606 OID 102575)
-- Name: users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


-- Completed on 2017-07-28 17:22:53 WEST

--
-- PostgreSQL database dump complete
--

