import type { ReactElement } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { Button } from "./Button";

type PlatformType = "default"; {/* | "twitter" | "youtube" | "instagram" */} // ✅ extendable for future platforms

interface ICardProps {
  platformType: PlatformType;
  title: string;
  description?: string;
  tags?: string[]; // ✅ allow tags like #ideas, #learning
  url: string; // ✅ URL of the content to embed
}

const platformIcons: Record<
  PlatformType,
  (props: { size: "sm" | "md" | "lg" }) => ReactElement
> = {
//   twitter: (props) => <TwitterIcon {...props} />,
//   youtube: (props) => <YoutubeIcon {...props} />,
//   instagram: (props) => <InstagramIcon {...props} />,
  default: (props) => <DocumentIcon {...props} />,
};

export const Card = (props: ICardProps): ReactElement => {
  const IconComponent = platformIcons[props.platformType];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-72 border-[1px] border-gray-200 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {IconComponent({ size: "md" })}
          <span className="font-semibold text-gray-800">{props.title}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 pr-[12px]">
          <ShareIcon size="md" />
          <DeleteIcon size="md" />
        </div>
      </div>

      {/* Description */}
      {props.description && (
        <p className="mt-2 text-sm text-gray-600">{props.description}</p>
      )}
        {props.platformType === 'default' && (
          <div className="pt-4">
            <iframe 
                width={"100%"}
                src={props.url}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen>
            </iframe>
        </div>
        )}
      {/* Tags */}
      {props.tags && props.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {props.tags.map((tag) => (
            <span
              key={tag}
            >
              <Button variant="secondary" size="sm" text={`#${tag}`} onClick={() => {}} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
