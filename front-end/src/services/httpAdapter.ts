export default async function httpAdapter(url: string) {
  const baseUrl = "http://localhost:3000";
  return (await fetch(`${baseUrl}${url}`)).json();
}
