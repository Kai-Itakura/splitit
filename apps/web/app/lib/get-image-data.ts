export const getImageData = (
  e: React.ChangeEvent<HTMLInputElement>,
): File | null | undefined => {
  e.preventDefault();
  return e.target.files && e.target.files[0];
};
