import React from "react";

const UserInfoDashboard = () => {
  // Dummy user data for demonstration
  const user = {
    firstName: "Kavya",
    lastName: "Sharma",
    email: "ks@gmail.com",
    status: "Admin",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#032B4A",
        paddingTop: "60px"
      }}
    >
      <div
        style={{
          background: "#0d2b4a",
          borderRadius: "8px",
          width: "520px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          padding: "32px 36px 32px 36px",
        }}
      >
        <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem", marginBottom: 8 }}>
          Personal Info
        </div>
        <hr style={{ border: 0, borderTop: "2px solid #b9c9dd", marginBottom: 24, marginTop: 0 }} />
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", marginBottom: 18 }}>
          First name: <span style={{ fontWeight: 600 }}>{user.firstName}</span>
        </div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", marginBottom: 18 }}>
          Last name: <span style={{ fontWeight: 600 }}>{user.lastName}</span>
        </div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", marginBottom: 18 }}>
          E-mail: <span style={{ fontWeight: 600 }}>{user.email}</span>
        </div>
        <div style={{ color: "#b9c9dd", fontWeight: 500, fontSize: "1.05rem", marginTop: 18 }}>
          Status: {user.status}
        </div>
      </div>
    </div>
  );
};

export default UserInfoDashboard;
