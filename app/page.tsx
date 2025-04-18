"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Linkedin, Instagram, Dribbble, Youtube, ArrowDown, ArrowRight, Mail, ChevronRight, Moon, Sun, Menu, X } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { SkillsSection } from "@/components/skills-section";
import { ContactForm } from "@/components/contact-form";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Handle theme toggle
  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ["home", "about", "projects", "skills", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* Gradient background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

      {/* Header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "border-b bg-background/80 backdrop-blur-lg py-2" : "bg-transparent py-4"}`}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="flex items-center justify-center group" aria-label="Toggle theme">
              <Image src="/logo-circle.png" alt="Ajiue Logo" width={38} height={38} className="mr-2 transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-xl font-bold tracking-tight">
                Aji<span className="text-primary">ue</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {["home", "about", "projects", "skills", "contact"].map((section) => (
              <Link key={section} href={`#${section}`} className={`relative text-sm font-medium transition-colors hover:text-primary ${activeSection === section ? "text-primary" : "text-foreground/70"}`}>
                <span className="capitalize">{section}</span>
                {activeSection === section && <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary" />}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Dark Mode Toggle for Mobile */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-foreground/5" aria-label="Toggle dark mode">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Button variant="ghost" size="sm" className="px-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Toggle Button */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-foreground/10 transition-colors" aria-label="Toggle dark mode">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Button asChild className="px-6 font-medium rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <Link href="https://wa.me/6281908108161">Let's Talk</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-0 z-30 bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}>
        <div className="container h-full flex flex-col justify-center">
          <nav className="flex flex-col items-center gap-8 text-lg">
            {["home", "about", "projects", "skills", "contact"].map((section) => (
              <Link key={section} href={`#${section}`} onClick={handleNavClick} className={`relative font-medium transition-colors hover:text-primary ${activeSection === section ? "text-primary" : "text-foreground/70"}`}>
                <span className="capitalize">{section}</span>
              </Link>
            ))}

            <div className="mt-8">
              <Button asChild className="px-6 py-2 rounded-full">
                <Link href="https://wa.me/6281908108161" onClick={handleNavClick}>
                  Let's Talk
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex gap-4">
              {[
                { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
                { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
                { icon: <FaBehance className="h-5 w-5" />, href: "https://behance.net", label: "Behance" },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 hover:text-primary transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <ScrollAnimationWrapper id="home">
          <section className="w-full min-h-[95vh] flex items-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="container">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-20">
                <div className="max-w-2xl space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Available for freelance work
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                    <span className="text-foreground">UI/UX Designer</span>{" "}
                    <span className="inline-block">
                      <span className="relative">
                        <span className="text-primary">&</span>
                        <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.5 3C17 -0.5 29.5 -0.5 47.5 3C65.5 6.5 78 6.5 99.5 3" stroke="currentColor" strokeWidth="2" className="text-primary/40" />
                        </svg>
                      </span>{" "}
                      Front-End Developer
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">Creating beautiful, functional, and accessible digital experiences that delight users and drive business growth.</p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button asChild size="lg" className="rounded-full px-6 font-medium hover:translate-y-[-2px] transition-all">
                      <Link href="#projects">
                        View Projects <ArrowDown className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="rounded-full px-6 font-medium border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 transition-all">
                      <Link href="#">Download CV</Link>
                    </Button>
                  </div>

                  <div className="pt-8 flex items-center gap-4 text-muted-foreground">
                    <span className="text-sm font-medium">Follow me:</span>
                    <div className="flex gap-3">
                      {[
                        { icon: <Github className="h-4 w-4" />, href: "https://github.com", label: "GitHub" },
                        { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com", label: "LinkedIn" },
                        { icon: <Instagram className="h-4 w-4" />, href: "https://instagram.com", label: "Instagram" },
                        { icon: <FaBehance className="h-4 w-4" />, href: "https://behance.net", label: "Behance" },
                      ].map((social, idx) => (
                        <Link
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 hover:bg-foreground/10 hover:text-primary transition-colors"
                          aria-label={social.label}
                        >
                          {social.icon}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hero Image with effects */}
                <div className="relative mt-8 md:mt-0">
                  <div className="relative z-10 rounded-2xl overflow-hidden  p-1">
                    <div className="absolute inset-0  rounded-2xl animate-pulse" style={{ animationDuration: "3s" }}></div>
                    <Image src="/logo-circle.png" alt="Ajiue Logo" width={320} height={320} className="rounded-xl transition-all duration-300 w-full md:w-[500px]" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>

        {/* About Section */}
        <ScrollAnimationWrapper id="about">
          <section className="container py-16 md:py-32">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-primary/10 to-transparent p-1 rounded-3xl">
                  <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.02] group">
                    <Image src="/Gue Anime.png" alt="Tri Aji Pramuditya, UI/UX Designer" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" priority />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <span>About me</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 md:text-4xl">Crafting digital experiences that matter</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Hello! I'm <span className="text-foreground font-medium">Tri Aji Pramuditya</span>, a passionate UI/UX designer with over 2 years of experience creating user interfaces and websites.
                  </p>
                  <p>My approach combines aesthetic sensibility with user-centered design principles to create interfaces that are not only beautiful but also intuitive and accessible.</p>
                  <p>When I'm not designing, you can find me exploring new design trends, contributing to open-source projects, or playing some games.</p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-foreground/5">
                    <h3 className="text-3xl font-bold text-primary">2+</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Years of experience</p>
                  </div>
                  <div className="p-4 rounded-lg bg-foreground/5">
                    <h3 className="text-3xl font-bold text-primary">50+</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Projects completed</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  {/* Social buttons */}
                  {[
                    { icon: <Github className="h-4 w-4" />, href: "https://github.com", label: "GitHub" },
                    { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com", label: "LinkedIn" },
                    { icon: <Instagram className="h-4 w-4" />, href: "https://instagram.com", label: "Instagram" },
                    { icon: <FaBehance className="h-4 w-4" />, href: "https://behance.net", label: "Behance" },
                    { icon: <Dribbble className="h-4 w-4" />, href: "https://dribbble.com", label: "Dribbble" },
                    { icon: <Youtube className="h-4 w-4" />, href: "https://youtube.com", label: "YouTube" },
                  ].map((social, idx) => (
                    <Button key={idx} variant="outline" size="icon" asChild className="rounded-lg border-foreground/10 hover:border-primary/50 hover:text-primary">
                      <Link href={social.href} target="_blank" rel="noopener noreferrer">
                        {social.icon}
                        <span className="sr-only">{social.label}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>

        {/* Projects Section */}
        <ScrollAnimationWrapper id="projects">
          <section className="container py-16 md:py-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <span>Portfolio</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 md:text-4xl">Featured Projects</h2>
                <p className="text-muted-foreground md:text-lg">A selection of my recent work in UI/UX design and development.</p>
              </div>
              <Button variant="outline" asChild className="rounded-full px-5 font-medium border-foreground/20 hover:border-primary/50 hover:text-primary mt-4 md:mt-0">
                <Link href="#">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-md overflow-x-auto scrollbar-hide">
                  <TabsList className="p-1 bg-muted rounded-full h-auto w-full flex justify-between">
                    {["all", "web", "apps"].map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="flex-1 px-3 sm:px-5 py-2 data-[state=active]:shadow-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full transition-all text-center"
                      >
                        {category === "all" ? "All Projects" : category === "web" ? "Web Design" : "Apps Design"}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              <TabsContent value="all" className="mt-0 outline-none">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <ProjectCard
                    title="MyXL App Redesign – UI Enhancement"
                    description="This project focuses on the UI redesign of the MyXL mobile application, a self-service platform used by XL Axiata customers to manage their mobile plans, check balances, purchase data packages, and access other services."
                    image="/Project1.svg"
                    tags={["UI Design", "Mobile Apps"]}
                    link="#"
                  />
                  <ProjectCard title="PlantUp" description="Create an agricultural e-commerce application design and conduct research" image="/Project2.svg" tags={["Mobile Design", "UI/UX", "Interaction"]} link="#" />
                  <ProjectCard
                    title="Golek SoluTI"
                    description="Creating an IT service provider website or software house that provides website creation services for MSMEs, Portfolio and IT Tasks."
                    image="/Project3.svg"
                    tags={["Web Design", "UI/UX", "Front-End"]}
                    link="#"
                  />
                </div>
              </TabsContent>

              {/* Web Design tab content */}
              <TabsContent value="web" className="mt-0 outline-none">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <ProjectCard
                    title="Golek SoluTI"
                    description="Creating an IT service provider website or software house that provides website creation services for MSMEs, Portfolio and IT Tasks."
                    image="/Project3.svg"
                    tags={["Web Design", "UI/UX", "Front-End"]}
                    link="#"
                  />
                </div>
              </TabsContent>

              {/* Apps Design tab content (replacing Mobile) */}
              <TabsContent value="apps" className="mt-0 outline-none">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <ProjectCard
                    title="MyXL App Redesign – UI Enhancement"
                    description="This project focuses on the UI redesign of the MyXL mobile application, a self-service platform used by XL Axiata customers to manage their mobile plans, check balances, purchase data packages, and access other services."
                    image="/Project1.svg"
                    tags={["UI Design", "Mobile Apps"]}
                    link="#"
                  />
                  <ProjectCard title="PlantUp" description="Create an agricultural e-commerce application design and conduct research" image="/Project2.svg" tags={["Mobile Design", "UI/UX", "Interaction"]} link="#" />
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </ScrollAnimationWrapper>

        {/* Skills Section */}
        <ScrollAnimationWrapper id="skills">
          <section className="w-full py-16 md:py-32 bg-gradient-to-b from-background to-primary/5">
            <div className="container">
              <div className="max-w-2xl mb-12 md:mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <span>Expertise</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 md:text-4xl">Skills & Tools</h2>
                <p className="text-muted-foreground md:text-lg">My toolkit and areas of expertise in design and development.</p>
              </div>
              <SkillsSection /> {/* Keep your existing component */}
            </div>
          </section>
        </ScrollAnimationWrapper>

        {/* Contact Section */}
        <ScrollAnimationWrapper id="contact">
          <section className="container py-16 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <span>Contact</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 md:text-4xl">Let's Work Together</h2>
                <p className="text-muted-foreground mb-8 md:text-lg">Have a project in mind? Let's discuss how I can help bring your vision to life.</p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="h-5 w-5" />,
                      title: "Email",
                      value: "triajipramuditya23@gmail.com",
                      href: "mailto:triajipramuditya23@gmail.com",
                    },
                    {
                      icon: <span className="flex h-5 w-5 items-center justify-center">📱</span>,
                      title: "Phone",
                      value: "+62 819-0810-8161",
                      href: "tel:+6281908108161",
                    },
                    {
                      icon: <span className="flex h-5 w-5 items-center justify-center">📍</span>,
                      title: "Location",
                      value: "Jakarta, Indonesia",
                      href: "#",
                    },
                  ].map((item, idx) => (
                    <Link key={idx} href={item.href} className="flex items-start gap-4 p-4 rounded-lg hover:bg-foreground/5 transition-colors group">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">{item.icon}</div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <Card className="border-0 shadow-lg bg-card rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Send a Message</h3>
                      <p className="text-sm text-muted-foreground">Fill out the form below and I'll get back to you ASAP.</p>
                    </div>
                    <ContactForm /> {/* Keep your existing component */}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-12 bg-foreground/5">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/logo-circle.png" alt="Ajiue Logo" width={32} height={32} className="mr-2" />
                <span className="text-xl font-bold tracking-tight">
                  Aji<span className="text-primary">ue</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">Crafting beautiful digital experiences that delight users and drive business growth.</p>
              <div className="flex gap-3">
                {[
                  { icon: <Github className="h-4 w-4" />, href: "https://github.com", label: "GitHub" },
                  { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Instagram className="h-4 w-4" />, href: "https://instagram.com", label: "Instagram" },
                ].map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 hover:bg-foreground/10 hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Navigation</h3>
              <nav className="flex flex-col gap-2">
                {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
                  <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="font-medium mb-4">Get in Touch</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 inline-block mr-2" />
                  triajipramuditya23@gmail.com
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="inline-block mr-2">📱</span>
                  +62 819-0810-8161
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-sm text-muted-foreground md:text-left">&copy; {new Date().getFullYear()} Tri Aji Pramuditya. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed right-6 bottom-6 z-50 p-3 rounded-full bg-primary/90 text-white shadow-lg transition-all duration-300 hover:bg-primary ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
