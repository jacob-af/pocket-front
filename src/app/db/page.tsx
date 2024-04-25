export default async function Landing() {
  return (
    <div className="max-w-lg">
      This is a protected route.
      <br />
      You will only see this if you are authenticated.
    </div>
  );
}
