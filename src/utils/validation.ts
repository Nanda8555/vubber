export const passwordStrengthRegex = {
  minLength: /.{8,}/,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

export const validatePassword = (password: string) => {
  const checks = {
    minLength: passwordStrengthRegex.minLength.test(password),
    hasUpperCase: passwordStrengthRegex.hasUpperCase.test(password),
    hasLowerCase: passwordStrengthRegex.hasLowerCase.test(password),
    hasNumber: passwordStrengthRegex.hasNumber.test(password),
    hasSpecialChar: passwordStrengthRegex.hasSpecialChar.test(password),
  };

  return {
    isValid: Object.values(checks).every(Boolean),
    checks,
  };
};

/**
 * Represents an invalid file with a reason why it's invalid.
 */
type InvalidFile = {
  /**
   * The file object that is invalid.
   */
  file: File;
  /**
   * The reason why the file is considered invalid.
   */
  reason: string;
};

/**
 * Validates an array of files, separating them into valid and invalid files.
 * @param {FileList} files - The files to validate.
 * @param {number} [maxFileSize=256 * 1024 * 1024 * 1024] - The maximum allowed file size (default is 256GB).
 * @returns {{ validFiles: File[], invalidFiles: InvalidFile[] }} An object containing arrays of valid and invalid files.
 */
export function validateFiles(
  files: FileList,
  maxFileSize: number = 256 * 1024 * 1024 * 1024
): { validFiles: File[]; invalidFiles: InvalidFile[] } {
  const validFiles: File[] = [];
  const invalidFiles: InvalidFile[] = [];
  for (const file of files) {
    if (file.type === "video/mp4") {
      if (file.size <= maxFileSize) {
        validFiles.push(file);
      } else {
        invalidFiles.push({
          file,
          reason: "Max size is 256GB.",
        });
      }
    } else {
      invalidFiles.push({ file, reason: "Invalid file type." });
    }
  }
  return { validFiles, invalidFiles };
} 