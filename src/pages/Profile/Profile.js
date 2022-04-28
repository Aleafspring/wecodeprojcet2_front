import React, { useState, useEffect } from 'react';
import styles from '../Profile/Profile.module.scss';
import WriterProfile from './WriterProfile';
import Header from '../components/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8000/user/myProfile/${params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', token: token },
    })
      .then(res => res.json())
      .then(data => {
        setProfileData(data);
      });
  }, [params.id]);

  return (
    <>
      <Header />
      <div className={styles.cover} />
      <section className={styles.container}>
        <section className={styles.top}>
          <div className={styles.profileBox}>
            {profileData.is_author ? (
              <div className={styles.name}>{profileData.nickname}</div>
            ) : (
              <div className={styles.name}>김아점</div>
            )}
          </div>
          <div className={styles.ImageBox}>
            {profileData.profile_img_url ? (
              <img src={profileData.profile_img_url} alt="profileImg" />
            ) : (
              <img src="/image/ajeom_logo.png" alt="profileImg" />
            )}
          </div>
        </section>
        <div className={styles.writeBox}>
          <div
            className={styles.writeBtn}
            onClick={() => {
              navigate('/write');
            }}
          >
            글쓰기
          </div>
        </div>
        {profileData.is_author ? (
          <WriterProfile profileData={profileData} />
        ) : (
          <></>
        )}
      </section>
    </>
  );
}

export default Profile;
