
import ScoreBadge from "~/components/ScoreBadge";
import ScoreGauge from "./ScoreGuage";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor =
      score > 70 ? "text-green-600"
      : score > 49 ? "text-yellow-600"
      : "text-red-600";
  
    return (
        <div className="flex flex-row items-center justify-between px-2 sm:px-4 py-2">
        {/* Left side: Title + Badge */}
        <div className="flex flex-row gap-2 items-center">
        <p className="text-md sm:text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
  
        {/* Right side: Score */}
        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    );
  };
  

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    )
}
export default Summary