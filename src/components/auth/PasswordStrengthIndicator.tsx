import { Progress } from "@/components/ui/progress";

interface PasswordStrengthProps {
  password: string;
  checks: {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export function PasswordStrengthIndicator({ password, checks }: PasswordStrengthProps) {
  const strength = Object.values(checks).filter(Boolean).length;
  const percentage = (strength / 5) * 100;

  return (
    <div className="space-y-2">
      <Progress value={percentage} className="h-2" />
      <ul className="text-sm space-y-1">
        <li className={checks.minLength ? "text-green-500" : "text-gray-500"}>
          • At least 8 characters
        </li>
        <li className={checks.hasUpperCase ? "text-green-500" : "text-gray-500"}>
          • At least one uppercase letter
        </li>
        <li className={checks.hasLowerCase ? "text-green-500" : "text-gray-500"}>
          • At least one lowercase letter
        </li>
        <li className={checks.hasNumber ? "text-green-500" : "text-gray-500"}>
          • At least one number
        </li>
        <li className={checks.hasSpecialChar ? "text-green-500" : "text-gray-500"}>
          • At least one special character
        </li>
      </ul>
    </div>
  );
}