import { CategoriesArray } from "../lib/utils/helper"
import Category from "./Category"

function Categories() {
  return (
    <div className="flex overflow-x-scroll custom-scrollbar justify-center mt-5">
        {CategoriesArray.map((category) => <Category props={category}/>)}
    </div>
  )
}

export default Categories
