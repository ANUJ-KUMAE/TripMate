import { User, Mail, Shield, Calendar } from 'lucide-react'
import { useAppSelector } from '@/app/hooks'
import { Card } from '@/components/common/Card'

export function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div className="profile-page container">
      <div className="page-header">
        <h1 className="page-title">Account Profile</h1>
        <p className="page-subtitle">Manage your personal information and preferences</p>
      </div>

      <div className="profile-grid">
        <Card className="profile-card">
          <div className="profile-avatar-section">
            <div className="avatar-placeholder">
              <User size={48} />
            </div>
            <h2>{user?.fullName || 'Traveler'}</h2>
            <span className="role-tag">{user?.role || 'Guest'}</span>
          </div>

          <div className="profile-details-list">
            <div className="profile-detail-row">
              <div className="detail-icon-label">
                <Mail size={16} />
                <span>Email</span>
              </div>
              <span className="detail-value">{user?.email || 'user@tripmate.com'}</span>
            </div>

            <div className="profile-detail-row">
              <div className="detail-icon-label">
                <Shield size={16} />
                <span>Verification</span>
              </div>
              <span className="status-badge verified">Verified</span>
            </div>

            <div className="profile-detail-row">
              <div className="detail-icon-label">
                <Calendar size={16} />
                <span>Member Since</span>
              </div>
              <span className="detail-value">November 2026</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

