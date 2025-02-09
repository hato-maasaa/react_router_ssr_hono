import { Link } from "react-router";
import { apiClient } from "~/lib/api/apiClient";

export const loader = async () => {
  const sampleData = await apiClient.sample.$get();
  const { message } = await sampleData.json();
  console.log(message);
};

export default function Home() {
  async function fetchDashboard() {
    await fetch("/private");
  }

  return (
    <div className="p-5">
      <h1 className="mb-5 text-4xl">トップ</h1>

      <div className="grid grid-cols-1 gap-3">
        <Link to="/private" className="underline">
          ダッシュボード(system errorが起きる)
        </Link>
        <Link to="/private" className="underline" reloadDocument>
          ダッシュボード（reloadDocument）
        </Link>
       
        <Link to="/login" className="underline">
          ログイン
        </Link>
      </div>
    </div>
  );
}