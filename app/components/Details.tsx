import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

// ✅ SCORE BADGE
const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 px-2 py-1 rounded-full text-sm sm:text-base",
        score > 69
          ? "bg-badge-green"
          : score > 39
          ? "bg-badge-yellow"
          : "bg-badge-red"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4 sm:size-5"
      />
      <p
        className={cn(
          "font-medium",
          score > 69
            ? "text-badge-green-text"
            : score > 39
            ? "text-badge-yellow-text"
            : "text-badge-red-text"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

// ✅ CATEGORY HEADER
const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 sm:gap-4 items-center py-2">
      <p className="text-lg sm:text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// ✅ CATEGORY CONTENT
const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      {/* ✅ Quick overview grid */}
      <div className="bg-gray-50 w-full rounded-lg px-4 sm:px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div
            className="flex flex-row gap-2 items-center"
            key={index}
          >
            <img
              src={
                tip.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="tip icon"
              className="size-4 sm:size-5"
            />
            <p className="text-base sm:text-lg text-gray-600">{tip.tip}</p>
          </div>
        ))}
      </div>

      {/* ✅ Detailed explanation cards */}
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-4 sm:p-6",
              tip.type === "good"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="icon"
                className="size-4 sm:size-5"
              />
              <p className="text-lg sm:text-xl font-semibold">{tip.tip}</p>
            </div>
            <p className="text-sm sm:text-base">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ MAIN COMPONENT
const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-6 w-full px-3 sm:px-6 md:px-10">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
