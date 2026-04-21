import React from 'react';

const Profile = ({ name, role, image, isOnline }: {
  name: string;
  role: string;
  image: string;
  isOnline: boolean;
}) => {
  return (
    <div>
      <div>
        {/* Profile Image & Online Badge */}
        <div style={{ position: 'relative' }}>
          <img
            src={image}
            alt={`${name}'s profile`}
          />
          
          {/* Conditional Rendering for Online/Offline Badge */}
          <div>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>

        {/* Text Content */}
        <div>
          <h2>
            {name}
          </h2>
          <p>
            {role}
          </p>
        </div>

        {/* Decorative Bottom Bar */}
        <div />
      </div>
    </div>
  );
};

export default Profile;