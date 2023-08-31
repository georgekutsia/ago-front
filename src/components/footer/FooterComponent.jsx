import { Menubar } from 'primereact/menubar';
import React from 'react'

function FooterComponent() {
  const items = [
    {
      icon: "pi pi-fw pi-facebook",
    },
    {
      icon: "pi pi-fw pi-apple",
    },
    {
      icon: "pi pi-fw pi-user",
    },
    {
      icon: "pi pi-fw pi-calendar",
    },
    {
      icon: "pi pi-fw pi-power-off",
    },
  ];

  return (
    <div className="footer">
      <Menubar model={items}  />
    </div>
  );
}

export default FooterComponent