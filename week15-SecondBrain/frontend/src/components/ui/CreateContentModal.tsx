import { CrossIcon } from "../icons/CrossIcon";
import { useState } from "react";

interface IformData {
  title: string;
  description: string;
  url: string;
  platformType: string;
}

interface CreateContentModelProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateContentModel = ({ isOpen, setIsOpen }: CreateContentModelProps) => {
  const [formData, setFormData] = useState<IformData>({
    title: "",
    description: "",
    url: "",
    platformType: "default",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsOpen(false); // close modal after submit
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
      >
        <div onClick={() => setIsOpen(false)} className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700">
            <CrossIcon size="md" />
        </div>

        {/* Title */}
        <div className="my-4 flex gap-1 items-baseline">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border p-1 w-full rounded"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-4 flex gap-1 items-baseline">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />
        </div>

        {/* URL */}
        <div className="mb-4 flex gap-1 items-baseline">
          <label htmlFor="url" className="block font-medium mb-1">
            Content URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Content
        </button>
      </form>
    </div>
  );
};
