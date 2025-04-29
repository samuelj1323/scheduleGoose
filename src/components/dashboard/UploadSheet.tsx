import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/Button";
import { useFormik } from "formik";
import { FileUpload } from "../ui/FileUpload";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Datepicker } from "../ui/Datepicker";
import { useMutation } from "@tanstack/react-query";
export const UploadSheet = ({
  isSheetOpen,
  setIsSheetOpen,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: (isSheetOpen: boolean) => void;
}) => {
  interface scheduledContent {
    title: string;
    platform: string;
    status: string;
    description: string;
    publishDate: Date;
    file: File | null;
  }
  const formik = useFormik({
    initialValues: {
      status: "scheduled",
      platform: "",
      title: "",
      description: "",
      publishDate: new Date(),
      file: null,
    },
    onSubmit: (values: scheduledContent) => {
      scheduledContentMutation.mutate(values);
    },
  });

  const scheduledContentMutation = useMutation({
    mutationFn: (values: scheduledContent) => {
      return fetch("http://localhost:3000/api/v1/scheduledContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      setIsSheetOpen(false);
    },
  });
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="default">
          New Upload
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card ">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-primaryColor">
            Create New Upload
          </SheetTitle>
          <SheetDescription>
            Use this form to create a new upload.
          </SheetDescription>
        </SheetHeader>
        <div className="p-6">
          <form onSubmit={formik.handleSubmit}>
            <Label htmlFor="title">Title</Label>
            <Input
              className="mb-4"
              type="text"
              name="title"
              placeholder="Title"
              onChange={formik.handleChange}
            />
            <FileUpload
              className="mb-4 w-full"
              name="file"
              label="Upload a file"
              onChange={formik.handleChange}
              accept=".mov, .mp4"
            />
            <Label htmlFor="description">Description</Label>
            <Textarea
              className="mb-4"
              name="description"
              placeholder="Description"
              onChange={formik.handleChange}
            />
            <Label htmlFor="platform">Platform</Label>
            <Select
              onValueChange={(value) => formik.setFieldValue("platform", value)}
            >
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">Youtube</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="publishDate">Publish Date</Label>
            <Datepicker
              name="publishDate"
              onChange={formik.handleChange}
              value={
                formik.values.publishDate
                  ? new Date(formik.values.publishDate)
                  : new Date()
              }
            />
            <Button type="submit" className="mt-4">
              Upload
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
