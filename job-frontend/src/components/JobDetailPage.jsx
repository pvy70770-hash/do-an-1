import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobDetailPage.css';

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savingJob, setSavingJob] = useState(false);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        console.log('🔍 Full job data:', response.data);
        console.log('📝 Description:', response.data.description);
        console.log('📋 Requirements:', response.data.requirements);
        console.log('🎁 Benefits:', response.data.benefits);
        setJob(response.data);
        setError(null);

        // Check if job is already saved
        checkIfJobSaved(id);
      } catch (error) {
        console.error('Error fetching job detail:', error);
        setError('Không thể tải thông tin công việc');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  // ⭐ KIỂM TRA VIỆC LÀM ĐÃ LƯU
  const checkIfJobSaved = (jobId) => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsSaved(savedJobs.includes(jobId));
  };

  // ⭐ XỬ LÝ LƯU VIỆC LÀM
  const handleSaveJob = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('⚠️ Vui lòng đăng nhập để lưu việc làm');
      navigate('/login');
      return;
    }

    try {
      setSavingJob(true);

      // Lấy danh sách saved jobs từ localStorage
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');

      if (isSaved) {
        // Bỏ lưu
        const updatedJobs = savedJobs.filter(jobId => jobId !== id);
        localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
        setIsSaved(false);

        // Optional: Call API to remove from server
        try {
          await axios.delete(`http://localhost:5000/api/saved-jobs/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        } catch (err) {
          console.log('API call failed, but local storage updated');
        }

        alert('✅ Đã bỏ lưu việc làm');
      } else {
        // Lưu việc
        savedJobs.push(id);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        setIsSaved(true);

        // Optional: Call API to save to server
        try {
          await axios.post(
            'http://localhost:5000/api/saved-jobs',
            { job_id: id },
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
        } catch (err) {
          console.log('API call failed, but local storage updated');
        }

        alert('✅ Đã lưu việc làm');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('❌ Có lỗi xảy ra khi lưu việc làm');
    } finally {
      setSavingJob(false);
    }
  };

  // ⭐ XỬ LÝ ỨNG TUYỂN (GHI BẢN GHI VÀO BẢNG applications)
  const handleApply = async () => {
    if (!job) return;

    const token = localStorage.getItem('token');

    if (!token) {
      alert('⚠️ Vui lòng đăng nhập để ứng tuyển');
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/applications/apply',
        { jobId: job.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert(res.data.message || 'Ứng tuyển thành công!');

      // Optional: sau khi ghi applications, mở link gốc nếu có
      if (job.original_url) {
        const go = window.confirm(
          'Bạn đã ứng tuyển trên hệ thống. Bạn có muốn mở trang ứng tuyển gốc của nhà tuyển dụng không?'
        );
        if (go) {
          window.open(job.original_url, '_blank');
        }
      }
    } catch (err) {
      console.error('Lỗi khi ứng tuyển:', err);

      if (err.response?.status === 409) {
        alert('Bạn đã ứng tuyển công việc này rồi');
      } else {
        alert(err.response?.data?.message || 'Có lỗi khi ứng tuyển, vui lòng thử lại sau');
      }
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error || !job) {
    return (
      <div className="error-container">
        <p>{error || 'Không tìm thấy công việc'}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <div className="job-detail-container">
        {/* Job Header */}
        <div className="job-header">
          <div className="job-header-content">
            <h1 className="job-title">{job.title}</h1>
            <div className="company-info">
              <h2 className="company-name">{job.company}</h2>
            </div>

            {/* Quick Info Tags */}
            <div className="quick-info">
              <span className="info-tag salary">{job.salary}</span>
              <span className="info-tag location">📍 {job.location}</span>
              {job.experience && (
                <span className="info-tag experience">
                  💼 {job.experience}
                </span>
              )}
              {job.deadline && (
                <span className="info-tag deadline">
                  ⏰ Hạn nộp: {job.deadline}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="apply-section">
            <button
              className={`save-button ${isSaved ? 'saved' : ''}`}
              onClick={handleSaveJob}
              disabled={savingJob}
            >
              {savingJob ? '...' : isSaved ? '❤️ Đã lưu' : '🤍 Lưu việc'}
            </button>
            <button className="apply-button" onClick={handleApply}>
              Ứng tuyển ngay
            </button>
          </div>
        </div>

        {/* Job Content */}
        <div className="job-content">
          {/* Job Description */}
          <section className="content-section">
            <h3 className="section-title">Mô tả công việc</h3>
            {job.description ? (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            ) : (
              <div className="section-content">
                <p>Thông tin chi tiết về công việc sẽ được cập nhật sớm.</p>
                <p>Vui lòng liên hệ trực tiếp với nhà tuyển dụng để biết thêm chi tiết.</p>
              </div>
            )}
          </section>

          {/* Requirements */}
          <section className="content-section">
            <h3 className="section-title">Yêu cầu ứng viên</h3>
            {job.requirements ? (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: job.requirements }}
              />
            ) : (
              <div className="section-content">
                <p>Yêu cầu chi tiết sẽ được cập nhật sớm.</p>
              </div>
            )}
          </section>

          {/* Benefits */}
          <section className="content-section">
            <h3 className="section-title">Quyền lợi</h3>
            {job.benefits ? (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: job.benefits }}
              />
            ) : (
              <div className="section-content">
                <p>Quyền lợi sẽ được thảo luận khi phỏng vấn.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
