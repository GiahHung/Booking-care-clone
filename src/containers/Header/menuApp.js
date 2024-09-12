export const adminMenu = [
  {
    // Quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.CRUD-user",
        link: "/system/user-manage",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        // ]
      },
      {
        name: "menu.admin.CRUD-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      // {
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin",
      // },
      {
        // Quản lý kế hoạch khám bệnh
        name: "menu.doctor.manage-schedule",
        menus: [
          {
            name: "menu.doctor.schedule",
            link: "/system/user-manage",
          },
        ],
      },
    ],
  },
  {
    // Quản lý phong khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    // Quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    // Quản lý cẩm nag
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        // Quản lý kế hoạch khám bệnh
        name: "menu.doctor.manage-schedule",
        menus: [
          {
            name: "menu.doctor.schedule",
            link: "/system/user-manage",
          },
        ],
      },
    ],
  },
];