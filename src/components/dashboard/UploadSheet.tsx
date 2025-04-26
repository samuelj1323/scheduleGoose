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
export const UploadSheet = ({
  isSheetOpen,
  setIsSheetOpen,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: (isSheetOpen: boolean) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      type: "",
      title: "",
      description: "",
      publishDate: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
        <div className="py-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2.5"></div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
