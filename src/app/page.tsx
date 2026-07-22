import { Search, MessageCircle, MapPin, Bike, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const popularApps = [
    {
      id: "zalo",
      name: "Zalo",
      description: "Gọi điện, nhắn tin miễn phí",
      icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    },
    {
      id: "vneid",
      name: "VNeID",
      description: "Định danh điện tử, giấy tờ",
      icon: <ShieldCheck className="w-12 h-12 text-red-500" />,
      color: "bg-red-50 hover:bg-red-100 border-red-200",
    },
    {
      id: "grab",
      name: "Grab",
      description: "Đặt xe, giao đồ ăn nhanh",
      icon: <MapPin className="w-12 h-12 text-green-600" />,
      color: "bg-green-50 hover:bg-green-100 border-green-200",
    },
    {
      id: "be",
      name: "Be",
      description: "Gọi xe ôm, taxi công nghệ",
      icon: <Bike className="w-12 h-12 text-yellow-500" />,
      color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
    },
  ];

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
          Công nghệ trong tầm tay
        </h1>
        <p className="text-xl text-gray-700">
          Ông/bà muốn học cách sử dụng ứng dụng nào hôm nay?
        </p>
      </header>

      {/* Search Bar */}
      <section className="mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-8 w-8 text-primary-600" />
          </div>
          <input
            type="text"
            className="block w-full pl-20 pr-6 py-6 text-2xl border-4 border-primary-200 rounded-3xl bg-white shadow-sm focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
            placeholder="Tìm kiếm (ví dụ: Zalo, Youtube...)"
          />
        </div>
      </section>

      {/* Popular Apps */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-100 pb-2">
          Các ứng dụng phổ biến
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularApps.map((app) => (
            <Link
              key={app.id}
              href={`/tutorial/${app.id}`}
              className={`flex items-center p-6 border-2 rounded-2xl transition-transform active:scale-95 ${app.color} shadow-sm`}
            >
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mr-6">
                {app.icon}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {app.name}
                </h3>
                <p className="text-xl text-gray-700">{app.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
