import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ THÊM

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('jobs');
  const navigate = useNavigate(); // ✅ THÊM

  useEffect(() => {
    // Lấy thông tin user từ API
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('❌ No token found, redirecting to login...');
          window.location.href = '/login';
          return;
        }

        console.log('🔍 Fetching user data from API...');
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ User data received:', data);
          
          setUser({
            id: data.id,
            name: data.name || data.username || data.email.split('@')[0],
            email: data.email,
            avatar: data.avatar_url || null,
            verified: true,
            isPro: false,
            savedJobs: 5,  // TODO: fetch from API
            appliedJobs: 3, // TODO: fetch from API
            cvCount: 2      // TODO: fetch from API
          });
        } else if (response.status === 401 || response.status === 403) {
          console.log('❌ Token invalid, clearing and redirecting...');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          console.error('❌ Error fetching user data:', response.status);
          // Fallback mock
          setUser({
            id: 'unknown',
            name: 'User',
            email: 'user@example.com',
            avatar: null,
            verified: true,
            isPro: false,
            savedJobs: 0,
            appliedJobs: 0,
            cvCount: 0
          });
        }
      } catch (error) {
        console.error('❌ Error fetching user data:', error);
        // Fallback mock
        setUser({
          id: 'unknown',
          name: 'User',
          email: 'user@example.com',
          avatar: null,
          verified: true,
          isPro: false,
          savedJobs: 0,
          appliedJobs: 0,
          cvCount: 0
        });
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    console.log('👋 Logging out...');
    localStorage.removeItem('token');
    localStorage.clear();
    window.location.href = '/login';
  };

  if (!user) return <div className="loading">Đang tải...</div>;

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        {/* User Info */}
        <div className="user-card">
          <div className="avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span className="avatar-icon">👤</span>
            )}
          </div>
          <h2>{user.name}</h2>
          <p className="user-status">Tài khoản đã xác thực</p>
          <p className="user-id">ID {user.id}</p>
          <p className="user-email">{user.email}</p>
        </div>

        {/* Menu */}
        <nav className="profile-menu">
          <button
            className={`menu-item ${activeSection === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveSection('jobs')}
          >
            <span className="menu-icon">💼</span>
            <span>Quản lý tìm việc</span>
            <span className="arrow">›</span>
          </button>

          <button
            className={`menu-item ${activeSection === 'cv' ? 'active' : ''}`}
            onClick={() => setActiveSection('cv')}
          >
            <span className="menu-icon">📄</span>
            <span>Quản lý CV & Cover letter</span>
            <span className="arrow">›</span>
          </button>

          <button
            className={`menu-item ${activeSection === 'email' ? 'active' : ''}`}
            onClick={() => setActiveSection('email')}
          >
            <span className="menu-icon">✉️</span>
            <span>Cài đặt email & thông báo</span>
            <span className="arrow">›</span>
          </button>

          <button
            className={`menu-item ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <span className="menu-icon">🔒</span>
            <span>Cá nhân & Bảo mật</span>
            <span className="arrow">›</span>
          </button>

          <button
            className={`menu-item ${activeSection === 'upgrade' ? 'active' : ''}`}
            onClick={() => setActiveSection('upgrade')}
          >
            <span className="menu-icon">👑</span>
            <span>Nâng cấp tài khoản</span>
            <span className="arrow">›</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          Đăng xuất
        </button>
      </aside>

      {/* Main Content */}
      <main className="profile-content">
        {activeSection === 'jobs' && (
          <JobsSection
            user={user}
            onViewApplied={() => navigate('/applications')} // ✅ BẤM VÀO "VIỆC LÀM ĐÃ ỨNG TUYỂN"
          />
        )}
        {activeSection === 'cv' && <CVSection user={user} />}
        {activeSection === 'email' && <EmailSection />}
        {activeSection === 'security' && <SecuritySection user={user} />}
        {activeSection === 'upgrade' && <UpgradeSection />}
      </main>

      <style jsx>{`
        .profile-container {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }

        .profile-sidebar {
          width: 320px;
          background: white;
          padding: 32px 24px;
          box-shadow: 2px 0 8px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .user-card {
          text-align: center;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 24px;
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00B14F, #00D95F);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 16px;
          font-size: 40px;
        }

        .avatar-icon {
          display: block;
        }

        .user-card h2 {
          font-size: 20px;
          font-weight: 600;
          color: #212F3F;
          margin-bottom: 8px;
        }

        .user-status {
          color: #00B14F;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .user-id {
          font-size: 13px;
          color: #666;
          margin-bottom: 4px;
        }

        .user-email {
          font-size: 13px;
          color: #999;
          word-break: break-word;
        }

        .profile-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: none;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          color: #212F3F;
          font-size: 14px;
          font-weight: 500;
          width: 100%;
          text-align: left;
        }

        .menu-icon {
          font-size: 18px;
          width: 20px;
          display: inline-block;
        }

        .menu-item:hover {
          background: #f8f8f8;
        }

        .menu-item.active {
          background: #E6F7ED;
          color: #00B14F;
        }

        .menu-item .arrow {
          margin-left: auto;
          opacity: 0.3;
          font-size: 20px;
        }

        .menu-item.active .arrow {
          opacity: 1;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border: none;
          background: #fee;
          color: #dc2626;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          width: 100%;
          margin-top: 24px;
          transition: all 0.2s;
        }

        .logout-icon {
          font-size: 18px;
        }

        .logout-btn:hover {
          background: #fdd;
        }

        .profile-content {
          flex: 1;
          padding: 32px;
          max-width: 1000px;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-size: 18px;
          color: #666;
        }

        @media (max-width: 768px) {
          .profile-container {
            flex-direction: column;
          }

          .profile-sidebar {
            width: 100%;
            height: auto;
            position: relative;
          }
        }
      `}</style>
    </div>
  );
}

