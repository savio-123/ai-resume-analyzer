import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'
import { usePuterStore } from '~/lib/puter';

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
  const {fs} = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const loadResume = async () => {
      const resumeBlob = await fs.read(imagePath);
      if(!resumeBlob) return;
      const url = URL.createObjectURL(resumeBlob);
      setResumeUrl(url);
    }
    loadResume();
  }, [imagePath]);
  return (
    <Link
      to={`/resume/${id}`}
      className='resume-card animate-in fade-in duration-1000 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto'
    >
      <div className='resume-card-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
        <div className='flex flex-col gap-2 text-center sm:text-left'>
         {companyName && <h2 className='text-black font-bold wrap-break-word text-lg sm:text-xl'>
            {companyName}
          </h2>}
          {jobTitle && <h3 className='text-base sm:text-lg text-gray-500 wrap-break-word'>
            {jobTitle}
          </h3>}
          {!companyName && !jobTitle && <h2 className='text-black! font-bold wrap-break-word text-lg sm:text-xl'>
            Resume
          </h2>}
        </div>
        <div className='shrink-0 flex justify-center sm:justify-end'>
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className='gradient-border animate-in fade-in duration-1000 mt-3'>
        <div className='w-full h-full'>
          <img
            src={resumeUrl}
            alt={companyName}
            className='w-full h-[250px] sm:h-[300px] object-cover object-top rounded-xl'
          />
        </div>
      </div>
    )}
    </Link>
  )
}

export default ResumeCard
