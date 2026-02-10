'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Award } from 'lucide-react';

export default function TeacherCard({ teacher }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-[#002850] border border-[#B8860B]/20 rounded-2xl overflow-hidden 
                 transition-all duration-700 hover:border-[#B8860B] 
                 hover:shadow-[0_20px_50px_rgba(184,134,11,0.15)]"
    >
      {/* Image */}
      <div className="relative h-72 bg-gradient-to-b from-[#002246] to-[#002850]">
        <Image 
          src={teacher.imageUrl} 
          alt={teacher.name} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {teacher.featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 
                        bg-gradient-to-r from-[#E6B73B] to-[#B8860B] 
                        text-[#002246] px-3 py-1.5 rounded-full text-xs font-bold">
            <Star size={14} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name & Title */}
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            {teacher.name}
          </h3>
          <p className="text-[#B8860B] text-sm font-medium">
            {teacher.title}
          </p>
        </div>

        {/* Specialties */}
        <div className="space-y-2">
          {teacher.specialties.slice(0, 3).map((spec, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-white/80">
              <span className="text-[#B8860B] mt-0.5">•</span>
              <span className="line-clamp-1">{spec}</span>
            </div>
          ))}
        </div>

        {/* Experience Badge */}
        <div className="flex items-center gap-2 pt-2">
          <Award className="text-[#B8860B]" size={18} />
          <span className="text-white/70 text-sm font-medium">
            {teacher.experience} experience
          </span>
        </div>

        {/* View Profile Button */}
        <Link 
          href={`/teachers/${teacher.id}`}
          className="block w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#E6B73B] to-[#B8860B]
                   text-[#002246] rounded-xl font-bold text-center text-sm
                   hover:scale-105 transition-transform duration-300"
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  );
}
