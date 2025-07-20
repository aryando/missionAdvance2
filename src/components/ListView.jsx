// File: src/components/ListView.jsx
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "./CourseCard";
import { useState, useEffect } from "react";
import { getData, addData, updateData, deleteData } from "../services/api";
import { setCourses } from "../store/courseSlice";

export default function ListView() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.course.courses);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const coursesPerPage = 9;

  useEffect(() => {
    getData("/courses")
      .then(res => {
        dispatch(setCourses(res));
      })
    }, []);


    const handleAdd = async () => {
      const newCourse = {
          image: "https://ucarecdn.com/23287a76-01a2-4c5b-aa42-efbbf211238b/-/preview/1000x561/",
          title: "Big 4 Auditor Financial Analyst",
          avatar: "https://ucarecdn.com/cf200355-bb97-41ae-a1dd-4b2e857a3ceb/-/preview/200x200/",
          name: "Jenna Ortega",
          role: "Senior Accountant di Gojek",
          rating: 3.5,
          price: "Rp. 300K",
          id: Date.now()
      };
      const result = await addData("/courses", newCourse);
      console.log("Berhasil ditambahkan:", result);
    };

    const handleUpdate = async (id) => {
      const updatedCourse = {
          title: "Big 4 Auditor (updated)",
      };
      const result = await updateData("/courses", id, updatedCourse);
      console.log("Berhasih diperbarui:", result);
    };

    const handleDelete = async (id) => {
      const result = await deleteData("/courses", id);
      console.log("Berhasil menghapus:", result);
    };

    
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
