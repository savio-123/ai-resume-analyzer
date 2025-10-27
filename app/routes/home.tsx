import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resuman" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <section className="main-section px-2 sm:px-6 md:px-10 lg:px-20">
        <div className="page-heading pt-16 max-sm:pt-8">
          <h1 className="heading-1 ">
            Track Your Applications & Resume Ratings
          </h1>
          <h2 className="text-gray-700 text-base sm:text-lg mt-2">
            Review your submissions and check AI generated feedback
          </h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section mt-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
