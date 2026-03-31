import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  Video, 
  Sparkles, 
  Clapperboard, 
  Zap, 
  CheckCircle2, 
  PlayCircle,
  ArrowRight,
  ArrowUp,
  Mail,
  Globe,
  Facebook,
  Youtube,
  MessageCircle,
  Key,
  Film,
  Mic,
  Camera,
  Tag
} from 'lucide-react';

const MODULES = [
  {
    title: "Xưởng Truyện (Story Studio)",
    description: "Sáng tác truyện đa dạng chủ đề: Chủ tịch, Tình cảm, Kinh dị, Nấu ăn...",
    icon: <PenTool className="w-6 h-6" />,
    color: "bg-blue-500",
    steps: [
      "Chọn chủ đề truyện mong muốn từ danh sách gợi ý phong phú.",
      "Nhấn \"Gợi ý ý tưởng\" để AI đưa ra các cốt truyện hấp dẫn hoặc tự nhập nội dung.",
      "Quản lý nhân vật: Đặt tên, chọn giới tính và trang phục (mặc định là Cameo).",
      "Phát triển kịch bản chi tiết từng cảnh quay kèm lời thoại và mô tả hành động.",
      "Review toàn bộ prompt ở Bước 3 trước khi xuất file hoặc copy sử dụng."
    ]
  },
  {
    title: "Phân tích Video (Video Analyzer)",
    description: "Tải video lên để AI phân tích thoại, cảnh quay và tự động tạo kịch bản mới.",
    icon: <Video className="w-6 h-6" />,
    color: "bg-orange-500",
    steps: [
      "Tải video cần phân tích lên hệ thống (Hỗ trợ MP4, WebM, tối đa 20MB).",
      "Nhấn \"PHÂN TÍCH VIDEO\" để AI trích xuất lời thoại và mô tả từng cảnh quay kèm timestamp.",
      "AI sẽ tự động đưa ra cốt truyện (Plot) tổng thể dựa trên nội dung video đã phân tích.",
      "Nhấn \"TẠO KỊCH BẢN\" để AI xây dựng một kịch bản phim mới (chia thành các tập 12s).",
      "Nhấn \"CHIA PROMPT (12S)\" ở mỗi tập để nhận prompt video AI chuyên nghiệp cho cảnh đó."
    ]
  },
  {
    title: "Prompt Đơn (Cinematic)",
    description: "Tạo prompt video AI chuyên nghiệp từ ý tưởng tiếng Việt. Tối ưu cho Jimeng, Luma, Runway.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-orange-600",
    steps: [
      "Nhập ý tưởng video bằng tiếng Việt (ví dụ: Một con rồng bay trên mây).",
      "Chọn nhân vật từ danh sách hoặc thêm mới để giữ tính nhất quán về ngoại hình.",
      "Hệ thống tự động dịch sang tiếng Anh chuyên ngành điện ảnh và tối ưu cấu trúc prompt.",
      "Sử dụng các nút \"Copy\" để lấy prompt và dán vào công cụ tạo video AI của bạn.",
      "Mẹo: Sử dụng nút \"Làm mới\" (RotateCcw) ở thanh menu nếu muốn bắt đầu lại từ đầu."
    ]
  },
  {
    title: "Phim Võ Thuật (Series)",
    description: "Xây dựng kịch bản phim hành động dài tập với logic va chạm vật lý cực mạnh.",
    icon: <Clapperboard className="w-6 h-6" />,
    color: "bg-red-500",
    steps: [
      "Nhập ý tưởng phim hoặc chọn từ danh sách xu hướng phim võ thuật.",
      "Phát triển kịch bản tổng thể (Outline) cho nhiều tập phim liên kết nhau.",
      "Chia nhỏ từng tập thành các cảnh quay ngắn (khoảng 12 giây mỗi cảnh).",
      "Tạo prompt có tính liên kết (Continuity) giúp nhân vật không bị thay đổi giữa các cảnh.",
      "Kiểm tra kỹ phần \"Cameo\" để đảm bảo trang phục nhân vật đồng nhất."
    ]
  },
  {
    title: "Bán Hàng (Sales Module)",
    description: "Tạo kịch bản video ngắn bán hàng, review sản phẩm theo các mô hình tâm lý khách hàng.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-yellow-500",
    steps: [
      "Nhập thông tin sản phẩm/dịch vụ chi tiết (Tên, tính năng, lợi ích).",
      "Chọn chủ đề phim (ví dụ: Chủ tịch giả nghèo, Hợp đồng hôn nhân...) để lồng ghép sản phẩm.",
      "AI sẽ tạo kịch bản kịch tính, thu hút người xem từ những giây đầu tiên.",
      "Tùy chỉnh nhân vật và trang phục để phù hợp với thương hiệu của bạn.",
      "Xuất prompt video AI để tạo ra các clip quảng cáo chuyên nghiệp, chi phí thấp."
    ]
  },
  {
    title: "Bán hàng trực tiếp (Direct Sales)",
    description: "Tạo prompt video Jimeng chuyên nghiệp cho bán hàng trực tiếp với thời lượng tùy chỉnh.",
    icon: <Video className="w-6 h-6" />,
    color: "bg-orange-600",
    steps: [
      "Nhập thông tin sản phẩm chi tiết (Tên, đặc điểm, giá bán).",
      "Chọn vùng miền (Bắc, Trung, Nam) để AI tối ưu giọng điệu và văn hóa.",
      "Chọn phong cách bán hàng (Nói giá ngay, Trải nghiệm thực tế, Bí mật...).",
      "Tùy chỉnh thời lượng video theo bước nhảy 12 giây (12s, 24s, 36s...) để tối ưu cho Jimeng.",
      "Nhấn \"TẠO PROMPT JIMENG\" để nhận 5 phiên bản prompt (Anh, Việt, Trung) chuyên nghiệp."
    ]
  },
  {
    title: "AI THỜI TRANG (Fashion AI)",
    description: "Tạo video thời trang chuyên nghiệp với người mẫu AI và bối cảnh được tối ưu tự động.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-purple-500",
    steps: [
      "Chọn phong cách quay phim thời trang (Runway, Studio, Street Style...).",
      "Tùy chỉnh thời lượng video (12s, 24s, 36s...) để tối ưu cho Jimeng.",
      "Nhấn \"PHÂN TÍCH NGƯỜI MẪU\" để AI tự động đề xuất người mẫu và bối cảnh phù hợp.",
      "Kiểm tra và tùy chỉnh thông tin người mẫu, trang phục và môi trường.",
      "Nhấn \"TẠO PROMPT CHI TIẾT\" để nhận 5 phân cảnh trình diễn thời trang đẳng cấp."
    ]
  },
  {
    title: "Giải pháp Marketing",
    description: "Hệ sinh thái công cụ hỗ trợ doanh nghiệp tăng trưởng doanh số tự động.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-indigo-500",
    steps: [
      "Khám phá các giải pháp Chatbot AI tự động trả lời bình luận và tin nhắn.",
      "Tối ưu hóa quy trình chăm sóc khách hàng đa kênh (Fanpage, Zalo, Website).",
      "Sử dụng công cụ gửi tin nhắn hàng loạt để tiếp cận khách hàng cũ hiệu quả.",
      "Tích hợp các giải pháp tự động hóa quy trình (Automation) giúp tiết kiệm nhân sự.",
      "Liên hệ trực tiếp để được demo và tư vấn giải pháp đo ni đóng giày cho doanh nghiệp."
    ]
  }
];

