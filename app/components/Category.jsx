"use client"

import { useRouter, useSearchParams } from "next/navigation"

function Category({props}) {
  const router = useRouter()
  const isActive = useSearchParams() || ''
  const theme = isActive.get('theme') || ''

  return (
    <div className={`${props === theme ? " bg-[#2e2e2e] text-[#fff]  shadow-sm border-none hover:bg-[#2e2e2e] hover:text-[#fff] " : "" }
    p-5 cursor-pointer font-bold hover:bg-slate-200 rounded-full transition-colors duration-200 active:brightness-125`}
    onClick={() => router.push(`/?theme=${props}`)}
    >
        {props}
    </div>
  )
}

export default Category
