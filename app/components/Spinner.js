export default function Spinner({ size = "5" }) {
  return (
    <span
      className={`inline-block h-${size} w-${size} animate-spin rounded-full border-4 border-orange-300  border-t-transparent`}
      aria-label="Loading"
      role="status"
    />
  );
}