const VEO3_MODULES = [
  {
    title: "Cài đặt chung & API Key",
    description: "Cấu hình hệ thống và quản lý khóa truy cập Gemini API.",
    icon: <Key className="w-6 h-6" />,
    color: "bg-amber-500",
    steps: [
      "Hệ thống yêu cầu Gemini API Key để hoạt động. Bạn có thể nhập một hoặc nhiều Key (mỗi Key một dòng).",
      "Hệ thống tự động xoay vòng Key nếu một Key bị hết hạn hoặc lỗi Quota (429).",
      "Dữ liệu của bạn được lưu trữ cục bộ (LocalStorage), đảm bảo tính riêng tư."
    ],
    noButton: true
  },
  {
    title: "Nhân Hóa (Tạo Kịch bản)",
    description: "Quy trình thiết lập nhân vật và kịch bản chi tiết theo từng phân cảnh.",
    icon: <Film className="w-6 h-6" />,
    color: "bg-orange-500",
    steps: [
      "Bước 1: Thiết lập nhân vật (Tên, vai trò, giọng đọc). Tối đa 4 nhân vật.",
      "Bước 2: Chọn chủ đề hoặc nhập kịch bản có sẵn. Bạn có thể dùng nút \"Gợi ý\" để AI tìm ý tưởng.",
      "Bước 3: Chọn phong cách hình ảnh (Người thật hoặc Hoạt hình 3D) và cảm xúc lời thoại.",
      "Bước 4: Bấm \"Tạo Kịch bản & Prompt\" để nhận kết quả chi tiết từng cảnh quay."
    ]
  },
  {
    title: "Giọng Đọc (TTS)",
    description: "Chuyển đổi văn bản thành giọng nói tự nhiên với cảm xúc và nhấn nhá.",
    icon: <Mic className="w-6 h-6" />,
    color: "bg-blue-500",
    steps: [
      "Nhập văn bản và chọn giọng đọc phù hợp (Nam/Nữ, vùng miền).",
      "Sử dụng \"Style Instruction\" để điều chỉnh cảm xúc, tốc độ và cách nhấn nhá của AI.",
      "Có thể tối ưu hóa hướng dẫn đọc bằng AI để giọng nói tự nhiên hơn.",
      "Tải xuống file âm thanh chất lượng cao để lồng tiếng cho video."
    ]
  },
  {
    title: "ẢNH AI (Vision & Try-On)",
    description: "Phân tích đặc điểm ngoại hình và thử đồ thực tế ảo chuyên nghiệp.",
    icon: <Camera className="w-6 h-6" />,
    color: "bg-emerald-500",
    steps: [
      "Quét Ảnh: Tải lên ảnh để AI phân tích đặc điểm ngoại hình, trang phục và bối cảnh.",
      "Thử Đồ: Tải lên ảnh người mẫu và sản phẩm để AI tự động \"mặc\" đồ chân thực.",
      "Hệ thống tạo ra nhiều phiên bản khác nhau để bạn dễ dàng lựa chọn.",
      "Kết quả có thể dùng làm Prompt tham chiếu cho các module tạo kịch bản."
    ]
  },
  {
    title: "AFFILIATE VEO3 (Review & Mẹo vặt)",
    description: "Chuyên dụng cho Review sản phẩm không lộ mặt và Mẹo vặt đời sống.",
    icon: <Tag className="w-6 h-6" />,
    color: "bg-rose-500",
    steps: [
      "Tạo kịch bản review sản phẩm không lộ mặt (Non-Face Review) chuyên nghiệp.",
      "Tạo kịch bản mẹo vặt (Life Hacks) độc đáo, mới lạ từ gợi ý của AI.",
      "Tự động tạo hình ảnh minh họa AI cho từng phân cảnh dựa trên ảnh sản phẩm thật hoặc bối cảnh mẹo vặt.",
      "Hỗ trợ nhiều bố cục kịch bản TikTok/Shorts và phong cách hình ảnh khác nhau."
    ]
  }
];

