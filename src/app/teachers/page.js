import { getAllTeachers, getFeaturedTeachers } from '@/data/teachers';
import TeacherCard from '@/components/teachers/TeacherCard';

export const metadata = {
  title: 'Expert Educators - RoboVedanta',
  description: 'Meet our team of experienced robotics educators ready to guide your learning journey.',
};

export default function TeachersPage() {
  const allTeachers = getAllTeachers();
  const featuredTeachers = getFeaturedTeachers();
  const regularTeachers = allTeachers.filter(t => !t.featured && t.active);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#002246] via-[#002850] to-[#002F5A]">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-[#E6B73B] to-[#B8860B] 
                           bg-clip-text text-transparent">
              Expert Educators
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Learn from experienced professionals passionate about robotics education. 
            Each educator brings unique expertise to guide you on your learning journey.
          </p>
        </div>
      </section>

      {/* Featured Teachers */}
      {featuredTeachers.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-[#E6B73B] to-[#B8860B] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                ⭐ Featured Educators
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTeachers.map(teacher => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Teachers */}
      {regularTeachers.length > 0 && (
        <section className="py-12 px-4 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-[#E6B73B] to-[#B8860B] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                All Educators
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularTeachers.map(teacher => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#002850] to-[#002246]
                      border border-[#B8860B]/20 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Ready to Start Your Robotics Journey?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Choose your preferred educator and enroll in a program that matches your goals.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/programs"
              className="px-8 py-4 bg-gradient-to-r from-[#E6B73B] to-[#B8860B]
                       text-[#002246] rounded-xl font-bold text-lg
                       hover:scale-105 transition-transform duration-300"
            >
              View Programs
            </a>
            <a 
              href="/contact"
              className="px-8 py-4 border-2 border-[#B8860B] text-[#B8860B]
                       rounded-xl font-bold text-lg
                       hover:bg-[#B8860B] hover:text-[#002246]
                       transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
