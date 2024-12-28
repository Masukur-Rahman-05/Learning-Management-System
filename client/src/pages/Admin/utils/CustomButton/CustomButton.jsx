import { Button } from "@/components/ui/button";

export const CustomSaveButton = ({ children }) => {
  return (
    <Button
      type="submit"
      className="w-full bg-slate-900 text-white hover:bg-slate-950"
    >
      {children}
    </Button>
  );
};
export const CustomUploadButton = ({ children }) => {
  return (
    <Button
      type="submit"
      className="w-full bg-slate-900 text-white hover:bg-slate-950"
    >
      {children}
    </Button>
  );
};
