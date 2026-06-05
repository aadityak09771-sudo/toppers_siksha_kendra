import React, { useState } from 'react';
import { STUDENT_PROFILE } from '../config/studentProfile';
import { ProfileHero } from '../components/dashboard/ProfileHero';
import { PersonalDetailsCard } from '../components/dashboard/PersonalDetailsCard';
import { AcademicDetailsCard } from '../components/dashboard/AcademicDetailsCard';
import { MotivationCard } from '../components/dashboard/MotivationCard';
import { EditProfileModal } from '../components/dashboard/EditProfileModal';

export const MyProfile: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(STUDENT_PROFILE);

  const { personalDetails, academicDetails } = profileData;

  const handleSaveProfile = (updatedDetails: any) => {
    setProfileData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        name: updatedDetails.name,
        email: updatedDetails.email,
        mobileNo: updatedDetails.mobileNo,
        gender: updatedDetails.gender,
        city: updatedDetails.city,
        state: updatedDetails.state,
      }
    }));
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <ProfileHero 
        name={personalDetails.name} 
        className={academicDetails.class} 
        board={academicDetails.board}
        onEditClick={() => setIsEditModalOpen(true)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 mt-8">
        <div className="space-y-8">
          <PersonalDetailsCard details={personalDetails} />
        </div>
        <div className="space-y-8">
          <AcademicDetailsCard details={academicDetails} />
          <MotivationCard />
        </div>
      </div>
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        currentDetails={{...personalDetails, ...academicDetails}} 
        onSave={handleSaveProfile} 
      />
    </div>
  );
};
