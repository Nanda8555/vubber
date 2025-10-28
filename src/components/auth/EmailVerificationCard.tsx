import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/utils/styles";

type VerificationState = "input" | "code" | "verifying" | "success" | "error";

export default function EmailVerificationCard({ style = "", email }) {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [verificationState, setVerificationState] =
    useState<VerificationState>("input");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setVerificationState("verifying");
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join("");
    if (code.length !== 6) return;

    setVerificationState("verifying");

    //verify email goes here
  };

  const handleTryAgain = () => {
    setVerificationState("code");
    setVerificationCode(["", "", "", "", "", ""]);
    setErrorMessage("");
  };

  const handleStartOver = () => {
    setVerificationState("input");
    setVerificationCode(["", "", "", "", "", ""]);
    setErrorMessage("");
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", style)}>
      <CardHeader>
        <CardTitle className="text-2xl">Email Verification</CardTitle>
        <CardDescription>
          {verificationState === "input" &&
            "Enter your email to receive a verification code"}
          {verificationState === "code" &&
            "Enter the 6-digit code sent to your email"}
          {verificationState === "verifying" && "Verifying your code..."}
          {verificationState === "success" && "Your email has been verified"}
          {verificationState === "error" && "Verification failed"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationState === "input" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Your current profile's email address:
              </Label>
              <div className="flex space-x-4">
                <span className="w-full">{email}</span>
                <Button type="submit" className="text-white w-min">
                  Send code
                </Button>
              </div>
            </div>
          </form>
        )}

        {verificationState === "code" && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code-0">Verification code</Label>
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit code to {email}
              </p>
              <div className="flex gap-2 mt-2">
                {verificationCode.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={verificationCode.some((digit) => !digit)}
            >
              Verify
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full"
              onClick={handleStartOver}
            >
              Change email
            </Button>
          </form>
        )}

        {verificationState === "verifying" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-center text-muted-foreground">
              Please wait while we verify your code...
            </p>
          </div>
        )}

        {verificationState === "success" && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">
              Verification Successful
            </h3>
            <p className="mt-2 text-center text-muted-foreground">
              Your email address has been successfully verified.
            </p>
          </div>
        )}

        {verificationState === "error" && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Verification Failed</h3>
            <p className="mt-2 text-center text-muted-foreground">
              {errorMessage}
            </p>
            <div className="mt-6 flex gap-4">
              <Button onClick={handleTryAgain}>Try Again</Button>
              <Button variant="outline" onClick={handleStartOver}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter
        className={cn(
          "flex justify-between text-xs text-muted-foreground",
          (verificationState === "success" || verificationState === "error") &&
            "hidden"
        )}
      >
        <p>Didn't receive a code?</p>
        <Button variant="link" size="sm" className="p-0 h-auto">
          Resend code
        </Button>
      </CardFooter>
    </Card>
  );
}
