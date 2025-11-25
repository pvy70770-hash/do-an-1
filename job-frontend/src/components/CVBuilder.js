import React, { useState } from 'react';

function CVBuilder() {
  const [cvData, setCvData] = useState({
    fullName: '',
    position: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    birthDate: '',
    objective: '',
    experience: [
      { company: '', position: '', period: '', description: '' }
    ],
    education: [
      { school: '', degree: '', period: '' }
    ],
    skills: [''],
    certificates: [
      { name: '', year: '' }
    ],
    awards: [
      { name: '', year: '' }
    ],
    hobbies: ''
  });

  const handleInputChange = (field, value) => {
    setCvData({ ...cvData, [field]: value });
  };

  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [...cvData.experience, { company: '', position: '', period: '', description: '' }]
    });
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...cvData.experience];
    newExp[index][field] = value;
    setCvData({ ...cvData, experience: newExp });
  };

  const addSkill = () => {
    setCvData({ ...cvData, skills: [...cvData.skills, ''] });
  };

  const updateSkill = (index, value) => {
    const newSkills = [...cvData.skills];
    newSkills[index] = value;
    setCvData({ ...cvData, skills: newSkills });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}> Tạo CV Chuyên Nghiệp</h1>
        <p style={styles.subtitle}>Tạo CV ấn tượng trong vài phút</p>
      </div>

      <div style={styles.mainContent}>
        {/* Left Side - Form Input */}
        <div style={styles.formSection}>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Thông tin cá nhân</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Họ và tên</label>
              <input
                type="text"
                style={styles.input}
                placeholder="Nguyễn Văn A"
                value={cvData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Vị trí ứng tuyển</label>
              <input
                type="text"
                style={styles.input}
                placeholder="Senior Digital Marketing"
                value={cvData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Số điện thoại</label>
                <input
                  type="tel"
                  style={styles.input}
                  placeholder="0123456789"
                  value={cvData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  style={styles.input}
                  placeholder="email@example.com"
                  value={cvData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Địa chỉ</label>
              <input
                type="text"
                style={styles.input}
                placeholder="Ba Đình, Hà Nội"
                value={cvData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Website</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="portfolio.com"
                  value={cvData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Ngày sinh</label>
                <input
                  type="date"
                  style={styles.input}
                  value={cvData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Mục tiêu nghề nghiệp */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Mục tiêu nghề nghiệp</h2>
            <textarea
              style={styles.textarea}
              placeholder="Mô tả mục tiêu nghề nghiệp của bạn..."
              rows="4"
              value={cvData.objective}
              onChange={(e) => handleInputChange('objective', e.target.value)}
            />
          </div>

          {/* Kinh nghiệm làm việc */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Kinh nghiệm làm việc</h2>
            {cvData.experience.map((exp, index) => (
              <div key={index} style={styles.experienceItem}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Công ty</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="Công ty ABC"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  />
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Vị trí</label>
                    <input
                      type="text"
                      style={styles.input}
                      placeholder="Marketing Manager"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Thời gian</label>
                    <input
                      type="text"
                      style={styles.input}
                      placeholder="01/2021 - 06/2023"
                      value={exp.period}
                      onChange={(e) => updateExperience(index, 'period', e.target.value)}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Mô tả công việc</label>
                  <textarea
                    style={styles.textarea}
                    placeholder="Mô tả công việc và thành tích..."
                    rows="3"
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button style={styles.addButton} onClick={addExperience}>
              + Thêm kinh nghiệm
            </button>
          </div>

          {/* Kỹ năng */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Kỹ năng</h2>
            {cvData.skills.map((skill, index) => (
              <div key={index} style={styles.formGroup}>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Kỹ năng giao tiếp"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                />
              </div>
            ))}
            <button style={styles.addButton} onClick={addSkill}>
              + Thêm kỹ năng
            </button>
          </div>

          <div style={styles.actionButtons}>
            <button style={styles.previewButton}> Xem trước</button>
            <button style={styles.downloadButton}> Tải xuống PDF</button>
          </div>
        </div>

        {/* Right Side - CV Preview */}
        <div style={styles.previewSection}>
          <div style={styles.previewCard}>
            <h3 style={styles.previewTitle}>Xem trước CV</h3>
            
            {/* CV Template Preview */}
            <div style={styles.cvPreview}>
              {/* Left Column - Personal Info */}
              <div style={styles.cvLeft}>
                <div style={styles.cvAvatar}>
                  <div style={styles.avatarPlaceholder}>📷</div>
                </div>
                
                <div style={styles.cvSection}>
                  <h4 style={styles.cvSectionTitle}>THÔNG TIN CÁ NHÂN</h4>
                  <div style={styles.cvInfoItem}>
                    <span>📞</span> {cvData.phone || '0123456789'}
                  </div>
                  <div style={styles.cvInfoItem}>
                    <span>✉️</span> {cvData.email || 'email@example.com'}
                  </div>
                  <div style={styles.cvInfoItem}>
                    <span>📍</span> {cvData.address || 'Hà Nội'}
                  </div>
                  <div style={styles.cvInfoItem}>
                    <span>🌐</span> {cvData.website || 'portfolio.com'}
                  </div>
                  <div style={styles.cvInfoItem}>
                    <span>🎂</span> {cvData.birthDate || '01/01/1990'}
                  </div>
                </div>

                <div style={styles.cvSection}>
                  <h4 style={styles.cvSectionTitle}>KỸ NĂNG</h4>
                  {cvData.skills.filter(s => s).map((skill, i) => (
                    <div key={i} style={styles.cvSkillItem}>• {skill}</div>
                  ))}
                </div>
              </div>

              {/* Right Column - Main Content */}
              <div style={styles.cvRight}>
                <div style={styles.cvHeader}>
                  <h2 style={styles.cvName}>{cvData.fullName || 'HỌ VÀ TÊN'}</h2>
                  <p style={styles.cvPosition}>{cvData.position || 'Vị trí ứng tuyển'}</p>
                </div>

                <div style={styles.cvSection}>
                  <h4 style={styles.cvSectionTitleRight}>MỤC TIÊU NGHỀ NGHIỆP</h4>
                  <p style={styles.cvText}>{cvData.objective || 'Mô tả mục tiêu nghề nghiệp của bạn...'}</p>
                </div>

                <div style={styles.cvSection}>
                  <h4 style={styles.cvSectionTitleRight}>KINH NGHIỆM LÀM VIỆC</h4>
                  {cvData.experience.filter(e => e.company).map((exp, i) => (
                    <div key={i} style={styles.cvExpItem}>
                      <div style={styles.cvExpHeader}>
                        <strong>{exp.position}</strong>
                        <span style={styles.cvExpPeriod}>{exp.period}</span>
                      </div>
                      <div style={styles.cvExpCompany}>{exp.company}</div>
                      <p style={styles.cvExpDesc}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#F0F2F5',
    padding: '20px',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#00B14F',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  mainContent: {
    display: 'flex',
    gap: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  formSection: {
    flex: '1',
    maxWidth: '600px',
  },
  previewSection: {
    flex: '1',
    position: 'sticky',
    top: '20px',
    height: 'fit-content',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#00B14F',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '16px',
    flex: '1',
  },
  formRow: {
    display: 'flex',
    gap: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border 0.3s',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  },
  experienceItem: {
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  addButton: {
    background: '#E8F5E9',
    color: '#00B14F',
    border: '1px dashed #00B14F',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    transition: 'all 0.3s',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
  },
  previewButton: {
    flex: '1',
    background: 'white',
    color: '#00B14F',
    border: '2px solid #00B14F',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  downloadButton: {
    flex: '1',
    background: '#003eb1ff',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  previewCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  previewTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  cvPreview: {
    display: 'flex',
    background: '#f8f9fa',
    borderRadius: '8px',
    overflow: 'hidden',
    minHeight: '600px',
    fontSize: '11px',
  },
  cvLeft: {
    width: '180px',
    background: '#F2FCFF',
    padding: '20px 15px',
    borderRight: '1px solid #ddd',
  },
  cvRight: {
    flex: '1',
    background: '#E8EBEF',
    padding: '20px',
  },
  cvAvatar: {
    marginBottom: '20px',
  },
  avatarPlaceholder: {
    width: '100px',
    height: '100px',
  }
}
export default CVBuilder;
