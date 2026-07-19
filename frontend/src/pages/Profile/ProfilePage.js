import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";

const ProfilePage = () => {

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const res = await getProfile();

                setProfile(res.data.user);

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Unable to load profile"
                );

            }

        };

        loadProfile();

    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (

        <div>

            <h1>Profile</h1>

            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Department:</strong> {profile.department}</p>
            <p><strong>Designation:</strong> {profile.designation}</p>

        </div>

    );
};

export default ProfilePage;
