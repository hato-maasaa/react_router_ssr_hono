import { Link } from "react-router";
import { apiClient } from "~/util/api/apiClient";

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
          ダッシュボード
        </Link>
        <Link to="/private" className="underline" reloadDocument>
          ダッシュボード（reloadDocument）
        </Link>
        <button
          type="button"
          className="w-fit underline"
          onClick={fetchDashboard}
        >
          ダッシュボード（fetch）
        </button>
        <Link to="/login" className="underline">
          ログイン
        </Link>
      </div>
    </div>
  );
}