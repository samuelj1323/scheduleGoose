import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/Button";
import { Formik, Form, Field } from "formik";
export const UploadSheet = ({
  isSheetOpen,
  setIsSheetOpen,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: (isSheetOpen: boolean) => void;
}) => {
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
          <p className="text-sm text-muted-foreground">
            Upload form would go here
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
