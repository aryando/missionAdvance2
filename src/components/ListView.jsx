// src/components/ListView.jsx
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "./CourseCard";
import { useState, useEffect } from "react";
import api, { getCourses, addCourse, updateCourse, deleteCourse } from "../services/api";
import { setCourses } from "../store/courseSlice";

export default function ListView() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [role, setRole] = useState("");
  useEffect(() => {
    fetchCourses();
  }, [search, sortBy, order, role]);
  
  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses", {
        params: { search, sortBy, order, role }
      });
      dispatch(setCourses(res.data));
    } catch (err) {
      console.error("Gagal mengambil data course:", err);
    }
  };
  const [form, setForm] = useState({
    id: null,
    title: "",
    name: "",
    role: "",
    price: "",
  });

  const coursesPerPage = 9;

  useEffect(() => {
  getCourses().then((res) => {
    dispatch(setCourses(res));
  });
}, [dispatch]);

const handleAddOrUpdate = async () => {
  const newCourse = {
    ...form,
    image: "https://ucarecdn.com/23287a76-01a2-4c5b-aa42-efbbf211238b/-/preview/1000x561/",
    avatar: "https://ucarecdn.com/cf200355-bb97-41ae-a1dd-4b2e857a3ceb/-/preview/200x200/",
    rating: 4.5,
  };

  if (form.id) {
    await updateCourse(form.id, newCourse);
  } else {
    await addCourse(newCourse);
  }

  const updatedCourses = await getCourses();
  dispatch(setCourses(updatedCourses));
  setForm({ id: null, title: "", name: "", role: "", price: "" });
};

const handleDelete = async (course) => {
  if (window.confirm("Yakin ingin menghapus data ini?")) {
    await deleteCourse(course.id);
    const updatedCourses = await getCourses();
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
      />

      <div className="search">
        <input
        type="text"
        placeholder="Cari kursus..."
        onChange={(e) => setSearch(e.target.value)}
        />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Semua</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="title">Judul</option>
        <option value="price">Harga</option>
        <option value="rating">Rating</option>
      </select>

      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Naik</option>
        <option value="desc">Turun</option>
      </select>
      </div>

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
