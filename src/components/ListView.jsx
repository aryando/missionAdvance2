// src/components/ListView.jsx
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "./CourseCard";
import { useState, useEffect } from "react";
import { getData, addData, updateData, deleteData } from "../services/api";
import { setCourses } from "../store/courseSlice";

export default function ListView() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    id: null,
    title: "",
    name: "",
    role: "",
    price: "",
  });

  const coursesPerPage = 9;

  useEffect(() => {
    getData("/courses").then((res) => {
      dispatch(setCourses(res));
    });
  }, [dispatch]);

  const handleAddOrUpdate = async () => {
    const newCourse = {
      ...form,
      image:
        "https://ucarecdn.com/23287a76-01a2-4c5b-aa42-efbbf211238b/-/preview/1000x561/",
      avatar:
        "https://ucarecdn.com/cf200355-bb97-41ae-a1dd-4b2e857a3ceb/-/preview/200x200/",
      rating: 4.5,
    };

    if (form.id) {
      await updateData("courses", form.id, newCourse);
    } else {
      await addData("courses", newCourse);
    }

    const updatedCourses = await getData("/courses");
    dispatch(setCourses(updatedCourses));
    setForm({ id: null, title: "", name: "", role: "", price: "" });
  };

  const handleEdit = (course) => {
    setForm({
      id: course.id,
      title: course.title,
      name: course.name,
      role: course.role,
      price: course.price,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (course) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      await deleteData("courses", course.id);
      const updatedCourses = await getData("/courses");
      dispatch(setCourses(updatedCourses));
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div>
      <div className="form">
        <input
          type="text"
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nama Mentor"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Harga"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button onClick={handleAddOrUpdate}>
          {form.id ? "Update" : "Tambah"}
        </button>
      </div>

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
          currentCourses.map((course) => (
            <div key={course.id}>
              <CourseCard {...course} />
              <div className="actions">
                <button onClick={() => handleEdit(course)}>Edit</button>
                <button onClick={() => handleDelete(course)}>Hapus</button>
              </div>
            </div>
          ))
        ) : (
          <p>Data course tidak ditemukan.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </button>
          <span>
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev
              )
            }
            disabled={currentPage === totalPages}
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
