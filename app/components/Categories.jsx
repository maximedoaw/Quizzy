import { CategoriesArray } from "../lib/utils/helper"
import Category from "./Category"

function Categories() {
  return (
<div className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
  <div className="flex overflow-x-scroll custom-scrollbar justify-center items-center py-0 px-4 space-x-4">
    {CategoriesArray.map((category,id) => (
      <div key={id} className="flex-shrink-0">
        <Category props={category} />
      </div>
    ))}
  </div>
</div>

  )
}

export default Categories
