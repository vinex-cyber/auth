import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { CardWrapper } from "@/components/auth/card-warpper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}>
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
        <p>Please try again later.</p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
