import Card from "./components/Card";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <div>
      <Categories />
      <div className="mt-5 cursor-pointer p-6 ">
        <Card />
      </div>
    </div>
  )
}
