import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resuman" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
  const { auth,kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes,setResumes] = useState<Resume[]>([])
  const [loadingResumes,setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*',true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => (JSON.parse(resume.value) as Resume)) || [];
      setResumes(parsedResumes);
      setLoadingResumes(false);
    }
  loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <section className="main-section px-2 sm:px-6 md:px-10 lg:px-20">
        <div className="page-heading pt-16 max-sm:pt-8">
          <h1 className="heading-1 ">
            Track Your Applications & Resume Ratings
          </h1>
          {!loadingResumes && resumes.length === 0 ? (<h2 className="text-gray-700 text-base sm:text-lg mt-2">No Resumes Found.Upload your resumes to get started</h2>) :(<h2 className="text-gray-700 text-base sm:text-lg mt-2">
            Review your submissions and check AI generated feedback
          </h2>)}
        </div>
        {loadingResumes && (
          <div className="flex justify-center items-center mt-10">
            <img src="/images/resume-scan-2.gif" alt="Loading resumes..." className="w-[200px]" />
          </div>
        )}

      {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section mt-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
