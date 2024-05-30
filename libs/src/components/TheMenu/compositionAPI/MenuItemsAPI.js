export default function MenuItemsAPI() {
  const menuItems = [
    {
      id: "PageStart",
      label: "_START_PAGE_",
      to: {
        name: "PageStart",
      },
      icon: "House",
    },
    {
      id: "PageScripts",
      label: "_SCRIPTS_PAGE_",
      icon: "FiletypeJs",
      children: [
        {
          id: "PageHeadings",
          label: "_HEADINGS_H1_H6_",
          to: {
            name: "PageHeadings",
          },
        },
        {
          id: "PageLists",
          label: "_LISTS_OL_UL_DL_",
          to: {
            name: "PageLists",
          },
        },
      ],
    },

  ];

  return {
    menuItems,
  };
}
