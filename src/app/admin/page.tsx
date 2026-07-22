"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const [steps, setSteps] = useState([
    { stepNumber: 1, text: "", imageFile: null as File | null, audioFile: null as File | null }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddStep = () => {
    setSteps([...steps, { stepNumber: steps.length + 1, text: "", imageFile: null, audioFile: null }]);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setSteps(newSteps);
  };

  const handleStepChange = (index: number, field: string, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const handleSave = async () => {
    setIsUploading(true);
    setMessage("Đang tải dữ liệu lên Supabase...");
    
    try {
      // 1. Tải Video (Mô phỏng hoặc thực tế dùng Supabase Storage)
      if (videoFile) {
        // Ví dụ: await supabase.storage.from('videos').upload(`tutorials/${videoFile.name}`, videoFile);
      }

      // 2. Tải Ảnh và Audio cho từng bước
      for (const step of steps) {
        if (step.imageFile) {
          // await supabase.storage.from('images').upload(`tutorials/step_${step.stepNumber}.jpg`, step.imageFile);
        }
        if (step.audioFile) {
           // await supabase.storage.from('audios').upload(`tutorials/step_${step.stepNumber}.mp3`, step.audioFile);
        }
      }

      // 3. Lưu vào Database (Mô phỏng)
      // await supabase.from('tutorials').insert({ title, description, ... });

      setTimeout(() => {
        setMessage("Lưu bài hướng dẫn thành công!");
        setIsUploading(false);
        // Reset form
        setTitle("");
        setDescription("");
        setVideoFile(null);
        setSteps([{ stepNumber: 1, text: "", imageFile: null, audioFile: null }]);
      }, 1500);
      
    } catch (error) {
      console.error(error);
      setMessage("Có lỗi xảy ra khi lưu.");
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20 font-sans">
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-primary-700 hover:text-primary-900 font-bold text-xl active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Về Trang Chủ
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Trang Quản Trị (Admin)</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 font-bold text-center">
            {message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-primary-800 mb-6 border-b pb-2">Thông tin Hướng dẫn</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Tên ứng dụng / Tiêu đề</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Hướng dẫn sử dụng Zalo"
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Mô tả ngắn</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="VD: Cách gọi điện thoại cho con cháu"
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:outline-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Video Hướng dẫn tổng quan</label>
              <div className="border-2 border-dashed border-primary-300 bg-primary-50 p-6 rounded-xl flex items-center justify-center flex-col cursor-pointer hover:bg-primary-100 transition-colors relative">
                <input 
                  type="file" 
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-primary-500 mb-2" />
                <span className="font-medium text-primary-700">
                  {videoFile ? videoFile.name : "Nhấn để chọn hoặc kéo thả Video vào đây"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-primary-800 mb-6 border-b pb-2">Các Bước Hướng Dẫn</h2>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
                <button 
                  onClick={() => handleRemoveStep(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-2"
                  title="Xóa bước này"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
                
                <h3 className="font-bold text-xl mb-4">Bước {step.stepNumber}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Nội dung hướng dẫn</label>
                    <textarea 
                      value={step.text}
                      onChange={(e) => handleStepChange(index, "text", e.target.value)}
                      placeholder="Nhập chữ hướng dẫn..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Hình minh họa</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleStepChange(index, "imageFile", e.target.files?.[0])}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Âm thanh đọc (Audio)</label>
                      <input 
                        type="file" 
                        accept="audio/*"
                        onChange={(e) => handleStepChange(index, "audioFile", e.target.files?.[0])}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleAddStep}
            className="mt-6 flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-6 h-6 mr-2" />
            Thêm bước mới
          </button>
        </div>

        <button 
          onClick={handleSave}
          disabled={isUploading}
          className="w-full flex items-center justify-center p-5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xl shadow-lg disabled:opacity-50 transition-colors"
        >
          {isUploading ? (
            <span className="animate-pulse">Đang lưu...</span>
          ) : (
            <>
              <Save className="w-6 h-6 mr-3" />
              Lưu bài hướng dẫn lên hệ thống
            </>
          )}
        </button>
      </div>
    </main>
  );
}