export default function App() {
  const JIMENG_URL = "https://jimeng.namlv.io.vn/";
  const VEO3_URL = "https://veo3.namlv.io.vn/";
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header/Hero Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
              Hệ sinh thái <span className="text-blue-600">AI Studio</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
              Khám phá các module AI chuyên sâu giúp tối ưu hóa quy trình sáng tạo nội dung và marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {MODULES.map((module, index) => (
              <div 
                key={index} 
                className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 flex flex-col h-full transition-transform hover:scale-[1.01]"
              >
                <div className="p-8 sm:p-10 flex-grow">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`${module.color} p-4 rounded-2xl text-white shadow-lg`}>
                      {module.icon}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    {module.title}
                  </h2>
                  
                  <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                    {module.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      CÁC BƯỚC THỰC HIỆN:
                    </h3>
                    {module.steps.map((step, sIndex) => (
                      <div key={sIndex} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-600 text-[1.05rem] leading-snug">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <a 
                    href={JIMENG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-3 py-5 px-8 rounded-2xl text-white font-bold text-lg uppercase tracking-wider transition-all hover:brightness-110 active:scale-[0.98] shadow-lg ${module.color}`}
                  >
                    <PlayCircle className="w-6 h-6" />
                    BẮT ĐẦU SỬ DỤNG NGAY
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* VEO3 Section */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {VEO3_MODULES.map((module, index) => (
              <div 
                key={index} 
                className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 flex flex-col h-full transition-transform hover:scale-[1.01]"
              >
                <div className="p-8 sm:p-10 flex-grow">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`${module.color} p-4 rounded-2xl text-white shadow-lg`}>
                      {module.icon}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    {module.title}
                  </h2>
                  
                  <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                    {module.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      CÁC BƯỚC THỰC HIỆN:
                    </h3>
                    {module.steps.map((step, sIndex) => (
                      <div key={sIndex} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-600 text-[1.05rem] leading-snug">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {!module.noButton && (
                  <div className="p-6 sm:p-8 pt-0">
                    <a 
                      href={VEO3_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-3 py-5 px-8 rounded-2xl text-white font-bold text-lg uppercase tracking-wider transition-all hover:brightness-110 active:scale-[0.98] shadow-lg ${module.color}`}
                    >
                      <PlayCircle className="w-6 h-6" />
                      TRẢI NGHIỆM NGAY
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900">Nam AI Studio</span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-sm">
                Hệ sinh thái AI tích hợp kịch bản, hình ảnh, giọng nói và tự động hóa Marketing.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Liên kết nhanh</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Hướng dẫn sử dụng</a></li>
                <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Bảng giá dịch vụ</a></li>
                <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Điều khoản & Chính sách</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Thông tin liên hệ</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-500">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="hover:text-blue-600 transition-colors">Zalo hỗ trợ: 0981028794</span>
                </li>
                <li className="flex items-center gap-3 text-slate-500">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <a href="https://namlv.io.vn/" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">namlv.io.vn</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>© 2026 Nam AI Studio. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-2xl transition-all duration-300 z-50 hover:bg-blue-700 hover:scale-110 active:scale-95 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}
