import { FolderOpen, Clock, Music2 } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: 'Symphony No. 1',
      instruments: ['Violin', 'Cello', 'Viola'],
      style: 'Classical',
      lastModified: '2 days ago',
    },
    {
      id: 2,
      name: 'Jazz Improvisation',
      instruments: ['Piano', 'Double Bass', 'Drums'],
      style: 'Jazz',
      lastModified: '1 week ago',
    },
    {
      id: 3,
      name: 'Pop Harmony Study',
      instruments: ['Guitar', 'Bass', 'Keys'],
      style: 'Pop',
      lastModified: '2 weeks ago',
    },
  ];

  return (
    <div className="bg-[#f8f3eb] relative w-full h-screen overflow-y-auto">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FolderOpen size={32} className="text-[#e76d57]" />
            <h1 className="font-['Figtree:Bold',_sans-serif] font-bold text-[#201315] text-[36px] sm:text-[40px] md:text-[48px]">
              Projects
            </h1>
          </div>
          <p className="font-['Figtree:Regular',_sans-serif] text-[#666] text-[16px] sm:text-[18px] md:text-[20px]">
            Manage your harmony projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-[20px] p-6 border-2 border-[#e5ddd5] hover:border-[#e76d57] transition-all duration-300 hover:scale-105 cursor-pointer shadow-md hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-[#e76d57] to-[#e98d77] p-3 rounded-full">
                  <Music2 size={24} className="text-white" />
                </div>
                <div className="flex items-center gap-1.5 text-[#666] text-[13px]">
                  <Clock size={14} />
                  <span>{project.lastModified}</span>
                </div>
              </div>

              <h3 className="font-['Figtree:Bold',_sans-serif] font-bold text-[#201315] text-[20px] mb-2">
                {project.name}
              </h3>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {project.instruments.map((instrument, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#f8f3eb] rounded-full text-[12px] font-['Figtree:SemiBold',_sans-serif] text-[#201315] border border-[#e5ddd5]"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#e76d57] to-[#e98d77] text-white rounded-full text-[12px] font-['Figtree:Bold',_sans-serif]">
                    {project.style}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Message */}
        <div className="mt-12 text-center">
          <p className="font-['Figtree:Regular',_sans-serif] text-[#999] text-[16px]">
            More projects will appear here as you create them
          </p>
        </div>
      </div>
    </div>
  );
}
