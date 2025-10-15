'use client'

import { useState } from 'react'

export default function FileUpload() {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  return (
    <div className="space-y-4 rounded-lg border-2 border-dashed border-cyan-300 bg-[#F9FDFD] p-6 text-center">
      <div className="text-3xl text-cyan-400">📁</div>
      <p className="font-semibold text-cyan-950">اختر ملفاً أو اسحبه وأفلته هنا</p>
      <p className="text-sm text-gray-500">تسميات .Doc ,Sheet ,XML حتى 50 ميجا بايت</p>

      <label className="inline-block cursor-pointer rounded bg-cyan-500 px-4 py-2 text-white transition hover:bg-cyan-600">
        اختر ملفاً
        <input
          type="file"
          className="hidden"
          accept=".doc,.docx,.pdf,.png,.jpg,.jpeg,.xml,.xls,.xlsx"
          onChange={handleFileChange}
        />
      </label>

      {fileName && (
        <p className="text-sm text-cyan-700">تم اختيار: {fileName}</p>
      )}
    </div>
  )
}