import Container from "@/components/Container";
import React, { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Brain,
  Database,
  LineChart,
  BarChart3,
  Server,
  Music,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EnhancedCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  type CarouselApi,
} from "@/components/ui/enhanced-carousel";
import ProjectCarousel from "@/components/ProjectCarousel";

import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import BlinkingText from "@/components/BlinkingText";
import ChatbotComponent from "@/components/ChatbotComponent";
import SkillBar from "@/components/SkillBar";
import ClientOnly from "@/components/ClientOnly";
import dynamic from 'next/dynamic';

// Import ThreeScene with no SSR
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { ssr: false });

const aboutStats = [
  { label: "Years of experience", value: "1.5+" },
  { label: "ML Models Deployed", value: "10+" },
  { label: "Projects Completed", value: "20+" },
];

const projects = [
  {
    id: "soundscape-ai",
    title: "SoundScape-AI",
    description: "AI-powered music generation system using deep learning techniques",
    fullDescription: "SoundScape-AI is an advanced music generation system that leverages deep learning to create original compositions. The system uses a combination of recurrent neural networks and transformers to understand musical patterns and generate coherent, pleasing melodies and harmonies.",
    icon: Music,
    githubLink: "https://github.com/Sagexd08/SoundScape-Ai",
    liveLink: "https://github.com/Sagexd08/SoundScape-Ai",
    image: "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206381/Screenshot_2025-05-02_224331_hs7z1l.png",
    techStack: ["Python", "PyTorch", "TensorFlow", "Web Audio API"],
    screenshots: [
      "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206381/Screenshot_2025-05-02_224331_hs7z1l.png",
      "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206381/Screenshot_2025-05-02_224331_hs7z1l.png"
    ],
  },
  {
    id: "sentinal-ai",
    title: "Sentinal-AI",
    description: "Security monitoring system with AI-based threat detection",
    fullDescription: "Sentinal-AI is a comprehensive security monitoring system that uses artificial intelligence to detect potential threats in real-time. The system analyzes video feeds, sensor data, and network traffic to identify suspicious activities and alert security personnel.",
    icon: Shield,
    githubLink: "https://github.com/Sagexd08/Sentinal-AI",
    liveLink: "https://github.com/Sagexd08/Sentinal-AI",
    image: "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206382/Screenshot_2025-05-02_224412_buquuv.png",
    techStack: ["Python", "OpenCV", "TensorFlow", "Flask"],
    screenshots: [
      "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206382/Screenshot_2025-05-02_224412_buquuv.png",
      "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206382/Screenshot_2025-05-02_224412_buquuv.png"
    ],
  },
  {
    id: "stock-prediction",
    title: "Stock Price Prediction",
    description: "LSTM model for predicting stock market trends and prices",
    fullDescription: "This stock price prediction system uses Long Short-Term Memory (LSTM) neural networks to analyze historical stock data and predict future price movements. The model takes into account various factors including historical prices, trading volumes, and market indicators to make accurate predictions.",
    icon: TrendingUp,
    githubLink: "https://github.com/Sagexd08/Stock-Price-Prediction-LSTM-model",
    liveLink: "https://github.com/Sagexd08/Stock-Price-Prediction-LSTM-model",
    image: "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206359/download_tqhmk3.jpg",
    techStack: ["Python", "Keras", "Pandas", "Matplotlib"],
    screenshots: [
      "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206359/download_tqhmk3.jpg",
      "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206359/download_tqhmk3.jpg"
    ],
  },
  {
    id: "community-pulse",
    title: "Community Pulse",
    description: "Social sentiment analysis platform for community insights",
    fullDescription: "Community Pulse is a social sentiment analysis platform that helps organizations understand public opinion and community feedback. The system collects data from social media, surveys, and other sources, then uses natural language processing to analyze sentiment and extract actionable insights.",
    icon: Users,
    githubLink: "https://github.com/Sagexd08/Community-Pulse",
    liveLink: "https://github.com/Sagexd08/Community-Pulse",
    image: "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206381/Screenshot_2025-05-02_224721_oqhc0y.png",
    techStack: ["Python", "NLTK", "SpaCy", "React", "D3.js"],
    screenshots: [
      "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206381/Screenshot_2025-05-02_224721_oqhc0y.png",
      "https://res.cloudinary.com/dm9h4bawl/image/upload/v1746206381/Screenshot_2025-05-02_224721_oqhc0y.png"
    ],
  },
];

