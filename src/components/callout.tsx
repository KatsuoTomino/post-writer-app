export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 font-bold text-lg rounded-md">
      <div>{children}</div>
    </div>
  );
}
