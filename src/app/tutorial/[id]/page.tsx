import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";
import TutorialSteps from "@/components/TutorialSteps";

// Mock data tạm thời để kiểm tra UI
const mockTutorials = {
  zalo: {
    title: "Hướng dẫn sử dụng Zalo",
    description: "Cách gọi điện và nhắn tin cho con cháu",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Video mẫu
    steps: [
      {
        stepNumber: 1,
        text: "Mở ứng dụng Zalo trên điện thoại. Bạn sẽ thấy biểu tượng màu xanh dương có chữ Zalo.",
        imageUrl: "https://placehold.co/600x400/eff6ff/1d4ed8?text=Zalo+Icon",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
      },
      {
        stepNumber: 2,
        text: "Tìm tên người thân trong danh bạ hoặc ô tìm kiếm ở phía trên cùng màn hình.",
        imageUrl: "https://placehold.co/600x400/eff6ff/1d4ed8?text=Tim+Kiem",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
      },
      {
        stepNumber: 3,
        text: "Bấm vào biểu tượng Hình chiếc điện thoại hoặc Máy quay phim để bắt đầu gọi.",
        imageUrl: "https://placehold.co/600x400/eff6ff/1d4ed8?text=Nut+Goi",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
      },
    ],
  },
  vneid: {
    title: "Hướng dẫn sử dụng VNeID",
    description: "Cách mở Căn cước công dân điện tử",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    steps: [
      {
        stepNumber: 1,
        text: "Mở ứng dụng VNeID và nhập mật khẩu hoặc quét khuôn mặt để đăng nhập.",
        imageUrl: "https://placehold.co/600x400/fef2f2/b91c1c?text=Dang+Nhap",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
      },
      {
        stepNumber: 2,
        text: "Chọn mục 'Ví giấy tờ' ở thanh Menu phía dưới màn hình.",
        imageUrl: "https://placehold.co/600x400/fef2f2/b91c1c?text=Vi+Giay+To",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
      },
    ],
  },
};

export default async function TutorialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tutorial = mockTutorials[id as keyof typeof mockTutorials];

  if (!tutorial) {
    return (
      <main className="min-h-screen p-8 text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Không tìm thấy bài hướng dẫn này
        </h1>
        <Link href="/" className="btn-elderly btn-primary inline-block">
          Quay lại Trang Chủ
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Thanh điều hướng */}
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link
            href="/"
            className="flex items-center text-primary-700 hover:text-primary-900 font-bold text-2xl active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-8 h-8 mr-2" />
            Quay lại
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        {/* Tiêu đề bài học */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {tutorial.title}
          </h1>
          <p className="text-2xl text-gray-700">{tutorial.description}</p>
        </header>

        {/* Video Player */}
        <section className="mb-12 bg-white p-4 md:p-6 rounded-3xl shadow-md border-2 border-primary-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <PlayCircle className="w-8 h-8 mr-3 text-primary-600" />
            Video Hướng Dẫn Chung
          </h2>
          <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              poster={`https://placehold.co/800x450/0f172a/f8fafc?text=Video+${tutorial.title.replace(/ /g, '+')}`}
            >
              <source src={tutorial.videoUrl} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
          </div>
        </section>

        {/* Danh sách các bước (Đã tách thành Client Component) */}
        <TutorialSteps title={tutorial.title} steps={tutorial.steps} />
      </div>
    </main>
  );
}
