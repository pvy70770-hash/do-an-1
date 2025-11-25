// src/components/ApplicationPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ApplicationPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // Lấy danh sách ID công việc đã ứng tuyển từ localStorage
        const stored = localStorage.getItem("appliedJobs");
        const appliedIds = stored ? JSON.parse(stored) : [];

        if (!Array.isArray(appliedIds) || appliedIds.length === 0) {
          setJobs([]);
          setLoading(false);
          return;
        }

        // Gọi API lấy chi tiết từng job theo ID
        const results = await Promise.all(
          appliedIds.map((id) =>
            axios
              .get(`http://localhost:5000/api/jobs/${id}`)
              .then((res) => res.data)
              .catch((err) => {
                console.error("Lỗi lấy job", id, err.message);
                return null;
              })
          )
        );

        // Lọc bỏ những job null (bị lỗi / bị xoá)
        const validJobs = results.filter(Boolean);
        setJobs(validJobs);
      } catch (err) {
        console.error("Lỗi khi tải danh sách việc đã ứng tuyển:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleOpenJob = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  if (loading) {
    return (
      <div style={{ padding: "32px" }}>
        <h1>Việc làm đã ứng tuyển</h1>
        <p>Đang tải danh sách...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px", background: "#f5f5f5", minHeight: "100vh" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#212F3F",
          marginBottom: "24px",
        }}
      >
        Việc làm đã ứng tuyển
      </h1>

      {jobs.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <p>Bạn chưa ứng tuyển công việc nào.</p>
          <p>Hãy quay lại trang chủ để tìm việc và ứng tuyển nhé.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onClick={() => handleOpenJob(job.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#212F3F",
                }}
              >
                {job.title}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginBottom: "4px",
                }}
              >
                {job.company}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#777",
                  marginBottom: "12px",
                }}
              >
                📍 {job.location}
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {job.salary && (
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: "#FFF4E6",
                      fontSize: "12px",
                    }}
                  >
                    💰 {job.salary}
                  </span>
                )}
                {job.type && (
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: "#E6F7FF",
                      fontSize: "12px",
                    }}
                  >
                    ⏱ {job.type}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationPage;
