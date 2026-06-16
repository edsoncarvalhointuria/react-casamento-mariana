import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.scss";
import { ArrowDown, ArrowUp, Check, Gift, House, MapPin, MoveLeft, Pointer, Video, VideoOff } from "lucide-react";
import { AnimatePresence, motion, stagger, type Variants } from "framer-motion";
import Cozinha from "./assets/Cozinha";

const DATA_CASAMENTO = new Date("2026-10-24T12:00:00");
const HORARIO = 18;

const variantsContainer: Variants = {
    initial: {},
    animate: { transition: { delayChildren: stagger(0.05) } },
};

const variantsItem: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: -0 },
};

interface ItemInterface {
    img: string;
    link: string;
}
interface SecaoInterface {
    titulo: string;
    img: string | React.ComponentType;
    lista: ItemInterface[];
}

const itensCozinha = [
    // { img: "/itens/item1.png", link: "https://a.co/d/0GJhQWr" },
    { img: "/itens/item2.png", link: "https://a.co/d/8aVnetd" },
    {
        img: "/itens/microondas-removebg-preview.png",
        link: "https://a.co/d/0crvrO70",
    },
    {
        img: "/itens/Airfryer-removebg-preview.png",
        link: "https://a.co/d/07H8FY5r",
    },
    {
        img: "/itens/Batedeira-removebg-preview.png",
        link: "https://a.co/d/00rwaLzK",
    },
    {
        img: "/itens/Jogodejantar-removebg-preview.png",
        link: "https://a.co/d/0egmDy9F",
    },
    {
        img: "/itens/Faqueiro-removebg-preview.png",
        link: "https://a.co/d/01r9Oqbd",
    },
    {
        img: "/itens/Liquidificador-removebg-preview.png",
        link: "https://a.co/d/00lSEww7",
    },
    {
        img: "/itens/Marinequesdevidro-removebg-preview.png",
        link: "https://a.co/d/081Hlq3n",
    },

    // { img: "/itens/item3.png", link: "https://a.co/d/5Ng2kx0" },
    // { img: "/itens/item4.png", link: "https://a.co/d/24GhebR" },
    // { img: "/itens/item5.png", link: "https://a.co/d/azlXxV5" },
    // { img: "/itens/item6.png", link: "https://a.co/d/cVe8MBu" },
    { img: "/itens/item7.png", link: "https://a.co/d/hxNwkRk" },
    { img: "/itens/item8.png", link: "https://a.co/d/2xgxGbw" },
    { img: "/itens/item9.png", link: "https://a.co/d/b4vTyDv" },

    { img: "/itens/item10.png", link: "https://a.co/d/6v5uczJ" },
    // { img: "/itens/item11.png", link: "https://a.co/d/4FKU9Oz" },
    // { img: "/itens/item12.png", link: "https://a.co/d/1s4D0PE" },
    // { img: "/itens/item13.png", link: "https://a.co/d/cKcgvop" },
    // { img: "/itens/item14.png", link: "https://a.co/d/aut1i2c" },
    // { img: "/itens/item15.png", link: "https://a.co/d/9VJQET5" },
    // { img: "/itens/item16.png", link: "https://a.co/d/f86dywP" },
    // { img: "/itens/item17.png", link: "https://a.co/d/bfhjoQB" },
    // { img: "/itens/item18.png", link: "https://a.co/d/54ezO4l" },

    // { img: "/itens/item19.png", link: "https://a.co/d/bFrrUKt" },
    // { img: "/itens/item20.png", link: "https://a.co/d/bcM33W0" },
    { img: "/itens/item21.png", link: "https://a.co/d/4TFqCVS" },
    { img: "/itens/item22.png", link: "https://a.co/d/dfwWixM" },
    // { img: "/itens/item23.png", link: "https://a.co/d/hlLxsPc" },
    // { img: "/itens/item24.png", link: "https://a.co/d/3zMorwk" },
    // { img: "/itens/item25.png", link: "https://a.co/d/esY9CK8" },
    { img: "/itens/item26.png", link: "https://a.co/d/dwKIP2F" },
    // { img: "/itens/item27.png", link: "https://a.co/d/c3Fse2e" },

    { img: "/itens/item28.png", link: "https://a.co/d/dqFIowv" },
    { img: "/itens/item29.png", link: "https://a.co/d/2homcG5" },
    { img: "/itens/item30.png", link: "https://a.co/d/eclKQnA" },
    { img: "/itens/item31.png", link: "https://a.co/d/2CuZb4k" },
    { img: "/itens/item32.png", link: "https://a.co/d/fnFTYiy" },
    { img: "/itens/item33.png", link: "https://a.co/d/gdV391h" },
    { img: "/itens/item34.png", link: "https://a.co/d/730xFk7" },
    { img: "/itens/item35.png", link: "https://a.co/d/b2Joc1g" },
    { img: "/itens/item36.png", link: "https://a.co/d/9ZJQREp" },

    // { img: "/itens/item37.png", link: "https://a.co/d/cVerSez" },
    { img: "/itens/item38.png", link: "https://a.co/d/93YZNv2" },
    // { img: "/itens/item39.png", link: "https://a.co/d/3691LLJ" },
    // { img: "/itens/item40.png", link: "https://a.co/d/aveIa8A" },
    { img: "/itens/item41.png", link: "https://a.co/d/8yO2OPi" },
    { img: "/itens/item42.png", link: "https://a.co/d/dsh8BJQ" },
    // { img: "/itens/item43.png", link: "https://a.co/d/6wSMbso" },
    { img: "/itens/item44.png", link: "https://a.co/d/60ZfVh4" },
    // { img: "/itens/item45.png", link: "https://a.co/d/12chQjJ" },

    // { img: "/itens/item46.png", link: "https://a.co/d/azE5oeU" },
    // { img: "/itens/item47.png", link: "https://a.co/d/c2HNWgN" },
    // { img: "/itens/item48.png", link: "https://a.co/d/26LrUoA" },
    // { img: "/itens/item49.png", link: "https://a.co/d/8ELEE1P" },
    // { img: "/itens/item50.png", link: "https://a.co/d/avQVJz2" },
    // { img: "/itens/item51.png", link: "https://a.co/d/cls16YN" },
    // { img: "/itens/item52.png", link: "https://a.co/d/4sMOQ6N" },
    { img: "/itens/item53.png", link: "https://a.co/d/4zjZ7be" },
];
const itensSala = [
    { img: "/itens/item54.jpg", link: "https://a.co/d/fgfBWea" },
    { img: "/itens/item55.png", link: "https://a.co/d/aJFrnON" },
    { img: "/itens/item56.png", link: "https://a.co/d/20hlUVz" },
    { img: "/itens/item57.png", link: "https://a.co/d/1apkNfM" },
];
const itensBanheiro = [
    { img: "/itens/item58.png", link: "https://a.co/d/5nUpnkh" },
    { img: "/itens/item59.png", link: "https://a.co/d/gMzwApj" },
    { img: "/itens/item60.png", link: "https://a.co/d/4Xuiz5x" },
    { img: "/itens/item61.png", link: "https://a.co/d/b607NJt" },
    { img: "/itens/item62.png", link: "https://a.co/d/6vQncRk" },
    { img: "/itens/item63.png", link: "https://a.co/d/0jlmjEe" },
    { img: "/itens/item64.png", link: "https://a.co/d/4dKnuOy" },
    {
        img: "/itens/TolhadeBanho-removebg-preview.png",
        link: "https://a.co/d/0fNDjlOb",
    },
    {
        img: "/itens/Cesto-removebg-preview.png",
        link: "https://a.co/d/0bw2x0cj",
    },
];
const itensQuarto = [
    { img: "/itens/item65.png", link: "https://a.co/d/fWibduC" },
    { img: "/itens/item66.png", link: "https://a.co/d/da5J5SM" },
    { img: "/itens/item67.png", link: "https://a.co/d/0jcClCV0" },
    { img: "/itens/item68.png", link: "https://a.co/d/1fwyaOy" },
    { img: "/itens/item69.png", link: "https://a.co/d/emu56VP" },
    { img: "/itens/item70.png", link: "https://a.co/d/0ZpcgY6" },
    { img: "/itens/item71.png", link: "https://a.co/d/7VASify" },
    { img: "/itens/item72.png", link: "https://a.co/d/hOj3QOw" },
    { img: "/itens/item73.png", link: "https://a.co/d/1PcxHEZ" },
];
const itensServico = [
    { img: "/itens/item74.png", link: "https://a.co/d/3ymBguN" },
    // { img: "/itens/item75.png", link: "https://a.co/d/4sWJeyW" },
    // { img: "/itens/item76.png", link: "https://a.co/d/cR3xmYB" },
    // {
    //     img: "/itens/Ferro-removebg-preview.png",
    //     link: "https://a.co/d/03oBAoYP",
    // },
    { img: "/itens/item77.png", link: "https://a.co/d/2mGa0lh" },
    { img: "/itens/item78.png", link: "https://a.co/d/3YXYRLx" },
    { img: "/itens/item79.png", link: "https://a.co/d/cpi4Ium" },
    // { img: "/itens/item80.png", link: "https://a.co/d/fJCGbTj" },
];

