import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  name: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  onChange,
  accept,
  className,
}) => {
  return (
    <div className={`grid w-full items-center gap-1.5 ${className}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        name={name}
        type="file"
        className="w-full"
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
};
