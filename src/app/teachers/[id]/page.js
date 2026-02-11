import { getTeacherById, getAllTeachers } from '@/data/teachers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Clock, Award, BookOpen, Star, ArrowLeft, GraduationCap, Target } from 'lucide-react';
import TeacherVideos from '@/components/teachers/TeacherVideos';
import MentorJumpButton from '@/components/teachers/MentorJumpButton';

export async function generateStaticParams() {
  const teachers = getAllTeachers();
  return teachers.map((teacher) => ({
    id: teacher.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const teacher = getTeacherById(id);
  
  if (!teacher) {
    return {
      title: 'Teacher Not Found - RoboVedanta',
    };
  }

  return {
    title: `${teacher.name} - ${teacher.title} | RoboVedanta`,
    description: teacher.bio.slice(0, 160),
  };
}

export default async function TeacherDetailPage({ params }) {
  const { id } = await params;
  const teacher = getTeacherById(id);
  
  if (!teacher) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#002246] to-[#002F5A] pt-24">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link 
          href="/teachers" 
          className="inline-flex items-center gap-2 text-[#B8860B] 
                   hover:text-[#E6B73B] transition-colors duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to All Teachers</span>
        </Link>
      </div>

      {/* Profile Header */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto bg-[#002850] border border-[#B8860B]/20 
                      rounded-2xl p-6 md:p-12 overflow-hidden">
          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] gap-8">
            
            {/* Photo */}
            <div className="relative aspect-[3/4] md:aspect-auto md:h-[450px] rounded-xl overflow-hidden
                          border-2 border-[#B8860B]/30">
              <Image 
                src={teacher.imageUrl} 
                alt={teacher.name} 
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {teacher.name}
                </h1>
                <p className="text-lg md:text-xl text-[#B8860B] font-medium">
                  {teacher.title}
                </p>
                {teacher.featured && (
                  <div className="inline-flex items-center gap-2 mt-4 
                                 bg-gradient-to-r from-[#E6B73B] to-[#B8860B] 
                                 text-[#002246] px-4 py-2 rounded-full text-sm font-bold">
                    <Star size={16} fill="currentColor" />
                    Featured Educator
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-white/80 bg-[#002246]/50 
                              rounded-lg p-3">
                  <Mail className="text-[#B8860B] flex-shrink-0" size={20} />
                  <span className="text-sm truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 bg-[#002246]/50 
                              rounded-lg p-3">
                  <Clock className="text-[#B8860B] flex-shrink-0" size={20} />
                  <span className="text-sm">{teacher.availability}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 bg-[#002246]/50 
                              rounded-lg p-3">
                  <Award className="text-[#B8860B] flex-shrink-0" size={20} />
                  <span className="text-sm">{teacher.experience}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 bg-[#002246]/50 
                              rounded-lg p-3">
                  <BookOpen className="text-[#B8860B] flex-shrink-0" size={20} />
                  <span className="text-sm">Grades: {teacher.grades.join(', ')}</span>
                </div>
              </div>

              {teacher.videos?.length > 0 && (
                <MentorJumpButton />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio & Details */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* About */}
          <div className="bg-[#002850] border border-[#B8860B]/20 
                        rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-[#B8860B]" size={28} />
              <h2 className="text-2xl font-bold text-white">About</h2>
            </div>
            <p className="text-white/80 leading-relaxed text-base">
              {teacher.bio}
            </p>
          </div>

          {/* Specialties */}
          <div className="bg-[#002850] border border-[#B8860B]/20 
                        rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-[#B8860B]" size={28} />
              <h2 className="text-2xl font-bold text-white">Specialties</h2>
            </div>
            <ul className="space-y-3">
              {teacher.specialties.map((spec, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80">
                  <span className="text-[#B8860B] text-xl flex-shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="bg-[#002850] border border-[#B8860B]/20 
                        rounded-2xl p-6 md:p-8 space-y-4 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-[#B8860B]" size={28} />
              <h2 className="text-2xl font-bold text-white">Qualifications & Achievements</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4">
              {teacher.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80 
                                       bg-[#002246]/50 rounded-lg p-4">
                  <span className="text-[#B8860B] mt-1 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{qual}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Testimonial Videos Section */}
      <TeacherVideos videos={teacher.videos} />

      {/* CTA Section */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#002850] to-[#002246]
                      border border-[#B8860B]/20 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ready to Learn with {teacher.name.split(' ')[0]}?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Select this educator during enrollment to personalize your learning experience. 
            You can change your preference anytime before the program starts.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href={`/programs?teacher=${teacher.id}`}
              className="px-8 py-4 bg-gradient-to-r from-[#E6B73B] to-[#B8860B]
                       text-[#002246] rounded-xl font-bold text-lg
                       hover:scale-105 transition-transform duration-300"
            >
              Select {teacher.name.split(' ')[0]} as My Educator
            </Link>
            <Link 
              href="/teachers"
              className="px-8 py-4 border-2 border-[#B8860B] text-[#B8860B]
                       rounded-xl font-bold text-lg
                       hover:bg-[#B8860B] hover:text-[#002246]
                       transition-all duration-300"
            >
              Browse Other Teachers
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