const secoes = [
    { titulo: "Presentes para Cozinha", img: Cozinha, lista: itensCozinha },
    {
        titulo: "Presentes para Sala de Estar",
        img: "/sala-estar.png",
        lista: itensSala,
    },
    {
        titulo: "Presentes para o Banheiro",
        img: "/banheiro.png",
        lista: itensBanheiro,
    },
    {
        titulo: "Presentes para o Quarto",
        img: "/quarto.png",
        lista: itensQuarto,
    },
    {
        titulo: "Presentes para área de Serviço",
        img: "/servico.png",
        lista: itensServico,
    },
];
const FloresBackground = ({ posicao }: { posicao: "cima" | "baixo" }) => {
    return (
        <div className={`background__${posicao}`}>
            <div className="background__flores">
                <img src="/flores.png" alt="Flores" />
            </div>

            <div className="background__ramo">
                <img src="/flores2.png" alt="Flores" />
            </div>
            <div className="background__ramo">
                <img src="/flores2.png" alt="Flores" />
            </div>
            <div className="background__ramo">
                <img src="/flores2.png" alt="Flores" />
            </div>
        </div>
    );
};
const Item = React.memo(({ img, index, link }: { img: string; index: string | number; link: string }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="lista-presentes__item">
            <img src={img} alt={"Produto" + index} loading="lazy" />
        </a>
    );
});
const ListaItens = React.memo(({ lista }: { lista: ItemInterface[] }) => {
    return (
        <div className="lista-presentes__lista">
            <h2>Mariana e João</h2>

            <div className={`lista-presentes__lista-container ${lista.length < 7 ? "duas-colunas" : ""}`}>
                {lista.map((value, ind) => (
                    <Item img={value.img} link={value.link} index={ind} key={ind} />
                ))}
            </div>

            <p>
                Clique no presente{" "}
                <span>
                    <Pointer />
                </span>
            </p>
        </div>
    );
});
const GridItens = React.memo(({ lista }: { lista: { img: string; link: string }[] }) => {
    return (
        <>
            {Array.from({ length: Math.ceil(lista.length / 9) }).map((_, i) => (
                <ListaItens lista={lista.slice(i * 9, (i + 1) * 9)} key={i} />
            ))}
        </>
    );
});
const SecaoTitulo = ({ titulo, Img }: { titulo: string; Img: string | React.ComponentType }) => {
    return (
        <div className="titulo-presentes" id={titulo.replace(/\s/g, "")}>
            <p>{titulo}</p>
            <div className="titulo-presentes--img">
                {typeof Img === "string" ? <img src={Img} alt="Logo Seção" /> : <Img />}
            </div>
        </div>
    );
};
const Secoes = React.memo(({ secoes }: { secoes: SecaoInterface[] }) => {
    return secoes.map((v) => (
        <Fragment key={v.titulo}>
            <SecaoTitulo Img={v.img} titulo={v.titulo} />
            <GridItens lista={v.lista} />
        </Fragment>
    ));
});

