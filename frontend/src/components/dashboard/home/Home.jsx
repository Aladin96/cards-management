import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

import BreadCrumbs from "../../layout/BreadCrumbs";
import SideBar from "../../layout/sidebar/SideBar";
import MainContent from "../../layout/utilities/MainContent";
import MainContentInner from "../../layout/utilities/MainContentInner";
import PageContainer from "../../layout/utilities/PageContainer";

const Home = ({ isPending, user }) => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    !isPending && (
      <>
        <PageContainer>
          <SideBar />
          <MainContent>
            <BreadCrumbs pageName="Acceuil" />
            <MainContentInner>
              <div className="mb5- mt-5">
                <h1
                  style={{
                    color: "#dc970b",
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  👋 Essalam Alikoum !
                </h1>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#4135f5",
                    textAlign: "center",
                  }}
                >
                  Vous êtes connecté en mode [ {user.role.toUpperCase()} ]
                </p>
                <div className="d-flex justify-content-center">
                  <Clock value={value} />
                </div>

                <p style={{ textAlign: "center" }}>
                  Cette application a été développée par{" "}
                  <a href="#" target="_blank">
                    {" "}
                    🔥 EASY SMART SOFT 🔥{" "}
                  </a>
                </p>
              </div>
            </MainContentInner>
          </MainContent>
        </PageContainer>
      </>
    )
  );
};

export default Home;
