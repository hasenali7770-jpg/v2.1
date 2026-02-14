"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { useParams } from "next/navigation";

export default function CoursesPage() {
  const params = useParams();
  const locale = params.locale || 'en';
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('Fetching from:', `/${locale}/api/courses`);
        const response = await fetch(`/${locale}/api/courses`);
        const data = await response.json();
        console.log('Received data:', data);
        setCourses(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [locale]);

  if (loading) return <Container><div>Loading...</div></Container>;

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold mb-6">Courses ({courses.length})</h1>
      <div className="grid gap-4">
        {courses.map((course: any) => (
          <div key={course.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p className="text-brand font-bold">{course.price} IQD</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