const ListaPresentes = React.memo(({ back }: { back: () => void }) => {
    return (
        <motion.div className="lista-presentes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FloresBackground posicao="cima" />
            <FloresBackground posicao="baixo" />

            <div className="to-index">
                <a href="#indice">
                    <House />
                </a>
            </div>
            <motion.div className="close-button" onTap={back}>
                <button type="button" title="Voltar">
                    <MoveLeft />
                </button>
            </motion.div>

            <div className="lista-presentes__container">
                <div className="titulo-presentes">
                    <p>Lista de Presentes</p>
                    <div className="titulo-presentes--img">
                        <img src="/logo.png" alt="João e Mariana" />
                    </div>
                    <p>de Casamento</p>
                </div>

                <div className="titulo-presentes presentes-lista" id="indice">
                    <p>Índice</p>

                    <ul>
                        {[...secoes, { titulo: "Pix dos Noivos" }].map((v, i) => (
                            <li key={v.titulo}>
                                <span>{i + 1}</span>
                                <a href={`#${v.titulo.replace(/\s/g, "")}`}>{v.titulo}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <Secoes secoes={secoes} />

                <div className="titulo-presentes" id="PixdosNoivos">
                    <p>Pix dos Noivos</p>
                    <div className="titulo-presentes--img">
                        <img src="pix-m.png" alt="QRCODE PIX" />
                    </div>

                    <div className="titulo-presentes--infos">
                        <span>CHAVE PIX: 541.607.958-46</span>
                        <span>MARIANA GARCIA</span>

                        <span>
                            ENDEREÇO PARA ENTREGA:
                            <br />
                            RUA SÃO LUIZ, 150, JARDIM NOVA EUROPA
                            <br />
                            HORTOLÂNDIA, SÃO PAULO
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

const scrollInto = (id: string) => {
    const ele = document.getElementById(id);
    if (ele)
        ele.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
};

const id = "clique-link";
const CoachMark = React.memo(() => {
    const [jaViu, setJaViu] = useState(JSON.parse(localStorage.getItem("jaViuCoach") || "false"));

    const [style, setStyle] = useState({});
    const $balaoRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!jaViu) {
            localStorage.setItem("jaViuCoach", "true");

            const itemRef = document.getElementById(id);
            if (!itemRef || !$balaoRef.current) return;
            itemRef.scrollIntoView({ behavior: "instant", block: "center" });
            const { height, left, top, width } = itemRef.getBoundingClientRect();
            setStyle({ height, width, left, top });

            const margem = 30;
            $balaoRef.current.style.top = `${margem + top + $balaoRef.current.clientHeight}px`;
            $balaoRef.current.style.left = `${left + width / 2 - $balaoRef.current.clientWidth / 2}px`;
        }
    }, []);

    return (
        <AnimatePresence>
            {!jaViu && (
                <motion.div
                    className="coach"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setJaViu(true)}
                >
                    <div className="coach__destaque" style={style}></div>
                    <p ref={$balaoRef}>Clique nos ícones acessar</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
const Conteudo = ({ onShowPresentes }: { onShowPresentes: () => void }) => {
    const [play, setPlay] = useState(false);
    const [showCoach, setShowCoach] = useState(false);
    const [showArrow, setShowArrow] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current) {
            setPlay(true);
            videoRef.current.play();
        }
    }, []);
    return (
        <>
            {showCoach && <CoachMark />}
            <div className={`video ${play ? "video--on" : ""}`}>
                <video
                    ref={videoRef}
                    src="/video.mp4"
                    onEnded={() => {
                        if (videoRef.current?.currentTime) videoRef.current.currentTime = 0;
                        setPlay(false);
                        setShowCoach(true);
                    }}
                    playsInline
                />
            </div>
            <FloresBackground posicao="cima" />
            <FloresBackground posicao="baixo" />

            <motion.div className="inicio">
                <div className="inicio__seta">
                    {showArrow ? (
                        <button
                            onClick={() => {
                                scrollInto("citacao");
                            }}
                        >
                            <ArrowDown size={25} />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                scrollInto("inicio");
                            }}
                        >
                            <ArrowUp size={25} />
                        </button>
                    )}
                </div>
                <div className="inicio__container" id="inicio">
                    <motion.div
                        className="conteudo"
                        variants={variantsContainer}
                        initial="initial"
                        animate="animate"
                        onViewportLeave={() => setShowArrow(false)}
                    >
                        <motion.div className="logo" variants={variantsItem}>
                            <img src="/logo.png" alt="João e Mariana" />
                        </motion.div>

                        <div className="informacoes">
                            <motion.p className="informacoes__convite" variants={variantsItem}>
                                CONVIDAM PARA A CELEBRAÇÃO DE SEU CASAMENTO
                            </motion.p>
                            <div className="informacoes__dados">
                                <data value={DATA_CASAMENTO.toLocaleDateString("pt-BR")}>
                                    {Array.from(
                                        `${DATA_CASAMENTO.toLocaleDateString("pt-BR").replace(/\//g, ".")} | ${DATA_CASAMENTO.toLocaleDateString("pt-BR", { weekday: "long" }).toUpperCase()}`,
                                    ).map((v, i) =>
                                        v === " " ? (
                                            <span key={i}>&nbsp;</span>
                                        ) : (
                                            <motion.span key={v + i} variants={variantsItem}>
                                                {v}
                                            </motion.span>
                                        ),
                                    )}
                                </data>
                                <p>
                                    {Array.from(`ÀS ${HORARIO}:00 HORAS`).map((v, i) =>
                                        v === " " ? (
                                            <span key={i}>&nbsp;</span>
                                        ) : (
                                            <motion.span key={v + i} variants={variantsItem}>
                                                {v}
                                            </motion.span>
                                        ),
                                    )}
                                </p>
                            </div>

                            <button
                                title="Clique para ver o vídeo"
                                type="button"
                                onClick={() => {
                                    setPlay((v) => {
                                        if (!v) videoRef.current?.play();
                                        else videoRef.current?.pause();

                                        return !v;
                                    });
                                }}
                            >
                                {play ? <VideoOff size={20} /> : <Video size={20} />}
                            </button>
                        </div>

                        <div className="links">
                            <a
                                rel="noopener noreferrer"
                                id={id}
                                className="link"
                                href="https://wa.me/5511912748943?text=Confirmo%20a%20minha%20presen%C3%A7a%20no%20casamento%20de%20Mariana%20e%20Jo%C3%A3o%20!%20"
                            >
                                <i>
                                    <Check size={30} />
                                </i>

                                <p>
                                    Confirmar a<br /> presença
                                </p>
                            </a>
                            <a
                                rel="noopener noreferrer"
                                className="link"
                                href="https://maps.app.goo.gl/MqFZ8GpSp3JEmuZL7"
                            >
                                <i>
                                    <MapPin size={30} />
                                </i>

                                <p>como chegar</p>
                            </a>
                            <button
                                className="link"
                                title="Ver Lista De Presentes"
                                type="button"
                                onClick={onShowPresentes}
                            >
                                <i>
                                    <Gift size={30} />
                                </i>

                                <p>
                                    Sugestão de
                                    <br /> Presentes
                                </p>
                            </button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    id="citacao"
                    className="citacao"
                    variants={variantsItem}
                    onViewportLeave={() => setShowArrow(true)}
                    viewport={{
                        once: false,
                        margin: "10px",
                        amount: "all",
                    }}
                >
                    <blockquote>
                        <span>“</span>Tudo começou no coração de Deus. Cremos que Ele escreveu nossa história com amor,
                        cuidado e propósito. Hoje, com gratidão, escolhemos dizer sim diante do Senhor, certos de que é
                        Ele quem firma nossos passos e sustenta nossa união. Queremos celebrar esse momento especial na
                        presença de Deus e ao lado de pessoas que fazem parte da nossa caminhada. Será uma alegria
                        compartilhar conosco esse dia tão importante, onde uniremos nossas vidas para honrar, amar e
                        servir ao Senhor.
                        <span>”</span>
                    </blockquote>
                </motion.div>
            </motion.div>
        </>
    );
};

function App() {
    const [showPresentes, setShowPresentes] = useState(false);
    const [abrir, setAbrir] = useState(false);
    return (
        <>
            <main>
                <AnimatePresence mode="wait">
                    {abrir ? (
                        <Conteudo key={"conteudo"} onShowPresentes={() => setShowPresentes(true)} />
                    ) : (
                        <motion.div
                            key={"home"}
                            className="home"
                            variants={variantsContainer}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        >
                            <div className="home__background-topo">
                                <img src="/flor-home.png" alt="Flor" />
                            </div>
                            <div className="home__background-baixo">
                                <img src="/flor-home.png" alt="Flor" />
                            </div>

                            <div className="home__conteudo">
                                <motion.h1 variants={variantsItem}>João & Mariana</motion.h1>

                                <motion.div
                                    className="home__envelope"
                                    variants={variantsContainer}
                                    initial="initial"
                                    animate="animate"
                                    onTap={() => setAbrir(true)}
                                >
                                    <p className="home__envelope--title">
                                        {Array.from("Nosso Casamento").map((v, i) =>
                                            v === " " ? (
                                                <span key={i}>&nbsp;</span>
                                            ) : (
                                                <motion.span variants={variantsItem} key={v + i}>
                                                    {v}
                                                </motion.span>
                                            ),
                                        )}
                                    </p>

                                    <div className="home__img">
                                        <div className="home__img--letters">
                                            <span>J</span>
                                            <span>&</span>
                                            <span>M</span>
                                        </div>
                                        <img src="/envelope.png" alt="Envelope" />

                                        <motion.p
                                            className="home__img--clique"
                                            initial={{ scale: 1 }}
                                            animate={{ scale: 1.2 }}
                                            transition={{
                                                duration: 0.8,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                ease: "easeInOut",
                                            }}
                                        >
                                            Clique para abrir
                                        </motion.p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="home__infos"
                                    variants={variantsContainer}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <motion.div
                                        className="home__infos-dia"
                                        variants={variantsContainer}
                                        initial="initial"
                                        animate="animate"
                                    >
                                        <i />
                                        <p>
                                            {Array.from(
                                                DATA_CASAMENTO.toLocaleDateString("pt-BR", { weekday: "long" }),
                                            ).map((v, i) => (
                                                <motion.span variants={variantsItem} key={v + i}>
                                                    {v}
                                                </motion.span>
                                            ))}
                                        </p>
                                        <i />
                                    </motion.div>
                                    <data value={DATA_CASAMENTO.toLocaleDateString("pt-BR")}>
                                        {Array.from(
                                            DATA_CASAMENTO.toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            }),
                                        ).map((v, i) =>
                                            v === " " ? (
                                                <span key={i}>&nbsp;</span>
                                            ) : (
                                                <motion.span variants={variantsItem} key={v + i}>
                                                    {v}
                                                </motion.span>
                                            ),
                                        )}
                                    </data>
                                    <i />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <AnimatePresence>
                {showPresentes && <ListaPresentes back={() => setShowPresentes(false)} />}
            </AnimatePresence>
        </>
    );
}

export default App;
