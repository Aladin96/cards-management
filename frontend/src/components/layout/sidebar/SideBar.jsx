import React, { useState } from "react";
import Emojis from "react-emojis-app";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
const SideBar = () => {
  const [collapseIn, setCollapseIn] = useState({
    home: false,
    cards: false,
    clients: false,
    movements: false,
    units: false,
    disciplines: false,
    options: false,
    statistics: false,
  });

  const handleCollapse = (e) => {
    const item = e.target.dataset.item;
    const newCollapseIn = { ...collapseIn };
    for (let i in newCollapseIn) {
      newCollapseIn[i] = false;
    }

    newCollapseIn[item] = !collapseIn[item];

    setCollapseIn(newCollapseIn);
  };

  return (
    <>
      <div className="sidebar-menu">
        <div className="sidebar-header">
          <div className="logo">
            <b style={{ color: "#fff", fontSize: "18px" }}>OPOW TLEMCEN</b>
          </div>
        </div>
        <div className="main-menu">
          <Scrollbars
            style={{ width: "100%", height: "100%" }}
            className="react-scroll"
          >
            <div className="menu-inner">
              <nav>
                <ul className="metismenu" id="menu">
                  {/* Home Link */}
                  <li className={collapseIn.home ? "active" : ""}>
                    <Link to="/home" data-item="home">
                      <Emojis symbol="🏠" label="Home" />
                      <span>Acceuil</span>
                    </Link>
                  </li>

                  {/* Cards Link */}
                  <li className={collapseIn.cards ? "active" : ""}>
                    <a
                      href="#"
                      aria-expanded="true"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCollapse(e);
                      }}
                      data-item="cards"
                    >
                      <Emojis symbol="💳" label="cards" />
                      <span> Les cartes</span>
                    </a>
                    <ul
                      className={collapseIn.cards ? "collapse in" : "collapse"}
                    >
                      <li className={collapseIn.cards ? "active" : ""}>
                        <Link to="/add_cards"> Ajouter cartes</Link>
                      </li>
                      <li>
                        <Link to="/browse_cards">Parcouri les cartes</Link>
                      </li>
                      <li>
                        <Link to="/deliver_cards">Livrer les cartes</Link>
                      </li>
                      <li>
                        <Link to="/restore_cards">Restituer les cartes</Link>
                      </li>
                      <li>
                        <Link to="/delete_cards">Delete cards</Link>
                      </li>
                    </ul>
                  </li>

                  {/* Movements */}
                  <li className={collapseIn.movements ? "active" : ""}>
                    <a
                      href="#"
                      aria-expanded="true"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCollapse(e);
                      }}
                      data-item="movements"
                    >
                      <Emojis symbol="🔃" label="arrows" />
                      <span>Les Mouvements</span>
                    </a>
                    <ul
                      className={
                        collapseIn.movements ? "collapse in" : "collapse"
                      }
                    >
                      <li className={collapseIn.movements ? "active" : ""}>
                        <Link to="/entry_movements">Mouvement d'entrée</Link>
                      </li>
                      <li>
                        <Link to="/exit_movements">Mouvement de sortie</Link>
                      </li>
                    </ul>
                  </li>

                  {/* Units */}
                  <li className={collapseIn.units ? "active" : ""}>
                    <a
                      href="#"
                      aria-expanded="true"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCollapse(e);
                      }}
                      data-item="units"
                    >
                      <Emojis symbol="🏛️" label="units" />
                      <span>Les Unitées</span>
                    </a>
                    <ul
                      className={collapseIn.units ? "collapse in" : "collapse"}
                    >
                      <li className={collapseIn.units ? "active" : ""}>
                        <Link to="/add_units">Ajouter une unitée</Link>
                      </li>
                      <li>
                        <Link to="/browse_units">Parcourir les unitées</Link>
                      </li>
                    </ul>
                  </li>

                  {/* Clients Link */}
                  <li className={collapseIn.clients ? "active" : ""}>
                    <a
                      href="#"
                      aria-expanded="true"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCollapse(e);
                      }}
                      data-item="clients"
                    >
                      <Emojis symbol="👥" label="clients" />
                      <span>Les clients</span>
                    </a>
                    <ul
                      className={
                        collapseIn.clients ? "collapse in" : "collapse"
                      }
                    >
                      <li className={collapseIn.clients ? "active" : ""}>
                        <Link to="/add_client">Ajouter client</Link>
                      </li>
                      <li>
                        <Link to="/browse_clients">Parcouri les clients</Link>
                      </li>
                    </ul>
                  </li>
                  {/* Disciplines Link */}
                  <li className={collapseIn.disciplines ? "active" : ""}>
                    <a
                      href="#"
                      aria-expanded="true"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCollapse(e);
                      }}
                      data-item="disciplines"
                    >
                      <Emojis symbol="🧩" label="discipline" />
                      <span>Les disciplines</span>
                    </a>
                    <ul
                      className={
                        collapseIn.disciplines ? "collapse in" : "collapse"
                      }
                    >
                      <li className={collapseIn.disciplines ? "active" : ""}>
                        <Link to="/add_discipline"> Ajouter discipline</Link>
                      </li>
                      <li>
                        <Link to="/browse_disciplines">
                          Parcouri les disciplines
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* Options Link */}
                  <li className={collapseIn.options ? "active" : ""}>
                    <a
                      href="#"
                      aria-expanded="true"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCollapse(e);
                      }}
                      data-item="options"
                    >
                      <Emojis symbol="⚙️" label="options" />
                      <span>Les options</span>
                    </a>
                    <ul
                      className={
                        collapseIn.options ? "collapse in" : "collapse"
                      }
                    >
                      <li className={collapseIn.options ? "active" : ""}>
                        <Link to="/add_colors"> Ajouter colour</Link>
                      </li>

                      <li>
                        <Link to="/add_season">Ajouter saison</Link>
                      </li>
                    </ul>
                  </li>
                  {/* Home Link */}
                  <li className={collapseIn.statistics ? "active" : ""}>
                    <Link to="/statistics" data-item="statistics">
                      <Emojis symbol="📊" label="stats" />
                      <span>Statistics</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default SideBar;
