import { User, Mail, Calendar, Settings, Music2, Award } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="bg-[#f8f3eb] relative w-full h-screen overflow-y-auto">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User size={32} className="text-[#e76d57]" />
            <h1 className="font-['Figtree:Bold',_sans-serif] font-bold text-[#201315] text-[36px] sm:text-[40px] md:text-[48px]">
              Profile
            </h1>
          </div>
          <p className="font-['Figtree:Regular',_sans-serif] text-[#666] text-[16px] sm:text-[18px] md:text-[20px]">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-[24px] p-8 border-2 border-[#e5ddd5] shadow-lg mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="bg-gradient-to-br from-[#e76d57] to-[#e98d77] w-[120px] h-[120px] rounded-full flex items-center justify-center">
              <User size={60} className="text-white" />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-['Figtree:Bold',_sans-serif] font-bold text-[#201315] text-[28px] mb-2">
                John Doe
              </h2>
              <div className="space-y-2 text-[#666]">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={18} />
                  <span className="font-['Figtree:Regular',_sans-serif] text-[16px]">
                    john.doe@example.com
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar size={18} />
                  <span className="font-['Figtree:Regular',_sans-serif] text-[16px]">
                    Member since October 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Settings Button */}
            <button className="px-6 py-3 bg-gradient-to-r from-[#201315] to-[#e76d57] text-white rounded-full hover:scale-105 transition-all text-[15px] font-['Figtree:Bold',_sans-serif] flex items-center gap-2 shadow-lg">
              <Settings size={18} />
              Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[20px] p-6 border-2 border-[#e5ddd5] text-center">
            <div className="bg-gradient-to-br from-[#e76d57] to-[#e98d77] w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4">
              <Music2 size={30} className="text-white" />
            </div>
            <h3 className="font-['Figtree:Bold',_sans-serif] font-bold text-[#201315] text-[32px] mb-1">
              12
            </h3>
            <p className="font-['Figtree:Regular',_sans-serif] text-[#666] text-[14px]">
              Projects Created
            </p>
          </div>

          <div className="bg-white rounded-[20px] p-6 border-2 border-[#e5ddd5] text-center">
            <div className="bg-gradient-to-br from-[#e76d57] to-[#e98d77] w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={30} className="text-white" />
            </div>
            <h3 className="font-['Figtree:Bold',_sans-serif] font-bold text-[#201315] text-[32px] mb-1">
              3
            </h3>
            <p className="font-['Figtree:Regular',_sans-serif] text-[#666] text-[14px]">
              Achievements
            </p>
          </div>

          <div className="bg-white rounded-[20px] p-6 border-2 border-[#e5ddd5] text-center">
            <div className="bg-gradient-to-br from-[#e76d57] to-[#e98d77] w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={30} className="text-white" />
            </div>
            <h3 className="font-['Figtree:Bold',_sans-serif] font-bold text-[#201315] text-[32px] mb-1">
              45
            </h3>
            <p className="font-['Figtree:Regular',_sans-serif] text-[#666] text-[14px]">
              Days Active
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="font-['Figtree:Regular',_sans-serif] text-[#999] text-[14px]">
            More profile features coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
