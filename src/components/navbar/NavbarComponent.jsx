import React, { useContext } from 'react'
import { logout } from "../../shared/services/api";
import { Menubar } from "primereact/menubar";
import { LoggedContext } from '../../shared/contexts/JwtContext';
import { useNavigate } from 'react-router-dom';
export default function NavbarComponent() {
  const { userData, setUserData } = useContext(LoggedContext);
  const navigation = useNavigate();

   const items = [
     {
       label: "Cuenta",
       icon: "pi pi-fw pi-user",
       items: [
         {
           label: "Perfil",
           icon: "pi pi-fw pi-user-plus",
           url:"/profile"
         },
         {
           label: "Editar",
           icon: "pi pi-fw pi-user-edit",
         },
         {
           label: "Contratados",
           icon: "pi pi-fw pi-users",
         },
       ],
     },
     {
       label: "Conversaciones",
       icon: "pi pi-fw pi-book",
       items: [
         {
           label: "Contactar",
           icon: "pi pi-file-edit pi-plus",
           items: [
             {
               label: "Empresas",
               icon: "pi pi-fw pi-sitemap",
             },
             {
               label: "Autónomos",
               icon: "pi pi-comments pi-user",
             },
           ],
         },
         {
           label: "Conversaciones",
           icon: "pi pi-fw pi-comments",
         },
         {
           separator: true,
         },
         {
           label: "Export",
           icon: "pi pi-fw pi-external-link",
         },
       ],
     },
     {
       label: "Edit",
       icon: "pi pi-fw pi-pencil",
       items: [
         {
           label: "Left",
           icon: "pi pi-fw pi-align-left",
         },
         {
           label: "Right",
           icon: "pi pi-fw pi-align-right",
         },
         {
           label: "Center",
           icon: "pi pi-fw pi-align-center",
         },
         {
           label: "Justify",
           icon: "pi pi-fw pi-align-justify",
         },
       ],
     },
     {
       label: "Events",
       icon: "pi pi-fw pi-calendar",
       items: [
         {
           label: "Edit",
           icon: "pi pi-fw pi-pencil",
           items: [
             {
               label: "Save",
               icon: "pi pi-fw pi-calendar-plus",
             },
             {
               label: "Delete",
               icon: "pi pi-fw pi-calendar-minus",
             },
           ],
         },
         {
           label: "Archive",
           icon: "pi pi-fw pi-calendar-times",
           items: [
             {
               label: "Remove",
               icon: "pi pi-fw pi-calendar-minus",
             },
           ],
         },
       ],
      },
      
    ];
    const handleLogout = () => {
      logout();
      setUserData(false);
      navigation("/company");
    };
    const navigateToLogin = () => {

      navigation("/home");
    };
    const end = (
      <div className='navbar-name'>
      {userData && 
      <>
      <p>{userData.name}</p>
      <button  onClick={handleLogout} className='disconect-btn'> <i className="fa-solid fa-power-off"></i></button>
      </>
      }
      {!userData &&
      <button  onClick={navigateToLogin} className='disconect-btn'> <i className="fa-solid fa-right-to-bracket"></i></button>
      }
      </div>
    );
    const start = (
      <>
      <img  alt="logo" src="https://res.cloudinary.com/dxnzcewsy/image/upload/v1693440093/proyecto%20final/logo_ago.png" height="40" className="logo-img"></img>
      </>
    );
  return (
    <div>
      <Menubar model={items} end={end} start={start} className="navbar" />
    </div>
  );
}