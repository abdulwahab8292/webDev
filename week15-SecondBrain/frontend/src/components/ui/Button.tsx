import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
  type?: "button" | "submit" | "reset"; // ✅ optional prop to control type
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};

const sizeClasses = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-4 px-6 text-lg",
};

const defaultStyles = "rounded-md font-light flex items-center";

export const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"} // ✅ Default to "button" if not provided
      className={`${defaultStyles} ${variantClasses[props.variant]} ${sizeClasses[props.size]} `}
      onClick={props.onClick}
    >
      {props.startIcon && <span className="pr-2">{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
    </button>
  );
};
