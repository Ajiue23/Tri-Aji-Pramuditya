"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Linkedin, Instagram, Dribbble, Youtube, ArrowDown, ArrowRight, Mail } from "lucide-react";
import { FaBehance } from "react-icons/fa"; // hanya Behance yang tidak ada di lucide-react
import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { SkillsSection } from "@/components/skills-section";
import { ContactForm } from "@/components/contact-form";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
                document.documentElement.classList.toggle("dark");
                localStorage.setItem("theme", theme);
              }}
              className="flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {/* Logo ditambahkan di sini */}
              <Image src="/logo.png" alt="Ajiue Logo" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold">Ajiue</span>
            </button>
          </div>
          <nav className="hidden md:flex gap-6">{/* Navigation links tetap sama */}</nav>
          <div className="flex items-center gap-4">{/* Buttons tetap sama */}</div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center">
        <ScrollAnimationWrapper id="home">
          <section className="w-full h-[90vh] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-2xl space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                      UI/UX Designer <span className="text-primary">& Front-End Developer</span>
                    </h1>
                    <p className="text-muted-foreground md:text-xl">Creating beautiful, functional, and accessible digital experiences that delight users and drive business growth.</p>
                    <div className="flex gap-4">
                      <Button asChild>
                        <Link href="#projects">
                          View Projects <ArrowDown className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="#">Download CV</Link>
                      </Button>
                    </div>
                  </div>
                  {/* Logo di hero section - sekarang di sebelah kanan */}
                  <div className="hidden md:block">
                    <Image src="/logo-large.png" alt="Ajiue Logo" width={300} height={300} className="rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>
        {/* Hero Section End*/}

        {/* About Section Start*/}
        <ScrollAnimationWrapper id="about">
          <section className="container py-24 md:py-32">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                <div className="mt-4 space-y-4">
                  <p>Hello! I'm Tri Aji Pramuditya, a passionate UI/UX designer with over 2 years of experience creating user interface and websites.</p>
                  <p>My approach combines aesthetic sensibility with user-centered design principles to create interfaces that are not only beautiful but also intuitive and accessible.</p>
                  <p>When I'm not designing, you can find me exploring new design trends, contributing to open-source projects, or playing some games.</p>
                </div>
                <div className="mt-6 flex gap-4">
                  {/* GitHub */}
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </Button>

                  {/* LinkedIn */}
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>

                  {/* Instagram */}
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </Button>

                  {/* Behance (react-icons) */}
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://behance.net" target="_blank" rel="noopener noreferrer">
                      <FaBehance className="h-4 w-4" />
                      <span className="sr-only">Behance</span>
                    </Link>
                  </Button>

                  {/* Dribbble */}
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                      <Dribbble className="h-4 w-4" />
                      <span className="sr-only">Dribbble</span>
                    </Link>
                  </Button>

                  {/* YouTube */}
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-4 w-4" />
                      <span className="sr-only">YouTube</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] w-full overflow-hidden rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105">
                <Image src="/Gue Anime.png" alt="Tri Aji Pramuditya, UI/UX Designer" fill className="object-cover object-top" priority />
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>
        {/* About Section End */}

        {/* Project Section Start */}
        <ScrollAnimationWrapper id="projects">
          <section className="container py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">A selection of my recent work in UI/UX design and development.</p>
            </div>
            <Tabs defaultValue="all" className="mt-12">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="web">Web Design</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
                  <TabsTrigger value="branding">Branding</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="mt-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <ProjectCard
                    title="E-commerce Redesign"
                    description="A complete redesign of an e-commerce platform focusing on improving conversion rates and user experience."
                    image="/placeholder.svg"
                    tags={["UI Design", "UX Research", "Prototyping"]}
                    link="#"
                  />
                  <ProjectCard
                    title="Finance Mobile App"
                    description="A mobile banking application designed to simplify personal finance management for millennials."
                    image="/placeholder.svg"
                    tags={["Mobile Design", "UI/UX", "Interaction"]}
                    link="#"
                  />
                  <ProjectCard title="Travel Platform" description="A travel booking platform with an immersive UI and streamlined booking process." image="/placeholder.svg" tags={["Web Design", "UI/UX", "Branding"]} link="#" />
                </div>
              </TabsContent>
              <TabsContent value="web" className="mt-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <ProjectCard
                    title="E-commerce Redesign"
                    description="A complete redesign of an e-commerce platform focusing on improving conversion rates and user experience."
                    image="/placeholder.svg"
                    tags={["UI Design", "UX Research", "Prototyping"]}
                    link="#"
                  />
                  <ProjectCard title="Travel Platform" description="A travel booking platform with an immersive UI and streamlined booking process." image="/placeholder.svg" tags={["Web Design", "UI/UX", "Branding"]} link="#" />
                </div>
              </TabsContent>
              <TabsContent value="mobile" className="mt-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <ProjectCard
                    title="Finance Mobile App"
                    description="A mobile banking application designed to simplify personal finance management for millennials."
                    image="/placeholder.svg"
                    tags={["Mobile Design", "UI/UX", "Interaction"]}
                    link="#"
                  />
                </div>
              </TabsContent>
              <TabsContent value="branding" className="mt-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <ProjectCard title="Travel Platform" description="A travel booking platform with an immersive UI and streamlined booking process." image="/placeholder.svg" tags={["Web Design", "UI/UX", "Branding"]} link="#" />
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-12 text-center">
              <Button variant="outline" asChild>
                <Link href="#">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </ScrollAnimationWrapper>
        {/* Project Section End */}

        {/* Skills Section Start */}
        <ScrollAnimationWrapper id="skills">
          <section className="w-full py-24 md:py-32 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills & Expertise</h2>
                <p className="mt-4 text-muted-foreground md:text-xl">My toolkit and areas of expertise in design and development.</p>
              </div>
              <SkillsSection />
            </div>
          </section>
        </ScrollAnimationWrapper>
        {/* Skills Section End */}

        {/* Contact Section Start */}
        <ScrollAnimationWrapper id="contact">
          <section className="container py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Let's Work Together</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">Have a project in mind? Let's discuss how I can help bring your vision to life.</p>
            </div>
            <div className="mx-auto mt-12 max-w-lg">
              <Card>
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 flex justify-center gap-6">
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <Link href="mailto:triajipramuditya23@gmail.com">
                  <Mail className="h-4 w-4" />
                  triajipramuditya23@gmail.com
                </Link>
              </Button>
            </div>
          </section>
        </ScrollAnimationWrapper>
      </main>
      {/* Contact Section End */}

      {/* Footer Start*/}
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">&copy; {new Date().getFullYear()} Tri Aji Pramuditya. All rights reserved.</p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
          </div>
        </div>
      </footer>
      {/* Footer End */}
    </div>
  );
}
