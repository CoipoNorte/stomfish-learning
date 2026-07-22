import { CourseSidebar } from '../components/course/CourseSidebar';
import { LessonContent } from '../components/course/LessonContent';

export function LessonPage() {
  return (
    <div className="min-h-screen bg-surface-950 pt-16">
      <div className="flex">
        <CourseSidebar />
        <LessonContent />
      </div>
    </div>
  );
}
