import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Styles from "./styles";

const TITLES = [
  "Code.",
  "Create Bug Report.",
  "Review Bug Report.",
  "Run Live Example.",
  "Create Rapid Prototype.",
  "Learn New Framework.",
  "Teach New Framework.",
  "Present Live Demo.",
  "Collaborate.",
  "Get Feedback.",
];

const Home: React.FC = () => {
  const { push } = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1 >= TITLES.length ? 0 : prev + 1));
    }, 2500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setChanged(true);
    const timer = setTimeout(() => {
      setChanged(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex]);

  return (
    <Styles.StyledHome>
      <Head>
        <title>口袋工具 | 首页</title>
      </Head>
      <Styles.StyledSection>
        <Styles.StyledContent>
          <Styles.StyledTitleWrapper>
            <Styles.StyledTitleContent>
              <h1>Click.</h1>
              <h1 className={changed ? "active" : ""}>{TITLES[activeIndex]}</h1>
              <h1>
                <Styles.StyledStrong>Done.</Styles.StyledStrong>
              </h1>
            </Styles.StyledTitleContent>
            <Styles.StyledMinorTitle>
              Stay in the flow with instant dev experiences. No more hours
              stashing/pulling/installing locally — just click, and start
              coding.
            </Styles.StyledMinorTitle>
          </Styles.StyledTitleWrapper>
        </Styles.StyledContent>
        <Styles.StyledContent style={{ paddingTop: 0 }}>
          <Styles.StyledSubTitle>工具库</Styles.StyledSubTitle>
          <Styles.StyledToolWrapper>
            <Link href="/editor">
              <Styles.StyledToolContent>JSON可视化</Styles.StyledToolContent>
            </Link>
          </Styles.StyledToolWrapper>
        </Styles.StyledContent>
      </Styles.StyledSection>
    </Styles.StyledHome>
  );
};

export default Home;
