import { Outlet } from "react-router-dom";

export default function BackGroundImage() {
    return (
      <div
        style={{
          backgroundImage: 'url("https://lirp.cdn-website.com/7f220cd0/dms3rep/multi/opt/soob-final-1434x956-960w.jpg")',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Outlet />
      </div>
    );
  }
  