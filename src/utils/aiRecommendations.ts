
import { Teacher, Student, SearchFilters } from '../types';
import { calculateDistance } from './distance';

export interface AIRecommendation {
  teacher: Teacher;
  score: number;
  distance?: number;
  reasons: string[];
}

export const getAIRecommendations = (
  teachers: Teacher[],
  student: Partial<Student>,
  filters: SearchFilters = {}
): AIRecommendation[] => {
  const recommendations: AIRecommendation[] = [];

  teachers.forEach(teacher => {
    let score = 0;
    const reasons: string[] = [];

    // Base score from rating
    score += teacher.rating * 20;
    
    // Subject match - handle both single and multiple selections
    const searchSubjects = filters.subjects || (filters.subject ? [filters.subject] : []);
    if (searchSubjects.length > 0 && teacher.subjects.some(s => searchSubjects.includes(s))) {
      score += 30;
      reasons.push('Teaches your required subjects');
    }

    // Also check student subjects if available
    if (student.subjects && teacher.subjects.some(s => student.subjects!.includes(s))) {
      score += 30;
      reasons.push('Teaches your required subjects');
    }

    // Teaching mode preference
    if (student.preferredMode && 
        (teacher.teachingMode === student.preferredMode || teacher.teachingMode === 'both')) {
      score += 15;
      reasons.push(`Offers ${student.preferredMode.replace('-', ' ')}`);
    }

    // Budget compatibility
    if (student.budget && student.grade) {
      const gradeGroup = getGradeGroup(student.grade);
      const teacherFee = getTeacherFeeForGrade(teacher, gradeGroup);
      
      if (teacherFee <= student.budget.max && teacherFee >= student.budget.min) {
        score += 25;
        reasons.push('Fees within your budget');
      } else if (teacherFee > student.budget.max) {
        score -= 10;
      }
    }

    // Experience bonus
    if (teacher.experience >= 5) {
      score += 10;
      reasons.push(`${teacher.experience} years of experience`);
    }

    // Verification bonus
    if (teacher.isVerified) {
      score += 5;
      reasons.push('Verified tutor');
    }

    // Distance calculation
    let distance: number | undefined;
    if (student.location?.coordinates && teacher.location.coordinates) {
      distance = calculateDistance(
        student.location.coordinates.lat,
        student.location.coordinates.lng,
        teacher.location.coordinates.lat,
        teacher.location.coordinates.lng
      );
      
      // Distance scoring (closer is better)
      if (distance <= 5) {
        score += 20;
        reasons.push('Very close to you');
      } else if (distance <= 10) {
        score += 10;
        reasons.push('Nearby location');
      } else if (distance > 20) {
        score -= 5;
      }
    }

    // Review count bonus
    if (teacher.totalReviews >= 20) {
      score += 5;
      reasons.push('Highly reviewed');
    }

    recommendations.push({
      teacher,
      score,
      distance,
      reasons
    });
  });

  // Sort by score (highest first)
  return recommendations.sort((a, b) => b.score - a.score);
};

const getGradeGroup = (grade: string): keyof Teacher['fees'] => {
  if (['1st Grade', '2nd Grade', '3rd Grade', '4th Grade'].includes(grade)) {
    return 'grade1to4';
  } else if (['5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade'].includes(grade)) {
    return 'grade5to9';
  } else if (grade === '10th Grade') {
    return 'grade10';
  } else if (['11th Grade', '12th Grade'].includes(grade)) {
    return 'grade11to12';
  } else {
    return 'graduation';
  }
};

const getTeacherFeeForGrade = (teacher: Teacher, gradeGroup: keyof Teacher['fees']): number => {
  return teacher.fees[gradeGroup];
};