const services = [
  {
    service: "Machine Learning",
    description:
      "Building and deploying custom machine learning models to solve complex problems.",
    icon: Brain,
  },
  {
    service: "Data Science",
    description:
      "Extracting insights from data through statistical analysis and visualization.",
    icon: LineChart,
  },
  {
    service: "Deep Learning",
    description:
      "Creating neural networks for image recognition, NLP, and other advanced AI applications.",
    icon: BarChart3,
  },
  {
    service: "Data Engineering",
    description:
      "Designing and implementing data pipelines and infrastructure for AI/ML workflows.",
    icon: Database,
  },
  {
    service: "MLOps",
    description:
      "Streamlining the deployment, monitoring, and maintenance of ML models in production.",
    icon: Server,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);


  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);





  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>python</span>
              <span className={styles.pill}>tensorflow</span>
              <span className={styles.pill}>pytorch</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Sohom.
                </span>
              </h1>
              <div
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                <BlinkingText
                  texts={["I am a Coder", "I am an AI/ML Developer"]}
                  interval={3000}
                  className="text-2xl font-medium tracking-tight text-foreground 2xl:text-3xl"
                />
                <p className="mt-3">
                  Passionate about creating intelligent solutions that solve real-world problems.
                </p>
              </div>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:sohomchatterjee07@gmail.com" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <ClientOnly>
                <Spline scene="/assets/scene.splinecode" />
              </ClientOnly>
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <motion.div
                  className="relative rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 -z-10 blur-xl"></div>
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                    <Image
                      src="https://res.cloudinary.com/dm9h4bawl/image/upload/v1746165560/WhatsApp_Image_2025-05-02_at_11.15.00_b8d956c4_ewi2x7.jpg"
                      alt="Sohom Chatterjee"
                      width={400}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </motion.div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
                  I&apos;m an AI/ML Developer with expertise in{" "}
                  <Link
                    href="https://www.tensorflow.org/"
                    target="_blank"
                    className="underline"
                  >
                    TensorFlow
                  </Link>
                  ,{" "}
                  <Link
                    href="https://pytorch.org/"
                    target="_blank"
                    className="underline"
                  >
                    PyTorch
                  </Link>
                  , and Python. My experience includes developing and deploying machine learning models
                  for various applications including computer vision, natural language processing, and predictive analytics.
                  I'm passionate about leveraging AI to create innovative solutions that make a positive impact.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
              <div className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-lg"></div>
              <div className="absolute inset-0 h-32 -z-10">
                <ClientOnly>
                  <ThreeScene type="heading" className="opacity-70" />
                </ClientOnly>
              </div>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter relative z-10">
                ✨ Projects
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl relative z-10">
                Streamlined digital experiences.
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg relative z-10">
                I&apos;ve worked on a variety of projects, from small websites to
                large-scale web applications. Here are some of my favorites:
              </p>
            </div>

            {/* Enhanced Carousel */}
            <div className="mt-14 relative">
              {/* Background Elements */}
              <div className="absolute -z-10 inset-0 overflow-hidden">
                <ClientOnly>
                  <ThreeScene type="carousel" className="opacity-70" />
                </ClientOnly>
              </div>

              <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
                <ProjectCarousel projects={projects} />
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  My Skills &
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    Expertise.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the key areas where I specialize. If you have any
                  questions about my capabilities, feel free to reach out.
                </p>
              </div>
              <div className="col-span-1 md:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-md bg-white/5 shadow-md backdrop-blur">
                <div className="space-y-6">
                  <SkillBar name="Python" percentage={95} />
                  <SkillBar name="TensorFlow" percentage={90} />
                  <SkillBar name="PyTorch" percentage={85} />
                  <SkillBar name="Machine Learning" percentage={92} />
                </div>
                <div className="space-y-6">
                  <SkillBar name="Deep Learning" percentage={88} />
                  <SkillBar name="NLP" percentage={85} />
                  <SkillBar name="Computer Vision" percentage={80} />
                  <SkillBar name="Data Analysis" percentage={90} />
                </div>
              </div>

              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-10 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for AI/ML projects and open to
              discussing new opportunities.
            </p>
            <Link href="mailto:sohomchatterjee07@gmail.com" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>

      {/* Chatbot */}
      <ChatbotComponent />

    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
