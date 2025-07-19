// File: src/components/ListView.jsx
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "./CourseCard";
import { useState, useEffect } from "react";
import { getData } from "../services/api";
import { setCourses } from "../store/courseSlice";

export default function ListView() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.course.courses);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const coursesPerPage = 9;

  useEffect(() => {
    getData("/courses")
      .then(data => {
        dispatch(setCourses(data));
      })
    }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cari course..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="search-input"
      />
      <div className="course-grid">
        {currentCourses.length > 0 ? (
          currentCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))
        ) : (
          <p>Data course tidak ditemukan.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>Sebelumnya</button>
          <span>Halaman {currentPage} dari {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Berikutnya</button>
        </div>
      )}
    </div>
  );
}