// Component sections
function JobsSection({ user, onViewApplied }) { // ✅ NHẬN CALLBACK
  return (
    <div className="section">
      <h1 className="section-title">Quản lý tìm việc</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon saved">💾</div>
          <div>
            <h3>{user.savedJobs}</h3>
            <p>Việc làm đã lưu</p>
          </div>
        </div>
        
        <div
          className="stat-card clickable"      // ✅ THÊM CLASS
          onClick={onViewApplied}              // ✅ CLICK → /applications
        >
          <div className="stat-icon applied">📄</div>
          <div>
            <h3>{user.appliedJobs}</h3>
            <p>Việc làm đã ứng tuyển</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon match">✨</div>
          <div>
            <h3>12</h3>
            <p>Việc làm phù hợp với bạn</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #212F3F;
          margin-bottom: 24px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .stat-card.clickable {
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .stat-card.clickable:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .stat-icon.saved {
          background: #FFF4E6;
        }

        .stat-icon.applied {
          background: #E6F7FF;
        }

        .stat-icon.match {
          background: #F0FFF4;
        }

        .stat-card h3 {
          font-size: 32px;
          font-weight: 700;
          color: #212F3F;
          margin-bottom: 4px;
        }

        .stat-card p {
          font-size: 14px;
          color: #666;
        }
      `}</style>
    </div>
  );
}

function CVSection({ user }) {
  return (
    <div className="section">
      <h1 className="section-title">Quản lý CV & Cover letter</h1>
      <div className="cv-list">
        <div className="cv-card">
          <div className="cv-icon">📄</div>
          <h3>CV của tôi</h3>
          <p>{user.cvCount} CV đã tạo</p>
          <button className="btn-primary">Xem CV</button>
        </div>
        
        <div className="cv-card">
          <div className="cv-icon">✉️</div>
          <h3>Cover Letter của tôi</h3>
          <p>0 cover letter</p>
          <button className="btn-secondary">Tạo mới</button>
        </div>
      </div>

      <style jsx>{`
        .cv-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .cv-card {
          background: white;
          padding: 32px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .cv-icon {
          font-size: 48px;
          color: #00B14F;
          margin-bottom: 16px;
        }

        .cv-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #212F3F;
          margin-bottom: 8px;
        }

        .cv-card p {
          color: #666;
          margin-bottom: 16px;
        }

        .btn-primary, .btn-secondary {
          padding: 10px 24px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #00B14F;
          color: white;
        }

        .btn-primary:hover {
          background: #00A045;
        }

        .btn-secondary {
          background: white;
          border: 2px solid #00B14F;
          color: #00B14F;
        }

        .btn-secondary:hover {
          background: #f0fff4;
        }
      `}</style>
    </div>
  );
}

function EmailSection() {
  return (
    <div className="section">
      <h1 className="section-title">Cài đặt email & thông báo</h1>
      <div className="settings-card">
        <p>Tính năng đang phát triển...</p>
      </div>

      <style jsx>{`
        .settings-card {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
      `}</style>
    </div>
  );
}

function SecuritySection({ user }) {
  return (
    <div className="section">
      <h1 className="section-title">Cá nhân & Bảo mật</h1>
      <div className="security-card">
        <div className="info-row">
          <span>Email:</span>
          <strong>{user.email}</strong>
        </div>
        <div className="info-row">
          <span>ID:</span>
          <strong>{user.id}</strong>
        </div>
        <button className="btn-change">Đổi mật khẩu</button>
      </div>

      <style jsx>{`
        .security-card {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .btn-change {
          margin-top: 24px;
          padding: 10px 24px;
          background: #00B14F;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function UpgradeSection() {
  return (
    <div className="section">
      <h1 className="section-title">Nâng cấp tài khoản</h1>
      <div className="upgrade-card">
        <div className="crown-icon">👑</div>
        <h2>TopCV Pro</h2>
        <p>Nâng cấp để trải nghiệm đầy đủ tính năng</p>
        <button className="btn-upgrade">Nâng cấp ngay</button>
      </div>

      <style jsx>{`
        .upgrade-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 48px;
          border-radius: 16px;
          text-align: center;
          color: white;
        }

        .crown-icon {
          font-size: 64px;
          margin-bottom: 8px;
        }

        .upgrade-card h2 {
          font-size: 32px;
          margin: 16px 0;
        }

        .upgrade-card p {
          font-size: 16px;
          margin-bottom: 24px;
          opacity: 0.9;
        }

        .btn-upgrade {
          padding: 14px 32px;
          background: white;
          color: #667eea;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-upgrade:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
